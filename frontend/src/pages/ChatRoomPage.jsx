import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useChat } from '../hook/useChat';
import MessageBubble from '../components/common/chat/MessageBubble';
import MessageInput from '../components/common/chat/MessageInput';

const MY_ID = 1; // 추후 로그인 연동

export default function ChatRoomPage() {
    const { roomId } = useParams();       // URL에서 roomId 추출
    const navigate = useNavigate();
    const { messages, sendMessage, connected } = useChat(Number(roomId), MY_ID);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container>
            <Header>
                <BackBtn onClick={() => navigate('/chat')}>←</BackBtn>
                <Logo>따숨품</Logo>
                <Status connected={connected}>
                    {connected ? '● 연결됨' : '○ 연결 중'}
                </Status>
            </Header>

            <MessageList>
                {messages.map((msg, idx) => (
                    <MessageBubble
                        key={msg.id ?? idx}
                        message={msg}
                        isMine={msg.senderId === MY_ID}
                    />
                ))}
                <div ref={bottomRef} />
            </MessageList>

            <MessageInput onSend={sendMessage} disabled={!connected} />
        </Container>
    );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #333;
  margin-right: 12px;
`;

const Logo = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  margin: 0;
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