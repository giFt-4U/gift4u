import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 92vh;
    background: #fff;
    overflow: hidden;
    margin: -20px;
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

export const GiftCardText = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 4px;
`;

export const InputArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0; 
    background: #fff;
`;

export const TextInput = styled.input`
    flex: 1;
    height: 40px; 
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
    padding-left: 4px;
    padding-bottom: 3px;
`;


export const GiftCardWrapper = styled.div`
    width: 250px; /* 대화창 내부 최적화 너비 */
    background-image: ${({ $bgImg }) => `url(${$bgImg})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px;
    overflow: hidden;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
`;

export const GiftCardImageFrame = styled.div`
    width: 100%;
    aspect-ratio: 1.3 / 1;
    background: #fff;
    border: 1px solid #ccc;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 4px;
`;

export const ImagePlaceholderLine = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    &::before, &::after {
        content: "";
        position: absolute;
        width: 141.4%;
        height: 1px;
        background: #ddd;
        top: 0;
    }
    &::before { left: 0; transform: rotate(37.5deg); transform-origin: top left; }
    &::after { right: 0; transform: rotate(-37.5deg); transform-origin: top right; }
`;

export const RealGiftImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

export const GiftCardInfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    background: rgba(255, 255, 255, 0.9); /* 뒤 일러스트지가 은은히 비치는 투명 화이트 패널 */
    padding: 10px;
    border-radius: 6px;
    box-sizing: border-box;
`;

export const SmallThumbBox = styled.div`
    width: 46px;
    height: 46px;
    background: #fff;
    border: 1px solid #ccc;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 2px;
`;

export const GiftCardTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    text-align: left;
`;

export const GiftCardBrand = styled.span`
    font-size: 11px;
    color: #666;
    font-weight: 500;
`;

export const GiftCardName = styled.h2`
    font-size: 13px;
    font-weight: 600;
    color: #222;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const GiftCardButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

export const GiftCardActionButton = styled.button`
    width: 100%;
    padding: 11px;
    background: #ffffff;
    color: #333333;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    transition: background 0.1s;

    &:active {
        background: #f7f7f7;
    }
`;
