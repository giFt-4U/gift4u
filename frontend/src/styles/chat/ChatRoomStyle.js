import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #333;
    width: 32px;
`;

export const Title = styled.h1`
    font-size: 18px;
    font-weight: 700;
    color: #FF8C00;
    margin: 0;
`;

export const MessageList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MessageRow = styled.div`
    display: flex;
    justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
`;

export const Bubble = styled.div`
    max-width: 70%;
    background: ${({ $isMine }) => ($isMine ? '#FF8C00' : '#f5f5f5')};
    color: ${({ $isMine }) => ($isMine ? '#fff' : '#222')};
    border-radius: ${({ $isMine }) =>
        $isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
    padding: 10px 14px;
`;

export const BubbleText = styled.p`
    margin: 0 0 4px;
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word;
`;

export const BubbleTime = styled.span`
    font-size: 10px;
    opacity: 0.7;
    display: block;
    text-align: right;
`;

/* GIFT 타입 말풍선 */
export const GiftCard = styled.div`
    background: #FFF8F0;
    border: 1.5px solid #FF8C00;
    border-radius: 12px;
    padding: 16px 20px;
    text-align: center;
    cursor: pointer;
    max-width: 200px;

    &:active {
        opacity: 0.8;
    }
`;

export const GiftCardIcon = styled.div`
    font-size: 32px;
    margin-bottom: 8px;
`;

export const GiftCardText = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 4px;
`;

export const GiftCardSub = styled.p`
    font-size: 12px;
    color: #FF8C00;
    margin: 0;
`;

/* 입력창 */
export const InputArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
`;

export const TextInput = styled.input`
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: #FF8C00;
    }
`;

export const SendButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ disabled }) => (disabled ? '#ddd' : '#FF8C00')};
    color: #fff;
    border: none;
    font-size: 18px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;
