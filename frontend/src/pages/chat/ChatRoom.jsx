import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getMessages } from '../../api/chatApi';
import * as S from '../../styles/chat/ChatRoomStyle';

/**
 * 실시간 채팅방 페이지 (REQ-C03, REQ-C04)
 *
 * WebSocket(STOMP) 연결 흐름:
 *   1. 마운트 시 과거 메시지 API 조회 (REST)
 *   2. STOMP 클라이언트 생성 → /ws 연결
 *   3. /topic/chat/{roomId} 구독 → 실시간 메시지 수신
 *   4. 전송 버튼 → /app/chat/send 로 메시지 발행
 *   5. 언마운트 시 STOMP 연결 해제
 *
 * GIFT 타입 메시지:
 *   messageType === 'GIFT' 이면 선물 카드 미리보기로 렌더링
 *   uuid를 파싱해서 /gifts/:uuid 링크로 연결
 */
const ChatRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [connected, setConnected] = useState(false);
    const [opponentName, setOpponentName] = useState('');

    // STOMP 클라이언트 ref — 렌더링과 무관하게 유지
    const stompClientRef = useRef(null);
    // 메시지 목록 맨 아래로 자동 스크롤
    const bottomRef = useRef(null);
    // 현재 로그인한 userId (localStorage에서 파싱)
    const myUserId = Number(localStorage.getItem('userId'));

    // ── 1. 과거 메시지 조회 ─────────────────────────────
    useEffect(() => {
        getMessages(roomId)
            .then((res) => {
                // API는 최신순(DESC)으로 내려오므로 뒤집어서 표시
                const sorted = [...res.data.content].reverse();
                setMessages(sorted);
            })
            .catch(() => { });
    }, [roomId]);

    // ── 2. STOMP 연결 ────────────────────────────────────
    useEffect(() => {
        const token = localStorage.getItem('token');

        const client = new Client({
            // SockJS 팩토리: 브라우저 WebSocket 미지원 환경 폴백
            webSocketFactory: () =>
                new SockJS(`${import.meta.env.VITE_API_URL}/ws`),

            // 연결 헤더에 JWT 토큰 포함
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },

            // 연결 성공 시
            onConnect: () => {
                setConnected(true);

                // /topic/chat/{roomId} 구독 → 실시간 메시지 수신
                client.subscribe(`/topic/chat/${roomId}`, (frame) => {
                    const newMessage = JSON.parse(frame.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
            },

            onDisconnect: () => setConnected(false),

            // 연결 오류 로그 (운영에서는 제거)
            onStompError: (frame) => {
                console.error('STOMP 오류:', frame);
            },
        });

        client.activate();
        stompClientRef.current = client;

        // 언마운트 시 연결 해제
        return () => {
            client.deactivate();
        };
    }, [roomId]);

    // ── 3. 새 메시지 도착 시 스크롤 맨 아래로 ───────────
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ── 4. 메시지 전송 ────────────────────────────────────
    const sendMessage = () => {
        const trimmed = input.trim();

        // 빈 메시지 방지 (BE에서도 막지만 FE에서도 체크)
        if (!trimmed) return;

        // STOMP 연결 안 됐으면 전송 차단
        if (!stompClientRef.current?.connected) return;

        stompClientRef.current.publish({
            destination: '/app/chat/send',
            body: JSON.stringify({
                roomId: Number(roomId),
                content: trimmed,
                messageType: 'TEXT',
            }),
        });

        setInput('');
    };

    // Enter 키로 전송 (Shift+Enter는 줄바꿈)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ── 5. GIFT 타입 메시지에서 uuid 파싱 ───────────────
    // BE에서 "선물이 도착했어요! 🎁 {uuid}" 형태로 저장
    const parseGiftUuid = (content) => {
        const parts = content?.split('🎁 ');
        return parts?.length > 1 ? parts[1].trim() : null;
    };

    // ── 렌더링 ────────────────────────────────────────────
    return (
        <S.Container>

            {/* 메시지 목록 */}
            <S.MessageList>
                {messages.map((msg, idx) => {
                    const isMine = msg.senderId === myUserId;
                    const isGift = msg.messageType === 'GIFT';
                    const giftUuid = isGift ? parseGiftUuid(msg.content) : null;

                    return (
                        <S.MessageRow key={msg.id ?? idx} $isMine={isMine}>

                            {/* GIFT 타입 — 선물 카드 미리보기 */}
                            {isGift && giftUuid ? (
                                <S.GiftCard onClick={() => navigate(`/gifts/${giftUuid}`)}>
                                    <S.GiftCardIcon>🎁</S.GiftCardIcon>
                                    <S.GiftCardText>선물이 도착했어요!</S.GiftCardText>
                                    <S.GiftCardSub>탭해서 선물 확인하기</S.GiftCardSub>
                                </S.GiftCard>
                            ) : (
                                /* TEXT 타입 — 일반 말풍선 */
                                <S.Bubble $isMine={isMine}>
                                    <S.BubbleText>{msg.content}</S.BubbleText>
                                    <S.BubbleTime>
                                        {msg.createdAt
                                            ? new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                            : ''}
                                    </S.BubbleTime>
                                </S.Bubble>
                            )}
                        </S.MessageRow>
                    );
                })}

                {/* 스크롤 앵커 */}
                <div ref={bottomRef} />
            </S.MessageList>

            {/* 입력창 */}
            <S.InputArea>
                <S.TextInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요..."
                    maxLength={500}
                />
                <S.SendButton
                    onClick={sendMessage}
                    disabled={!connected || !input.trim()}
                >
                    ▷
                </S.SendButton>
            </S.InputArea>

        </S.Container>
    );
};

export default ChatRoom;