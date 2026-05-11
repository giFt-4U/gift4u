import { useEffect, useRef, useState } from "react";
import { Client } from '@stomp/stompjs';
import { getMessages } from '../api/chatApi';

export function useChat(roomId, senderId) {
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const clientRef = useRef(null);

    // 메시지 내역 불러오기
    useEffect(() => {
        if (!roomId) return;

        getMessages(roomId)
            .then(setMessages)
            .catch(err => console.error("메시지 조회 실패:", err));
    }, [roomId]);

    // STOMP 연결
    useEffect(() => {
        if (!roomId) return;

        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws-stomp/websocket',
            reconnectDelay: 3000,

            onConnect: () => {
                setConnected(true);

                client.subscribe(`/sub/chat/room/${roomId}`, (msg) => {
                    const received = JSON.parse(msg.body);
                    setMessages(prev => [...prev, received]);
                });
            },
            onDisconnect: () => setConnected(false),
        });
        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
            setConnected(false);
        };
    }, [roomId]);

    const sendMessage = (content) => {
        if (!clientRef.current?.connected) return;

        clientRef.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify({
                senderId,
                roomId,
                type: 'TEXT',
                content,
            }),
        });
    };

    return { messages, sendMessage, connected };
}