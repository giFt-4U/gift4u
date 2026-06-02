import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../api/axiosInstance';
import { getOrCreateRoom } from '../../api/chatApi';
import * as S from '../../styles/chat/ChatAddFriendStyle';

/**
 * 친구 코드로 채팅방 생성 페이지
 *
 * 흐름:
 *   1. 친구 코드 입력
 *   2. 코드로 상대방 userId 조회 (친구 API — 친구 담당자 완성 후 연동)
 *   3. getOrCreateRoom(opponentId) 호출 → 채팅방 생성 or 기존 방 반환
 *   4. /chat/:roomId 로 이동
 *
 * 현재: 친구 코드 → userId 조회 API가 없어서 코드 입력 후
 *       친구 담당자 API 연동 전까지 임시 처리.
 */
const ChatAddFriend = () => {
    const navigate = useNavigate();
    const [friendCode, setFriendCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(null);

    const handleSubmit = async () => {
        if (!friendCode.trim()) {
            setError('친구 코드를 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 친구 코드로 상대방 정보 조회
            // 친구 담당자 API 완성 후 실제 경로로 교체
            const userRes = await axiosInstance.get(`/api/friends/code/${friendCode.trim()}`);
            const opponentId = userRes.data.id;

            // 채팅방 생성 or 기존 방 조회
            const roomRes = await getOrCreateRoom(opponentId);
            const roomId = roomRes.data.roomId;

            setModal({ type: 'success', message: '친구 요청이 전송되었습니다.' });

            // 모달 확인 후 채팅방으로 이동
            setTimeout(() => navigate(`/chat/${roomId}`), 1000);

        } catch (e) {
            const code = e.response?.data?.error?.code;
            if (code === 'FRIEND_CODE_NOT_FOUND') {
                setModal({ type: 'error', message: '사용자를 찾을 수 없습니다.' });
            } else {
                setModal({ type: 'error', message: '오류가 발생했습니다. 다시 시도해주세요.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>

            <S.Content>
                <S.Label>친구 코드를 입력하세요</S.Label>
                <S.Input
                    type="text"
                    placeholder="친구 코드 입력"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    maxLength={30}
                />
                {error && <S.ErrorText>{error}</S.ErrorText>}
                <S.SubmitButton onClick={handleSubmit} disabled={loading}>
                    {loading ? '확인 중...' : '확인'}
                </S.SubmitButton>
            </S.Content>

            {/* 결과 */}
            {modal && (
                <S.ModalOverlay>
                    <S.ModalBox>
                        <S.ModalMessage>{modal.message}</S.ModalMessage>
                        <S.ModalButton onClick={() => setModal(null)}>확인</S.ModalButton>
                    </S.ModalBox>
                </S.ModalOverlay>
            )}
        </S.Container>
    );
};

export default ChatAddFriend;