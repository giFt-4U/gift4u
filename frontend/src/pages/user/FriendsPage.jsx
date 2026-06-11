// FriendsPage.jsx
import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        getFriends()
            .then((res) => setFriends(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleFriendClick = async (friendUserId) => {
        if (!friendUserId) {
            alert("유효하지 않은 사용자입니다.");
            return;
        }

        const message = `${friendUserId || '사용자'}님과 채팅하시겠습니까?`;
        if (!window.confirm(message)) {
            return;
        }
        try {
            // 2. 백엔드에 채팅방 시작 요청
            const response = await getOrCreateRoom(friendUserId);

            // 백엔드가 제공하는 DTO 구조에 맞춰 roomId를 추출
            const roomId = response.data.roomId;

            // 3. 받아온 고유 roomId를 가지고 채팅방 상세 화면으로 이동
            navigate(`/chat/${roomId}`);
        } catch (error) {
            console.error("채팅방 연결 오류:", error);
            alert("채팅방을 열 수 없습니다. 잠시 후 다시 시도해 주세요.");
        }
    };


    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;

    return (
        <S.Container>
            <S.Header>
                <S.FriendCount>{friends.length}명</S.FriendCount>
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
                        <S.FriendItem
                            key={f.friendshipId}
                            onClick={() => handleFriendClick(f.friendId || f.userId, f.friendUserId)}>
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
