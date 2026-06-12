import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getGift } from '../../api/giftApi';
import * as S from '../../styles/gift/GiftCardViewStyle';

/**
 * 선물 카드 뷰 페이지 — 두 가지 진입 경로
 *
 * [경로 A] 보내는 사람 미리보기
 *   /gifts/card/preview
 *   → GiftCard에서 navigate 시 location.state로 데이터 전달
 *   → API 호출 없음, state 데이터로 바로 렌더링
 *
 * [경로 B] 받는 사람 링크 접근
 *   /gifts/:uuid
 *   → uuid로 getGift() API 호출
 *   → 상태(PENDING/ACCEPTED/EXPIRED)에 따라 버튼 다르게 표시
 *   → "주소 입력하기" → /gifts/:uuid/address 이동
 */

// 봉투 디자인별 스타일 매핑 (GiftCard.jsx와 동일하게 유지)
const DESIGN_STYLES = {
    1: { bg: '#FFF0F5', accent: '#FF8C00', pattern: '🌸', name: '플라워' },
    2: { bg: '#F0F4FF', accent: '#5B7FFF', pattern: '⭐', name: '스타' },
    3: { bg: '#FFFBF0', accent: '#FFB300', pattern: '🟡', name: '체크' },
};

const GiftCardView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { uuid } = useParams(); // 경로 B에서만 존재

    // 경로 A: GiftCard에서 전달받은 state
    const previewState = location.state;

    // 경로 B: API로 받아온 선물 데이터
    const [giftData, setGiftData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bundleProducts, setBundleProducts] = useState([]);

    // 경로 B일 때만 API 호출
    useEffect(() => {
        if (!uuid) return; // 경로 A면 스킵
        const fetchGiftAndBundle = async () => {
            try {
                setLoading(true);
                // 1. 상세 선물 내역 단건 조회
                const res = await getGift(uuid);
                const mainGift = res.data;
                setGiftData(mainGift);

                try {
                    const listRes = await getMyGifts();
                    const allGifts = listRes.data || [];

                    const mainTime = mainGift.createdAt?.substring(0, 16);

                    const matchedGifts = allGifts.filter(gift => {
                        const giftTime = gift.createdAt?.substring(0, 16);
                        return giftTime === mainTime && gift.senderId === mainGift.senderId;
                    });

                    if (matchedGifts.length > 0) {
                        setBundleProducts(matchedGifts);
                    } else {
                        setBundleProducts([mainGift]);
                    }
                } catch (listErr) {
                    // 전체 목록 조회 에러 시 폴백: 현재 단일 상품 노출
                    setBundleProducts([mainGift]);
                }

            } catch (e) {
                const code = e.response?.data?.error?.code;
                if (code === 'GIFT_LINK_INVALID') {
                    setError('유효하지 않거나 만료된 선물 링크입니다.');
                } else {
                    setError('선물 정보를 불러오지 못했습니다.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGiftAndBundle();
    }, [uuid]);

    // ── 렌더링에 사용할 데이터 결정 ─────────────────────
    const message = previewState?.message ?? giftData?.message;
    const cardDesignType = previewState?.cardDesignType ?? giftData?.cardDesignType ?? 1;
    const productName = previewState?.productName ?? giftData?.productName;
    const status = giftData?.status; // 경로 A면 undefined

    const design = DESIGN_STYLES[cardDesignType] ?? DESIGN_STYLES[1];
    const isPreview = !uuid; // 경로 A 여부
    const isExpired = status === 'EXPIRED';
    const isAccepted = status === 'ACCEPTED';

    // ── 로딩 / 에러 처리 ─────────────────────────────────
    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;
    if (error) return <S.CenterText>{error}</S.CenterText>;

    return (
        <S.Container>

            {/* 카드 본문 */}
            <S.CardArea $bg={design.bg}>

                {/* 상단 장식 패턴 */}
                <S.PatternRow>
                    {[...Array(5)].map((_, i) => (
                        <S.PatternIcon key={i}>{design.pattern}</S.PatternIcon>
                    ))}
                </S.PatternRow>

                {/* 상품 정보 */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', margin: '12px 0' }}>
                    {isPreview ? (
                        // 경로 A: 송신자 미리보기 시 단일 상품명 노출
                        <S.ProductBox>
                            <S.ProductImg>🎁</S.ProductImg>
                            <S.ProductName>{previewState?.productName || '선물 상품 이름'}</S.ProductName>
                        </S.ProductBox>
                    ) : (
                        // 경로 B: 백엔드가 묶어준 bundleProductNames 배열을 그대로 순회 출력
                        giftData?.bundleProductNames?.map((name, idx) => (
                            <S.ProductBox key={idx} style={{ marginBottom: idx === giftData.bundleProductNames.length - 1 ? 0 : '8px' }}>
                                <S.ProductImg>🎁</S.ProductImg>
                                <S.ProductName>{name}</S.ProductName>
                            </S.ProductBox>
                        ))
                    )}
                </div>

                {/* 메시지 */}
                <S.MessageBox>
                    <S.MessageText>
                        {message ?? '메시지가 없습니다.'}
                    </S.MessageText>
                </S.MessageBox>

                {/* 하단 장식 패턴 */}
                <S.PatternRow>
                    {[...Array(5)].map((_, i) => (
                        <S.PatternIcon key={i}>{design.pattern}</S.PatternIcon>
                    ))}
                </S.PatternRow>

            </S.CardArea>

            {/* 하단 버튼 영역 */}
            <S.ButtonArea>

                {/* 경로 A — 미리보기: 돌아가기만 */}
                {isPreview && (
                    <S.ActionButton $accent={design.accent}
                        onClick={() => navigate('/gifts/card', { state: previewState })}>
                        돌아가기
                    </S.ActionButton>
                )}

                {/* 경로 B — 받는 사람: 상태별 버튼 */}
                {!isPreview && (
                    <>
                        {isExpired && (
                            <S.DisabledButton>만료된 선물입니다</S.DisabledButton>
                        )}
                        {isAccepted && (
                            <S.DisabledButton>이미 수령한 선물입니다</S.DisabledButton>
                        )}
                        {!isExpired && !isAccepted && (
                            <S.ActionButton
                                $accent={design.accent}
                                onClick={() => navigate(`/gifts/${uuid}/address`)}
                            >
                                주소 입력하기
                            </S.ActionButton>
                        )}
                    </>
                )}

            </S.ButtonArea>

        </S.Container>
    );
};

export default GiftCardView;