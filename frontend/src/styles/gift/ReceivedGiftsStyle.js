import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const GiftList = styled.div`
    flex: 1; overflow-y: auto; padding: 16px;
    display: flex; flex-direction: column; gap: 12px;
`;

export const GiftItem = styled.div`
    display: flex; align-items: center; gap: 12px;
    padding: 14px; border: 1px solid #f0f0f0;
    border-radius: 10px; background: #fff;
`;

export const ProductThumb = styled.div`
    width: 56px; height: 56px; border-radius: 8px;
    background: #FFF8F0; display: flex;
    align-items: center; justify-content: center;
    font-size: 28px; cursor: pointer; flex-shrink: 0;
`;

export const GiftInfo = styled.div`
    flex: 1; overflow: hidden;
`;

export const ProductName = styled.p`
    font-size: 14px; font-weight: 600; color: #333;
    margin: 0 0 4px; cursor: pointer;
    &:hover { text-decoration: underline; }
`;

export const StatusBadge = styled.span`
    font-size: 12px; font-weight: 600;
    color: ${({ $color }) => $color};
`;

export const ExpireText = styled.p`
    font-size: 11px; color: #bbb; margin: 4px 0 0;
`;

export const ReceiveButton = styled.button`
    padding: 8px 14px; background: #FF8C00; color: #fff;
    border: none; border-radius: 8px; font-size: 13px;
    font-weight: 600; cursor: pointer; flex-shrink: 0;
`;

export const CenterText = styled.div`
    display: flex; align-items: center;
    justify-content: center; height: 200px;
    color: #aaa; font-size: 14px;
`;