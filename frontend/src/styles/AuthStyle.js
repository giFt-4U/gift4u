// AuthStyle.js
import styled from 'styled-components';

export const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 0 40px;
`;

export const AuthHeader = styled.div`
    margin-bottom: 32px;
`;

export const AuthTitle = styled.h2`
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
`;

export const AuthSubtitle = styled.p`
    font-size: 13px;
    color: #999;
    line-height: 1.7;
    white-space: pre-line;
`;

export const KakaoButton = styled.button`
    width: 100%;
    height: 52px;
    background-color: #fee500;
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #3c1e1e;
    cursor: pointer;
    margin-bottom: 20px;
    transition: opacity 0.15s;

    &:active {
        opacity: 0.85;
    }
`;

export const Divider = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: #ebebeb;
    }

    span {
        font-size: 12px;
        color: #c0c0c0;
        white-space: nowrap;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 14px;
`;

export const Label = styled.label`
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #555;
    margin-bottom: 6px;
`;

export const Input = styled.input`
    width: 100%;
    height: 48px;
    border: 1.5px solid #e6e6e6;
    border-radius: 10px;
    padding: 0 14px;
    font-size: 14px;
    color: #1a1a1a;
    background: #fafafa;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, background 0.2s;

    &:focus {
        border-color: #f5c542;
        background: #fff;
    }

    &::placeholder {
        color: #d0d0d0;
    }
`;

export const PrimaryButton = styled.button`
    width: 100%;
    height: 52px;
    background-color: #f5c542;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    margin-top: 6px;
    transition: opacity 0.15s;

    &:active {
        opacity: 0.88;
    }

    &:disabled {
        background-color: #e0e0e0;
        color: #aaa;
        cursor: not-allowed;
    }
`;

export const ErrorMsg = styled.p`
    font-size: 12px;
    color: #e74c3c;
    margin-top: 6px;
    margin-bottom: 4px;
`;

export const CheckRow = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #555;
    cursor: pointer;
    margin-bottom: 10px;

    input[type='checkbox'] {
        width: 16px;
        height: 16px;
        accent-color: #f5c542;
        cursor: pointer;
        flex-shrink: 0;
    }
`;

export const CheckSection = styled.div`
    margin: 16px 0 4px;
`;

export const BottomLink = styled.div`
    text-align: center;
    margin-top: 28px;
    font-size: 13px;
    color: #999;

    span {
        color: #f5c542;
        font-weight: 700;
        cursor: pointer;
        margin-left: 4px;
    }
`;
