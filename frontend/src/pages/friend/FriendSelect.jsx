import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getFriends } from '../../api/friendshipApi';
import * as S from '../../styles/FriendsStyle';

const FriendsSelect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useAuthStore();

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    // 카트에서 전달받은 상품 정보
    // navigate('/friends/select', { state: { productId, productName } })
    const {
        productId,
        productName,
        productPrice,
        receiverFriendCode,
        skipSelect,
    } = location.state ?? {};

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        getFriends()
            .then((res) => {
                const friendList = res.data || [];
                setFriends(friendList);

                // 친구 위시리스트에서 이미 친구 코드가 넘어온 경우
                // 친구 선택 화면을 다시 보여주지 않고 해당 친구를 자동 선택
                if (skipSelect && receiverFriendCode) {
                    const selectedFriend = friendList.find(
                        (friend) => friend.friendCode === receiverFriendCode
                    );

                    if (!selectedFriend) {
                        alert('선택된 친구 정보를 찾을 수 없습니다. 직접 선택해주세요.');
                        return;
                    }

                    const receiverId =
                        selectedFriend.friendId ||
                        selectedFriend.userId ||
                        selectedFriend.friendUserId;

                    if (!receiverId) {
                        alert('유효하지 않은 사용자입니다.');
                        return;
                    }

                    if (!productId) {
                        alert('상품 정보가 없습니다. 다시 시도해주세요.');
                        return;
                    }

                    navigate('/gifts/card', {
                        state: {
                            productId,
                            productName,
                            receiverId,
                            receiverNickname: selectedFriend.nickname,
                            productPrice,
                            receiverFriendCode,
                        },
                    });
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [
        token,
        navigate,
        productId,
        productName,
        productPrice,
        receiverFriendCode,
        skipSelect,
    ]);

    const handleFriendClick = (friend) => {
        const receiverId = friend.friendId || friend.userId || friend.friendUserId;

        if (!receiverId) {
            alert('유효하지 않은 사용자입니다.');
            return;
        }

        if (!productId) {
            alert('상품 정보가 없습니다. 다시 시도해주세요.');
            return;
        }

        // GiftCard로 productId + receiverId + productName 전달
        navigate('/gifts/card', {
            state: {
                productId,
                productName,
                receiverId,
                receiverNickname: friend.nickname,
                productPrice,
                receiverFriendCode: friend.friendCode,
            },
        });
    };

    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;

    return (
        <S.Container>

            {friends.length === 0 ? (
                <S.EmptyState>
                    <S.EmptyText>
                        아직 친구가 없어요.{'\n'}
                        친구코드로 먼저 추가해 보세요!
                    </S.EmptyText>
                    <S.AddFriendButton onClick={() => navigate('/chat/add')}>
                        친구 추가하기
                    </S.AddFriendButton>
                </S.EmptyState>
            ) : (
                <S.FriendList>
                    {friends.map((f) => (
                        <S.FriendItem
                            key={f.friendshipId}
                            onClick={() => handleFriendClick(f)}
                        >
                            <S.Avatar>
                                {f.nickname?.charAt(0)?.toUpperCase() || '?'}
                            </S.Avatar>

                            <S.FriendInfo>
                                <S.FriendName>{f.nickname}</S.FriendName>
                                <S.FriendCode>{f.friendCode}</S.FriendCode>
                            </S.FriendInfo>
                        </S.FriendItem>
                    ))}
                </S.FriendList>
            )}
        </S.Container>
    );
};

export default FriendsSelect;