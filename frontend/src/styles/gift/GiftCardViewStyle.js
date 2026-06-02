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

export const CardArea = styled.div`
    flex: 1;
    background: ${({ $bg }) => $bg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30px 24px;
    overflow-y: auto;
`;

export const PatternRow = styled.div`
    display: flex;
    gap: 12px;
    opacity: 0.5;
`;

export const PatternIcon = styled.span`
    font-size: 20px;
`;

export const ProductBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.7);
    border-radius: 12px;
    padding: 16px 24px;
    width: 100%;
    box-sizing: border-box;
`;

export const ProductImg = styled.div`
    font-size: 48px;
`;

export const ProductName = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 0;
    text-align: center;
`;

export const MessageBox = styled.div`
    background: rgba(255,255,255,0.8);
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
`;

export const MessageText = styled.p`
    font-size: 15px;
    color: #444;
    line-height: 1.8;
    margin: 0;
    text-align: center;
    word-break: break-word;
    white-space: pre-wrap;
`;

export const ButtonArea = styled.div`
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
`;

export const ActionButton = styled.button`
    width: 100%;
    padding: 16px;
    background: ${({ $accent }) => $accent ?? '#FF8C00'};
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
`;

export const DisabledButton = styled.button`
    width: 100%;
    padding: 16px;
    background: #eee;
    color: #aaa;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: not-allowed;
`;

export const CenterText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #aaa;
    font-size: 14px;
`;
