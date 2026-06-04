// FriendsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getFriends } from '../../api/friendshipApi';
import * as S from '../../styles/FriendsStyle';

const FriendsPage = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        getFriends()
            .then((res) => setFriends(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;

    return (
        <S.Container>
            <S.Header>
                <S.Title>
                    친구
                    <S.FriendCount>{friends.length}명</S.FriendCount>
                </S.Title>
            </S.Header>

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
                        <S.FriendItem key={f.friendshipId}>
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
