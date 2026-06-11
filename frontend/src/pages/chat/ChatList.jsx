import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatRooms, leaveRoom } from '../../api/chatApi';
import useAuthStore from '../../store/authStore';
import FloatingMainButton from '../../components/common/FloatingMainButton';
import * as S from '../../styles/chat/ChatListStyle';

/**
 * 채팅방 목록 페이지 (REQ-C01)
 *
 * 흐름:
 *   1. 마운트 시 내 채팅방 목록 API 호출
 *   2. 채팅방 클릭 → /chat/:roomId 이동
 *   3. + 버튼 → /chat/add (친구 코드로 채팅방 생성)
 */
const ChatList = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmRoomId, setConfirmRoomId] = useState(null);

    useEffect(() => {
        getChatRooms()
            .then((res) => setRooms(res.data))
            .catch(() => setError('채팅 목록을 불러오지 못했습니다.'))
            .finally(() => setLoading(false));
    }, []);

    // 마지막 메시지 시각을 "방금 전 / N분 전 / N시간 전" 형태로 변환
    const formatTime = (dateStr) => {
        if (!dateStr) return '';
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return '방금 전';
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        return `${Math.floor(diff / 86400)}일 전`;
    };

    // 채팅방 나가기
    const handleLeave = async (roomId) => {
        try {
            await leaveRoom(roomId);
            // 목록에서 즉시 제거 (API 재호출 X)
            setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
            navigate('/chat');
        } catch {
            alert('채팅방 나가기에 실패했습니다.');
        } finally {
            setConfirmRoomId(null);
        }
    };

    // lastMessageAt이 localStorage에 저장된 마지막 읽은 시각보다 최신이면 unread
    const isUnread = (room) => {
        if (!room.lastMessageAt) return false;

        const key = `chat_read_${room.roomId}`;
        const lastRead = localStorage.getItem(key);

        // 방에 들어간 기록이 아예 없다면 상대방이 보낸 방이므로 빨간 점 표시
        if (!lastRead) return true;

        const lastMessageTime = new Date(room.lastMessageAt).getTime();
        const lastReadTime = new Date(lastRead).getTime();

        const TIME_MARGIN = 3000;

        if (lastMessageTime >= lastReadTime && (lastMessageTime - lastReadTime) <= TIME_MARGIN) {
            return false;
        }
    };

    // 채팅방 클릭 시 읽음 처리
    const handleRoomClick = (room) => {
        localStorage.setItem(`chat_read_${room.roomId}`, new Date().toISOString());
        navigate(`/chat/${room.roomId}`, {
            state: { partnerName: room.opponentNickname }
        });
    };

    if (loading) return <S.CenterText>로딩 중...</S.CenterText>;
    if (error) return <S.CenterText>{error}</S.CenterText>;

    return (
        <S.Container>
            {/* 채팅방 목록 */}
            {rooms.length === 0 ? (
                <S.CenterText>채팅방이 없습니다.</S.CenterText>
            ) : (
                <S.RoomList>
                    {rooms.map((room) => (
                        <S.RoomItem
                            key={room.roomId}
                            onClick={() => handleRoomClick(room)}

                        >
                            {/* 프로필 아이콘 */}
                            <S.Avatar>
                                {room.opponentNickname?.charAt(0) ?? '?'}
                            </S.Avatar>

                            {/* 상대방 이름 + 마지막 메시지 */}
                            <S.RoomInfo>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <S.RoomName>{room.opponentNickname}</S.RoomName>
                                    {/* 조건식을 통과하면 빨간 점 노출 */}
                                    {isUnread(room) && <S.UnreadDot />}
                                </div>
                                <S.LastMessage>
                                    {room.lastMessage ?? '메시지가 없습니다.'}
                                </S.LastMessage>
                            </S.RoomInfo>

                            {/* 시각 */}
                            <S.TimeText>{formatTime(room.lastMessageAt)}</S.TimeText>
                            {/* 나가기 버튼 */}
                            <S.LeaveButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('정말 이 채팅방에서 나가시겠습니까?')) {
                                        handleLeave(room.roomId);
                                    }
                                }}
                            >
                                나가기
                            </S.LeaveButton>
                        </S.RoomItem>
                    ))}
                </S.RoomList>
            )}
            <FloatingMainButton />

        </S.Container>
    );
};

export default ChatList;