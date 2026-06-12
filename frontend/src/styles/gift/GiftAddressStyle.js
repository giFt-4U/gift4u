import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const FieldLabel = styled.label`
    font-size: 13px;
    font-weight: 600;
    color: #555;
`;

export const FieldInput = styled.input`
    width: 100%;
    padding: 12px 14px;
    border: 1px solid ${({ $hasError }) => ($hasError ? '#e53935' : '#ddd')};
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: ${({ $hasError }) => ($hasError ? '#e53935' : '#FF8C00')};
    }

    &::placeholder {
        color: #bbb;
    }
`;

export const FieldError = styled.p`
    font-size: 12px;
    color: #e53935;
    margin: 0;
`;

export const MemoBox = styled.div`
    padding: 12px 14px;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #eee;
`;

export const MemoText = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 2px;
`;

export const MemoSub = styled.p`
    font-size: 12px;
    color: #aaa;
    margin: 0;
`;

export const AddButton = styled.button`
    padding: 12px;
    border: 1.5px dashed #ddd;
    border-radius: 8px;
    background: none;
    font-size: 14px;
    color: #888;
    cursor: pointer;
    text-align: center;
`;

export const ApiError = styled.p`
    font-size: 14px;
    color: #e53935;
    text-align: center;
    margin: 0;
    padding: 12px;
    background: #fff5f5;
    border-radius: 8px;
`;

export const BottomArea = styled.div`
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 16px;
    background: ${({ disabled }) => (disabled ? '#ccc' : '#FF8C00')};
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const AddressRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const SearchButton = styled.button`
    padding: 12px 14px;
    background: #FF8C00;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
`;

export const ZipCode = styled.p`
    font-size: 12px;
    color: #888;
    margin: 4px 0 0;
`;

export const CenterText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #aaa;
`;