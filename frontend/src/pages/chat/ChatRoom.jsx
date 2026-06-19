import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getChatRooms, getMessages } from '../../api/chatApi';
import { getGift } from '../../api/giftApi';
import axiosInstance from '../../api/axiosInstance';
import * as S from '../../styles/chat/ChatRoomStyle';
import useAuthStore from '../../store/authStore';

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
    const location = useLocation();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [connected, setConnected] = useState(false);
    const [giftCardMap, setGiftCardMap] = useState({});

    // 채팅방 상대방 정보
    const [opponentName, setOpponentName] = useState(location.state?.partnerName ?? '');
    const [opponentFriendCode, setOpponentFriendCode] = useState(
        location.state?.opponentFriendCode ?? ''
    );

    // + 버튼 메뉴 상태
    const [menuOpen, setMenuOpen] = useState(false);

    // STOMP 클라이언트 ref — 렌더링과 무관하게 유지
    const stompClientRef = useRef(null);
    // 메시지 목록 맨 아래로 자동 스크롤
    const bottomRef = useRef(null);
    // 현재 로그인한 userId (localStorage에서 파싱)
    const { user } = useAuthStore();

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const payload = token.split('.')[1]; // 페이로드 구간 추출
            const decoded = JSON.parse(atob(payload)); // Base64 디코딩
            return decoded.sub; // 백엔드 subject에 담긴 userId (21 같은 숫자)
        } catch (e) {
            return null;
        }
    };

    const myUserId = user?.id || user?.userId || getUserIdFromToken();

    // ── GIFT 타입 메시지에서 uuid 파싱 ───────────────
    // BE에서 "선물이 도착했어요! 🎁 {uuid}" 형태로 저장
    const parseGiftUuid = (content) => {
        const parts = content?.split('🎁');
        return parts?.length > 1 ? parts[1].trim() : null;
    };

    // ── 1. 과거 메시지 조회 ─────────────────────────────
    useEffect(() => {

        if (!roomId || roomId === 'undefined') return;

        getMessages(roomId)
            .then((res) => {
                // API는 최신순(DESC)으로 내려오므로 뒤집어서 표시
                const sorted = [...res.data.content].reverse();
                setMessages(sorted);
            })
            .catch(() => { });
    }, [roomId]);

    // ── 1-1. 채팅방 상대방 정보 조회 ─────────────────────
    // 친구 관리/채팅 목록에서 state로 넘어오지 않거나 새로고침했을 때 대비
    useEffect(() => {
        if (!roomId || roomId === 'undefined') return;

        // 이미 상대방 정보가 있으면 다시 조회하지 않음
        if (opponentName && opponentFriendCode) return;

        getChatRooms()
            .then((res) => {
                const currentRoom = res.data.find(
                    (room) => Number(room.roomId) === Number(roomId)
                );

                if (!currentRoom) return;

                setOpponentName(currentRoom.opponentNickname ?? '');
                setOpponentFriendCode(currentRoom.opponentFriendCode ?? '');
            })
            .catch(() => {
                console.error('채팅방 상대방 정보 조회 실패');
            });
    }, [roomId, opponentName, opponentFriendCode]);


    // ── 1-2. GIFT 메시지는 content에 uuid만 있는 경우가 많아서 카드 데이터 보강 ─────
    useEffect(() => {
        const uuids = Array.from(
            new Set(
                messages
                    .filter((msg) => msg.messageType === 'GIFT')
                    .map((msg) => parseGiftUuid(msg.content))
                    .filter((giftUuid) => giftUuid && !giftCardMap[giftUuid])
            )
        );

        if (uuids.length === 0) return;

        let cancelled = false;

        const fetchGiftCards = async () => {
            const entries = await Promise.all(
                uuids.map(async (giftUuid) => {
                    try {
                        const res = await getGift(giftUuid);
                        const gift = res.data || {};

                        let productImageUrl =
                            gift.productImageUrl ||
                            gift.productImage ||
                            gift.imageUrl ||
                            gift.image_url ||
                            null;

                        if (!productImageUrl && gift.productId) {
                            try {
                                const pRes = await axiosInstance.get(`/api/products/${gift.productId}`);
                                productImageUrl =
                                    pRes.data?.imageUrl ||
                                    pRes.data?.image_url ||
                                    pRes.data?.productImageUrl ||
                                    pRes.data?.productImage ||
                                    null;
                            } catch (e) {
                                console.error('채팅 선물 카드 상품 이미지 조회 실패:', e);
                            }
                        }

                        return [giftUuid, { ...gift, productImageUrl }];
                    } catch (e) {
                        console.error('채팅 선물 카드 조회 실패:', e);
                        return [giftUuid, null];
                    }
                })
            );

            if (cancelled) return;

            setGiftCardMap((prev) => {
                const next = { ...prev };
                entries.forEach(([giftUuid, gift]) => {
                    if (gift) next[giftUuid] = gift;
                });
                return next;
            });
        };

        fetchGiftCards();

        return () => {
            cancelled = true;
        };
    }, [messages, giftCardMap]);

    // ── 2. STOMP 연결 ────────────────────────────────────
    useEffect(() => {
        const token = localStorage.getItem('token');

        const client = new Client({
            // SockJS 팩토리: 브라우저 WebSocket 미지원 환경 폴백
            webSocketFactory: () =>
                new SockJS(`${import.meta.env.VITE_API_URL}/ws`),

            // 연결 헤더에 JWT 토큰 포함
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
                senderId: Number(myUserId),
                content: trimmed,
                messageType: 'TEXT',
            }),
        });

        localStorage.setItem(`chat_read_${roomId}`, new Date().toISOString());
        setInput('');
    };

    // Enter 키로 전송 (Shift+Enter는 줄바꿈)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ── 6. 친구 위시리스트 이동 ─────────────────────────
    const handleGiftMenuClick = () => {
        if (!opponentFriendCode) {
            alert('상대방 친구 코드를 불러오지 못했습니다.');
            return;
        }

        setMenuOpen(false);
        navigate(`/wishlist/friends/${opponentFriendCode}`);
    };

    // ── 렌더링 ────────────────────────────────────────────
    return (
        <S.Container>

            {/* 메시지 목록 */}
            <S.MessageList>
                {messages.map((msg, idx) => {
                    const isMine = Number(msg.senderId) === Number(myUserId);
                    const isGift = msg.messageType === 'GIFT';
                    const uuid = isGift ? parseGiftUuid(msg.content) : null;
                    const gift = uuid ? { ...(giftCardMap[uuid] || {}), ...(msg?.giftData || {}) } : {};

                    const uploadedImageSrc =
                        gift?.uploadedImgUrl ||
                        gift?.uploadedImageUrl ||
                        gift?.customImageUrl ||
                        gift?.giftImageUrl ||
                        msg?.uploadedImgUrl ||
                        msg?.uploadedImageUrl ||
                        msg?.customImageUrl ||
                        null;

                    const productImageSrc =
                        gift?.productImageUrl ||
                        gift?.productImage ||
                        gift?.imageUrl ||
                        gift?.image_url ||
                        msg?.productImageUrl ||
                        msg?.productImage ||
                        msg?.imageUrl ||
                        msg?.image_url ||
                        null;

                    const giftCardDesignType = gift?.cardDesignType || msg?.cardDesignType || 1;
                    const giftProductName = gift?.productName || msg?.productName || '선물이 도착했어요!';
                    const giftBrandName = gift?.brandName || msg?.brandName || '따숨품';

                    return (
                        <S.MessageRow key={msg.id ?? idx} $isMine={isMine}>

                            {/* GIFT 타입 — 와이어프레임 기준 선물 카드 */}
                            {isGift && uuid ? (
                                <S.GiftCardWrapper $bgImg={`/images/cards/card${giftCardDesignType}.png`}>

                                    {/* 1. 상단 대형 X박스 이미지 영역 */}
                                    <S.GiftCardImageFrame>
                                        {uploadedImageSrc ? (
                                            <S.RealGiftImage
                                                src={uploadedImageSrc}
                                                alt="선물 카드 메인 이미지"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <S.ImagePlaceholderLine />
                                        )}
                                    </S.GiftCardImageFrame>

                                    {/* 2. 중앙 가로배치형 상품 정보 세트 */}
                                    <S.GiftCardInfoRow>
                                        <S.SmallThumbBox>
                                            {productImageSrc ? (
                                                <S.RealGiftImage
                                                    src={productImageSrc}
                                                    alt={giftProductName}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = '/images/default.png';
                                                    }}
                                                />
                                            ) : (
                                                <S.ImagePlaceholderLine />
                                            )}
                                        </S.SmallThumbBox>
                                        <S.GiftCardTextGroup>
                                            <S.GiftCardBrand>{giftBrandName}</S.GiftCardBrand>
                                            <S.GiftCardName>{giftProductName}</S.GiftCardName>
                                        </S.GiftCardTextGroup>
                                    </S.GiftCardInfoRow>

                                    {/* 3. 하단 독립형 흰색 둥근 버튼 그룹 */}
                                    <S.GiftCardButtonGroup>
                                        <S.GiftCardActionButton onClick={() => navigate(`/gifts/${uuid}`)}>
                                            선물 확인하기
                                        </S.GiftCardActionButton>
                                        <S.GiftCardActionButton onClick={() => navigate(`/gifts/${uuid}/address`)}>
                                            주소 입력하기
                                        </S.GiftCardActionButton>
                                    </S.GiftCardButtonGroup>

                                </S.GiftCardWrapper>
                            ) : (/* TEXT 타입 — 일반 말풍선 */
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
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setMenuOpen(prev => !prev)}
                        style={{
                            width: '36px',
                            height: '36px',
                            border: '1px solid #ddd',
                            borderRadius: '50%',
                            background: '#fff',
                            cursor: 'pointer',
                            fontSize: '22px',
                            lineHeight: '1',
                            marginRight: '8px',
                        }}
                    >
                        +
                    </button>

                    {menuOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: '46px',
                                width: '150px',
                                padding: '8px',
                                border: '1px solid #e5e5e5',
                                borderRadius: '12px',
                                background: '#fff',
                                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                                zIndex: 30,
                            }}
                        >
                            <button
                                type="button"
                                onClick={handleGiftMenuClick}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: 'transparent',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }}
                            >
                                🎁 선물하기
                            </button>
                        </div>
                    )}
                </div>

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

        </S.Container >
    );
};

export default ChatRoom;