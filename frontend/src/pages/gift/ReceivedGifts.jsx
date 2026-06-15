import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReceivedGifts } from '../../api/giftApi';
import { getFriends } from '../../api/friendshipApi';
import * as S from '../../styles/gift/ReceivedGiftsStyle';
import axiosInstance from '../../api/axiosInstance';

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
    const [friends, setFriends] = useState([]);
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

    useEffect(() => {
        const fetchListData = async () => {
            try {
                // 1. 받은 선물 목록과 내 친구 목록을 동시에 서버에서 가져옴
                const [giftRes, friendRes] = await Promise.all([
                    getReceivedGifts(),
                    getFriends()
                ]);

                setGifts(giftRes.data || []);
                setFriends(friendRes.data || []);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListData();
    }, []);

    const getSenderNickname = (senderId) => {
        if (!senderId) return '익명의 친구';

        // 내 친구 목록 데이터에서 고유 유저 ID가 일치하는 단 한 명을 매칭
        const matchedFriend = friends.find(f =>
            Number(f.friendId) === Number(senderId) ||
            Number(f.userId) === Number(senderId)
        );

        return matchedFriend ? matchedFriend.nickname : '선물한 사용자';
    };

    const GiftItemRow = ({ gift, navigate, statusLabel, getSenderNickname }) => {
        const [productImg, setProductImg] = useState("/images/default.png");
        const label = statusLabel(gift.status);

        useEffect(() => {
            if (!gift.productId) return;

            axios.get(`/api/products/${gift.productId}`)
                .then((res) => {
                    const img = res.data?.imageUrl || res.data?.image_url;
                    if (img) setProductImg(img);
                })
                .catch((err) => console.error("선물함 상품 이미지 가치 조회 실패:", err));
        }, [gift.productId]);
    }

    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;

    return (
        <S.Container>
            {gifts.length === 0 ? (
                <S.CenterText>받은 선물이 없습니다.</S.CenterText>
            ) : (
                <S.GiftList>
                    {gifts.map((gift) => {
                        const label = statusLabel(gift.status);
                        const currentImgSrc = gift.imageUrl || gift.image_url || "/images/default.png";

                        return (
                            <S.GiftItem key={gift.id}>
                                <S.ProductThumb
                                    onClick={() => navigate(`/products/${gift.productId}`)}
                                >
                                    <S.ThumbImage
                                        src={currentImgSrc}
                                        alt={gift.productName}
                                        onError={(e) => {
                                            e.target.src = "/images/default.png"; // 깨짐 방지용 방어막
                                        }}
                                    />
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
                                    <S.SenderText>
                                        보낸 사람: <strong style={{ color: '#222', fontWeight: '600' }}>{getSenderNickname(gift.sender)}</strong>
                                    </S.SenderText>
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