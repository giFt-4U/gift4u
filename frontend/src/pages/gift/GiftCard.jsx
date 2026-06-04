import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { createGift } from '../../api/giftApi';
import * as S from '../../styles/gift/GiftCardStyle';

/**
 * 선물 카드 작성 페이지 (REQ-010, REQ-011)
 *
 * 진입 경로:
 *   상품 상세 페이지 → 선물하기 버튼 클릭
 *   → navigate('/gifts/card', { state: { productId, receiverId } })
 *
 * 흐름:
 *   1. 메시지 입력 (최대 200자)
 *   2. 봉투 디자인 선택 (1~3)
 *   3. 카드 미리보기 버튼 → /gifts/card/preview 로 상태 전달
 *   4. 선물하기 버튼 → createGift() API 호출 → 채팅방으로 이동
 */

// 봉투 디자인 목록 (cardDesignType 1~3)
// 와이어프레임 기준 3가지 패턴
const CARD_DESIGNS = [
    { type: 1, label: '플라워', bg: '#FFF0F5', pattern: '🌸' },
    { type: 2, label: '스타', bg: '#F0F4FF', pattern: '⭐' },
    { type: 3, label: '체크', bg: '#FFFBF0', pattern: '🟡' },
];

const GiftCard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 상품 상세에서 전달받은 값
    const { productId, receiverId, productName } = location.state ?? {};

    const [message, setMessage] = useState(location.state?.message || '');
    const [selectedDesign, setSelectedDesign] = useState(location.state?.cardDesignType || 1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MAX_LENGTH = 200;
    const remaining = MAX_LENGTH - message.length;

    // ── 선물하기 API 호출 ────────────────────────────────
    const handleSubmit = async () => {
        if (!message.trim()) {
            setError('메시지를 입력해주세요.');
            return;
        }
        if (!productId || !receiverId) {
            setError('상품 또는 수신자 정보가 없습니다. 다시 시도해주세요.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await createGift({
                receiverId,
                productId,
                message: message.trim(),
                cardDesignType: selectedDesign,
            });

            // 선물 생성 성공 → 채팅방으로 이동 (BE가 자동으로 채팅 메시지 발송)
            navigate('/chat');

        } catch (e) {
            const code = e.response?.data?.error?.code;
            if (code === 'PRODUCT_NOT_FOUND') {
                setError('상품 정보를 찾을 수 없습니다.');
            } else if (code === 'USER_NOT_FOUND') {
                setError('수신자 정보를 찾을 수 없습니다.');
            } else if (code === 'PRODUCT_INACTIVE') {
                setError('판매가 종료된 상품입니다.');
            } else {
                setError('선물 전송에 실패했습니다. 다시 시도해주세요.');
            }
        } finally {
            setLoading(false);
        }
    };

    // ── 카드 미리보기 ────────────────────────────────────
    const handlePreview = () => {
        if (!message.trim()) {
            setError('메시지를 입력해주세요.');
            return;
        }
        setError(null);
        navigate('/gifts/card/preview', {
            state: {
                message,
                cardDesignType: selectedDesign,
                productName,
                productId,
                receiverId,
            },
        });
    };

    return (
        <S.Container>

            <S.ScrollArea>

                {/* 상품명 표시 */}
                {productName && (
                    <S.ProductLabel>📦 {productName}</S.ProductLabel>
                )}

                {/* 메시지 입력 */}
                <S.Section>
                    <S.SectionLabel>메시지를 입력하세요.</S.SectionLabel>
                    <S.MessageInput
                        value={message}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_LENGTH) {
                                setMessage(e.target.value);
                            }
                        }}
                        placeholder="따뜻한 마음을 전해보세요..."
                        rows={5}
                    />
                    <S.CharCount $warning={remaining <= 20}>
                        {message.length} / {MAX_LENGTH}
                    </S.CharCount>
                </S.Section>

                {/* 봉투 디자인 선택 */}
                <S.Section>
                    <S.SectionLabel>편지 봉투 고르기</S.SectionLabel>
                    <S.DesignGrid>
                        {CARD_DESIGNS.map((design) => (
                            <S.DesignItem
                                key={design.type}
                                $bg={design.bg}
                                $selected={selectedDesign === design.type}
                                onClick={() => setSelectedDesign(design.type)}
                            >
                                <S.DesignPattern>{design.pattern}</S.DesignPattern>
                                <S.DesignLabel>{design.label}</S.DesignLabel>
                            </S.DesignItem>
                        ))}
                    </S.DesignGrid>
                </S.Section>

                {error && <S.ErrorText>{error}</S.ErrorText>}

            </S.ScrollArea>

            {/* 하단 버튼 */}
            <S.ButtonRow>
                <S.PreviewButton onClick={handlePreview}>
                    카드 미리보기
                </S.PreviewButton>
                <S.SubmitButton onClick={handleSubmit} disabled={loading}>
                    {loading ? '전송 중...' : '선물하기'}
                </S.SubmitButton>
            </S.ButtonRow>

        </S.Container>
    );
};

export default GiftCard;