import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../api/axiosInstance';
import { sendFriendRequest } from '../../api/chatApi';
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
            await sendFriendRequest(friendCode.trim());

            alert('친구 요청이 전송되었습니다.');
            navigate(`/chat/room/${roomId}`);

        } catch (e) {
            // 2. 백엔드에서 에러 응답 객체 데이터 추출
            const serverResponse = e.response?.data;
            // 3. 백엔드가 리턴한 에러 코드가 'FRIEND_REQUEST_ALREADY_EXISTS'인지 체크
            const backendErrorCode = serverResponse?.code || serverResponse?.error?.code;
            // 4. 백엔드 글로벌 에러에서 지정한 실제 멘트("이미 친구이거나 요청 대기 중입니다.") 추출
            const globalMessage = serverResponse?.message || serverResponse?.error?.message;

            if (backendErrorCode === 'FRIEND_REQUEST_ALREADY_EXISTS' || globalMessage) {
                // 🚨 백엔드 멘트 그대로 alert 창에 띄우기
                alert(globalMessage);
            } else {
                alert('사용자를 찾을 수 없습니다.');
            }
            setFriendCode('');
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