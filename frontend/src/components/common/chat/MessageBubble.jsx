import styled from 'styled-components';

export default function MessageBubble({ message, isMine }) {
    return (
        <Wrapper isMine={isMine}>
            <Bubble isMine={isMine}>
                {message.content}
            </Bubble>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justfy-content: ${({ isMine }) => isMine ? 'flex-end' : 'flex-start'};
    margin-bottom: 8px;
`;

const Bubble = styled.span`
    max-width: 60%;
    padding: 8px 14px;
    border-radius: ${({ isMine }) => isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
    background: ${({ isMine }) => isMine ? '#4CAF50' : '#f0f0f0'};
    color: ${({ isMine }) => isMine ? '#fff' : '#333'};
    font-size: 14px;
    word-break: break-word;
    line-height: 1.5;
`;