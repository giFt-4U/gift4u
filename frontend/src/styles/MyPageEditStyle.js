import styled from 'styled-components';

export const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const EditHeader = styled.h1`
    margin: 4px 0 20px;
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
`;

export const AvatarWrap = styled.div`
    position: relative;
    width: 88px;
    height: 88px;
    margin: 0 auto 20px;
`;

export const AvatarImage = styled.img`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #f5c542;
    background-color: #f0f0f0;
`;

export const AvatarPlaceholder = styled.div`
    width: 88px;
    height: 88px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5c542;
    color: #fff;
    font-size: 34px;
    font-weight: 700;
`;

export const AvatarAddButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 0;
    background-color: #ff8c00;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
`;

export const DeleteImageButton = styled.button`
    display: block;
    margin: -8px auto 16px;
    border: 0;
    background: transparent;
    color: #999;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 14px;
`;

export const Label = styled.label`
    font-size: 13px;
    font-weight: 600;
    color: #444;
`;

export const Input = styled.input`
    width: 100%;
    height: 46px;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    padding: 0 12px;
    font-size: 14px;
`;

export const HelpText = styled.p`
    margin-top: 4px;
    font-size: 12px;
    color: #999;
`;

export const ErrorText = styled.p`
    margin-top: 8px;
    font-size: 13px;
    color: #e74c3c;
`;

export const ButtonRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 22px;
`;

export const SecondaryButton = styled.button`
    height: 46px;
    border-radius: 12px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    color: #666;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

export const PrimaryButton = styled.button`
    height: 46px;
    border-radius: 12px;
    border: 0;
    background-color: #ff8c00;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;
