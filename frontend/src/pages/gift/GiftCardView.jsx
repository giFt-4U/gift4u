import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getGift, getReceivedGifts } from '../../api/giftApi';
import * as S from '../../styles/gift/GiftCardViewStyle';
import axiosInstance from '../../api/axiosInstance';

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
    1: { bgImg: '/images/cards/card1.png', accent: '#FF8C00' },
    2: { bgImg: '/images/cards/card2.png', accent: '#5B7FFF' },
    3: { bgImg: '/images/cards/card3.png', accent: '#FFB300' },
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
    const [apiProducts, setApiProducts] = useState([]);

    // 경로 B일 때만 API 호출
    useEffect(() => {
        if (!uuid) return;

        const fetchGiftAndRealImages = async () => {
            try {
                setLoading(true);
                const res = await getGift(uuid);
                const gift = res.data;
                setGiftData(gift);

                const targetIds = gift.bundleProductIds || (gift.productId ? [gift.productId] : []);

                if (targetIds.length > 0) {
                    const productRequests = targetIds.map(id => axios.get(`/api/products/${id}`));
                    const productResponses = await Promise.all(productRequests);

                    const formatted = productResponses.map(pRes => ({
                        name: pRes.data?.name || '선물 상품 이름',
                        imageUrl: pRes.data?.imageUrl || pRes.data?.image_url || '/images/default.png'
                    }));
                    setApiProducts(formatted);
                }
            } catch (e) {
                setError('선물 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchGiftAndRealImages();
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

    const userUploadedImg = isPreview ? previewState?.uploadedImgUrl : giftData?.uploadedImgUrl;

    const getLocalStorageProducts = () => {
        try {
            const localItems = JSON.parse(localStorage.getItem("orderItems"));
            if (Array.isArray(localItems) && localItems.length > 0) {
                return localItems.map(item => ({
                    name: item?.name || item?.productName || '선물 상품 이름',
                    imageUrl: item?.imageUrl || item?.image_url || '/images/default.png'
                }));
            }
            return [];
        } catch (e) {
            return [];
        }
    };

    // 단일 포맷 데이터 변환 및 결합
    const getFormattedProducts = () => {
        if (isPreview) {
            const local = getLocalStorageProducts();
            if (local.length > 0) return local;
            return [{
                name: previewState?.productName || '선물 상품 이름',
                imageUrl: previewState?.imageUrl || previewState?.image_url || '/images/default.png'
            }];
        } else {
            if (apiProducts.length > 0) return apiProducts;

            return [{
                name: giftData?.productName || '선물 상품 이름',
                imageUrl: '/images/default.png'
            }];
        }
    };

    const displayProducts = getFormattedProducts();

    // ── 로딩 / 에러 처리 ─────────────────────────────────
    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;
    if (error) return <S.CenterText>{error}</S.CenterText>;

    return (
        <S.Container>

            {/* 카드 본문 */}
            <S.CardArea $bgImg={design.bgImg}>


                {/* 이미지 박스 */}
                <S.MainImageFrame>
                    {userUploadedImg ? (
                        <S.RealProductImage
                            src={userUploadedImg}
                            alt="선물 카드 커스텀 사진"
                            onError={(e) => { e.target.src = "/images/default.png"; }}
                        />
                    ) : (
                        <S.ImagePlaceholderLine />
                    )}
                </S.MainImageFrame>

                {/* 2. 와이어프레임 중앙: 다른 화면들과 완벽히 일치하는 상품 리스트 출력 (여러 개면 밑으로 차례대로 렌더링) */}
                <S.ProductContainer>
                    {displayProducts.map((item, idx) => (
                        <S.ProductBox key={idx}>
                            <S.SmallThumbBox>
                                <S.RealProductImage
                                    src={item.imageUrl}
                                    alt={item.name}
                                    onError={(e) => { e.target.src = "/images/default.png"; }}
                                />
                            </S.SmallThumbBox>
                            <S.ProductTextGroup>
                                <S.ProductName>{item.name}</S.ProductName>
                            </S.ProductTextGroup>
                        </S.ProductBox>
                    ))}
                </S.ProductContainer>

                {/* 메시지 */}
                <S.MessageBox>
                    <S.MessageText>
                        {message ?? '메시지가 없습니다.'}
                    </S.MessageText>
                </S.MessageBox>

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