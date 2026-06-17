import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api/auth';
import {
    EditContainer,
    EditHeader,
    InputGroup,
    Label,
    Input,
    HelpText,
    ErrorText,
    ButtonRow,
    SecondaryButton,
    PrimaryButton,
} from '../../styles/MyPageEditStyle';
import { TopBar, BackButton, TopTitle } from '../../styles/MyPageStyle';

const getErrorMessage = (err) => {
    const code = err?.response?.data?.code;
    if (code === 'INVALID_CURRENT_PASSWORD') return '현재 비밀번호가 올바르지 않습니다.';
    return err?.response?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.';
};

const MyPagePassword = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isValid =
        currentPassword.length > 0 &&
        newPassword.length >= 8 &&
        newPassword === confirmPassword;

    const onSubmit = async () => {
        if (!isValid) return;
        if (newPassword === currentPassword) {
            setError('새 비밀번호가 현재 비밀번호와 동일합니다.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await changePassword({ currentPassword, newPassword });
            alert('비밀번호가 변경되었습니다.');
            navigate('/mypage');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <EditContainer>
            <TopBar>
                <BackButton onClick={() => navigate('/mypage')}>‹</BackButton>
                <TopTitle>비밀번호 변경</TopTitle>
            </TopBar>

            <EditHeader />

            <InputGroup>
                <Label htmlFor="currentPassword">현재 비밀번호</Label>
                <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호 입력"
                    autoComplete="current-password"
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호 입력"
                    autoComplete="new-password"
                />
                <HelpText>8자 이상 입력해주세요.</HelpText>
            </InputGroup>

            <InputGroup>
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호 재입력"
                    autoComplete="new-password"
                />
                {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                    <HelpText style={{ color: '#e74c3c' }}>비밀번호가 일치하지 않습니다.</HelpText>
                )}
            </InputGroup>

            {error && <ErrorText>{error}</ErrorText>}

            <ButtonRow>
                <SecondaryButton onClick={() => navigate('/mypage')}>취소</SecondaryButton>
                <PrimaryButton
                    onClick={onSubmit}
                    $disabled={!isValid || loading}
                    disabled={!isValid || loading}
                >
                    {loading ? '변경 중...' : '변경하기'}
                </PrimaryButton>
            </ButtonRow>
        </EditContainer>
    );
};

export default MyPagePassword;
