import styled from 'styled-components';

export const ShareOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const ShareModalBox = styled.div`
    width: 100%;
    max-width: 360px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`;

export const ShareModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-bottom: 1px solid #eee;
`;

export const ShareTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #111;
`;

export const ShareCloseButton = styled.button`
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #111;
    }
`;

export const ShareList = styled.div`
    display: flex;
    justify-content: center;
    gap: 48px;
    padding: 28px 20px 24px;
`;

export const ShareItem = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #444;
    min-width: 64px;
`;

export const ShareIcon = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: ${({ $bg }) => $bg || '#f0f0f0'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;
    overflow: hidden;

    svg {
        width: ${({ $full }) => ($full ? '56px' : '28px')};
        height: ${({ $full }) => ($full ? '56px' : '28px')};
    }

    ${ShareItem}:hover & {
        transform: scale(1.05);
    }
`;

export const ShareLinkBar = styled.div`
    display: flex;
    align-items: stretch;
    margin: 0 18px 18px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
`;

export const ShareLinkText = styled.input`
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
    border: none;
    font-size: 12px;
    color: #666;
    background: #fafafa;
    outline: none;
`;

export const ShareCopyButton = styled.button`
    flex-shrink: 0;
    padding: 0 16px;
    border: none;
    border-left: 1px solid #e5e5e5;
    background: white;
    font-size: 13px;
    font-weight: 600;
    color: #111;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;
