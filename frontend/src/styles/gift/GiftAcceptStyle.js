import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px 24px;
`;

export const CheckIcon = styled.div`
    padding-top: 130px;
    width: 72px;
`;

export const CompleteText = styled.p`
    font-size: 20px;
    font-weight: 700;
    color: #222;
    margin: 0;
    padding-top: 80px;
    text-align: center;
`;

export const SubText = styled.p`
    font-size: 14px;
    color: #888;
    margin: 0;
    text-align: center;
    line-height: 1.8;
    white-space: pre-line;
    padding-bottom: 80px;
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
`;

export const HomeButton = styled.button`
    flex: 1;
    padding: 14px;
    background: #fff;
    color: #FF8C00;
    border: 1.5px solid #FF8C00;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

export const GiftBoxButton = styled.button`
    flex: 2;
    padding: 14px;
    background: #FF8C00;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;
