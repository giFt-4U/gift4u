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

export const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ProductLabel = styled.p`
    font-size: 14px;
    color: #888;
    margin: 0;
    padding: 10px 14px;
    background: #fafafa;
    border-radius: 8px;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const SectionLabel = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const MessageInput = styled.textarea`
    width: 100%;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;

    &:focus {
        border-color: #FF8C00;
    }
`;

export const CharCount = styled.p`
    font-size: 12px;
    color: ${({ $warning }) => ($warning ? '#e53935' : '#aaa')};
    text-align: right;
    margin: 0;
`;

export const DesignGrid = styled.div`
    display: flex;
    gap: 12px;
`;

export const DesignItem = styled.div`
    flex: 1;
    aspect-ratio: 2/3;
    background: ${({ $bg }) => $bg};
    border-radius: 10px;
    border: 2.5px solid ${({ $selected }) => ($selected ? '#FF8C00' : 'transparent')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.15s;
    gap: 6px;
`;

export const DesignPattern = styled.span`
    font-size: 28px;
`;

export const DesignLabel = styled.span`
    font-size: 11px;
    color: #666;
`;

export const ErrorText = styled.p`
    font-size: 13px;
    color: #e53935;
    margin: 0;
    text-align: center;
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 10px;
    padding: 14px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
`;

export const PreviewButton = styled.button`
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

export const SubmitButton = styled.button`
    flex: 1;
    padding: 14px;
    background: ${({ disabled }) => (disabled ? '#ccc' : '#FF8C00')};
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
