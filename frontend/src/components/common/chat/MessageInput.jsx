import { useState } from "react";
import styled from "styled-components";

export default function MessageInput({ onSend, disabled }) {
    const [value, setValue] = useState('');

    const handleSend = () => {
        if (!value.trim() || disabled) return;

        onSend(value);
        setValue('');
    };

    return (
        <Wrapper>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key == 'Enter' && handleSend()}
                placeholder={disabled ? '연결 중...' : '메시지를 입력하세요.'}
                disabled={disabled}
            />
            <SendButton onClick={handleSend} disabled={disabled}>
                전송
            </SendButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    gap: 8px;
    pandding: 12px;
    border-top: 1px solid #eee;
`;

const Input = styled.input`
    flex:1;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    &:focus {border-color: #4CAF50;}
`;

const SendButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background: ${({ disabled }) => disabled ? '#ccc' : '#4CAF50'};
    color: #fff;
    font-size: 14px;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`;