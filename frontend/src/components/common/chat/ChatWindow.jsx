import { useEffect, useRef } from "react";
import styled from "styled-components";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useChat } from "../../../hook/useChat";

export default function ChatWindow({ roomId, myId }) {
    const { messages, sendMessage, connected } = useChat(roomId, myId);
    const bottomRef = useRef(null);

    // 새 메시지 시 하단이동
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container>
            <Header>
                채팅방 #{roomId}
                <Status connected={connected}>
                    {connected ? '● 연결됨' : '○ 연결 중...'}
                </Status>
            </Header>
            <MessageList>
                {messages.map((messages, idx) => (
                    <MessageBubble
                        key={msg.id ?? idx}
                        message={msg}
                        isMine={msg.sendrId == myId}
                    />
                ))}
                <div ref={bottomRef} />
            </MessageList>

            <MessageInput onSend={sendMessage} disabled={!connected} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
`;

const Header = styled.div`
    display: flex;
    align-itmes: center;
    justify-content: sapce-between;
    font-weight: 600;
    border-bottom: 1px soild #eee;
`;

const Status = styled.span`
    font-size: 12px;
    color: ${({ connected }) => connected ? '#4CAF50' : '#aaa'};
`;

const MessageList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
`;