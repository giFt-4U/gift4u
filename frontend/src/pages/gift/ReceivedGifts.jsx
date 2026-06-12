import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReceivedGifts } from '../../api/giftApi';
import * as S from '../../styles/gift/ReceivedGiftsStyle';

/**
 * 받은 선물 목록 페이지
 * MyPage → "받은 선물" 메뉴 클릭 → /mypage/gifts
 *
 * 흐름:
 *   1. getReceivedGifts() API 호출
 *   2. 선물 카드 클릭 → /products/:productId (상품 상세)
 *   3. PENDING 선물은 "수령하기" 버튼 → /gifts/:uuid/address
 */
const ReceivedGifts = () => {
    const navigate = useNavigate();
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReceivedGifts()
            .then((res) => setGifts(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const statusLabel = (status) => {
        if (status === 'PENDING') return { text: '수령 대기', color: '#FF8C00' };
        if (status === 'ACCEPTED') return { text: '수령 완료', color: '#4CAF50' };
        if (status === 'EXPIRED') return { text: '만료됨', color: '#aaa' };
        return { text: status, color: '#888' };
    };

    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;

    return (
        <S.Container>
            {gifts.length === 0 ? (
                <S.CenterText>받은 선물이 없습니다.</S.CenterText>
            ) : (
                <S.GiftList>
                    {gifts.map((gift) => {
                        const label = statusLabel(gift.status);
                        return (
                            <S.GiftItem key={gift.id}>
                                {/* 상품 이미지 → 클릭 시 상품 상세 */}
                                <S.ProductThumb
                                    onClick={() => navigate(`/products/${gift.productId}`)}
                                >
                                    🎁
                                </S.ProductThumb>

                                <S.GiftInfo>
                                    <S.ProductName
                                        onClick={() => navigate(`/gifts/${gift.uuid}`)}
                                    >
                                        {gift.productName}
                                    </S.ProductName>
                                    <S.StatusBadge $color={label.color}>
                                        {label.text}
                                    </S.StatusBadge>
                                    <S.ExpireText>
                                        만료: {new Date(gift.expiredAt).toLocaleDateString('ko-KR')}
                                    </S.ExpireText>
                                </S.GiftInfo>

                                {/* PENDING이면 수령하기 버튼 */}
                                {gift.status === 'PENDING' && (
                                    <S.ReceiveButton
                                        onClick={() => navigate(`/gifts/${gift.uuid}/address`)}
                                    >
                                        수령하기
                                    </S.ReceiveButton>
                                )}
                            </S.GiftItem>
                        );
                    })}
                </S.GiftList>
            )}
        </S.Container>
    );
};

export default ReceivedGifts;