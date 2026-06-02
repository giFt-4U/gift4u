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

export const Content = styled.div`
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Label = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: #FF8C00;
    }
`;

export const ErrorText = styled.p`
    font-size: 13px;
    color: #e53935;
    margin: 0;
`;

export const SubmitButton = styled.button`
    padding: 14px;
    background: #FF8C00;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

export const ModalBox = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 28px 24px;
    width: 280px;
    text-align: center;
`;

export const ModalMessage = styled.p`
    font-size: 15px;
    color: #333;
    margin: 0 0 20px;
`;

export const ModalButton = styled.button`
    padding: 10px 32px;
    background: #FF8C00;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
`;
