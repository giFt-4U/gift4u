import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { withdraw } from '../../api/auth';
import useAuthStore from '../../store/authStore';
import { TopBar, BackButton, TopTitle } from '../../styles/MyPageStyle';
import {
    EditContainer,
    InputGroup,
    Label,
    Input,
    ErrorText,
} from '../../styles/MyPageEditStyle';

const WarningBox = styled.div`
    background-color: #fff8f8;
    border: 1px solid #ffd6d6;
    border-radius: 12px;
    padding: 16px;
    margin: 20px 0;
`;

const WarningTitle = styled.p`
    font-size: 14px;
    font-weight: 700;
    color: #e74c3c;
    margin-bottom: 10px;
`;

const WarningList = styled.ul`
    padding-left: 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const WarningItem = styled.li`
    font-size: 13px;
    color: #666;
    line-height: 1.5;
`;

const ConfirmInput = styled(Input)`
    border-color: ${({ $hasError }) => ($hasError ? '#e74c3c' : '#e6e6e6')};
`;

const WithdrawButton = styled.button`
    width: 100%;
    height: 50px;
    margin-top: 24px;
    border-radius: 12px;
    border: 0;
    background-color: ${({ disabled }) => (disabled ? '#f0f0f0' : '#e74c3c')};
    color: ${({ disabled }) => (disabled ? '#bbb' : '#fff')};
    font-size: 15px;
    font-weight: 700;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.15s;
`;

const CONFIRM_TEXT = '탈퇴하겠습니다';

const MyPageWithdraw = () => {
    const navigate = useNavigate();
    const { clearToken } = useAuthStore();
    const [confirmText, setConfirmText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isConfirmed = confirmText === CONFIRM_TEXT;

    const onWithdraw = async () => {
        if (!isConfirmed) return;
        setLoading(true);
        setError('');
        try {
            await withdraw();
            clearToken();
            navigate('/login', { replace: true });
        } catch (err) {
            setError(err?.response?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.');
            setLoading(false);
        }
    };

    return (
        <EditContainer>

            <WarningBox>
                <WarningTitle>탈퇴 전 꼭 확인해주세요</WarningTitle>
                <WarningList>
                    <WarningItem>탈퇴 후 계정 정보는 복구되지 않습니다.</WarningItem>
                    <WarningItem>친구 목록 및 선물 내역이 모두 삭제됩니다.</WarningItem>
                    <WarningItem>탈퇴 후 동일 이메일로 재가입이 가능합니다.</WarningItem>
                </WarningList>
            </WarningBox>

            <InputGroup>
                <Label>탈퇴 확인</Label>
                <ConfirmInput
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={`"${CONFIRM_TEXT}" 라고 입력해주세요`}
                    $hasError={confirmText.length > 0 && !isConfirmed}
                />
            </InputGroup>

            {error && <ErrorText>{error}</ErrorText>}

            <WithdrawButton onClick={onWithdraw} disabled={!isConfirmed || loading}>
                {loading ? '처리 중...' : '회원탈퇴'}
            </WithdrawButton>
        </EditContainer>
    );
};

export default MyPageWithdraw;
