// FriendsPage.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getFriends } from '../../api/friendshipApi';
import { getOrCreateRoom } from '../../api/chatApi';
import * as S from '../../styles/FriendsStyle';

const FriendsPage = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFriends = useCallback(() => {
        setLoading(true);
        setError('');
        getFriends()
            .then((res) => setFriends(res.data))
            .catch((err) => {
                const message =
                    err.response?.data?.error?.message ||
                    '친구 목록을 불러오지 못했어요.';
                setError(message);
                setFriends([]);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchFriends();
    }, [token, navigate, fetchFriends]);

    const handleFriendClick = async (friend) => {
        const friendUserId = friend.userId;
        if (!friendUserId) {
            alert('유효하지 않은 사용자입니다.');
            return;
        }

        const name = friend.nickname || '친구';
        if (!window.confirm(`${name}님과 채팅하시겠습니까?`)) {
            return;
        }

        try {
            const response = await getOrCreateRoom(friendUserId);
            const roomId = response.data.roomId;
            navigate(`/chat/${roomId}`);
        } catch (err) {
            console.error('채팅방 연결 오류:', err);
            alert('채팅방을 열 수 없습니다. 잠시 후 다시 시도해 주세요.');
        }
    };

    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;

    return (
        <S.Container>
            <S.Header>
                {!error && <S.FriendCount>{friends.length}명</S.FriendCount>}
            </S.Header>

            {error ? (
                <S.EmptyState>
                    <S.ErrorText>{error}</S.ErrorText>
                    <S.RetryButton type="button" onClick={fetchFriends}>
                        다시 시도
                    </S.RetryButton>
                </S.EmptyState>
            ) : friends.length === 0 ? (
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

export default FriendsPage;
