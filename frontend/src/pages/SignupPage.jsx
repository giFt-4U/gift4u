// SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import {
    AuthContainer,
    AuthHeader,
    AuthTitle,
    AuthSubtitle,
    KakaoButton,
    Divider,
    FormGroup,
    Label,
    Input,
    PrimaryButton,
    ErrorMsg,
    CheckRow,
    CheckSection,
    BottomLink,
} from '../styles/AuthStyle';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = 'http://localhost:5173/kakao/auth-code';

const KakaoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.693 2 11.215c0 2.82 1.682 5.302 4.243 6.84-.16.558-.94 3.394-.97 3.607-.038.28.104.557.382.557.18 0 .312-.08.443-.17l4.27-2.835c.685.1 1.386.15 2.1.15C17.52 19.363 22 15.67 22 11.215 22 6.693 17.52 3 12 3z" />
    </svg>
);

const INIT_FORM = {
    email: '',
    password: '',
    nickname: '',
    phone: '',
    termsAgreed: false,
    marketingAgreed: false,
};

const SignupPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState(INIT_FORM);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onKakaoSignup = () => {
        if (!KAKAO_REST_API_KEY) {
            alert('.env에 VITE_KAKAO_REST_API_KEY를 추가해주세요.');
            return;
        }
        const url =
            `https://kauth.kakao.com/oauth/authorize` +
            `?client_id=${KAKAO_REST_API_KEY}` +
            `&redirect_uri=${KAKAO_REDIRECT_URI}` +
            `&response_type=code` +
            `&scope=profile_nickname,profile_image`;
        window.location.href = url;
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validate = () => {
        if (!form.email.trim() || !form.password.trim() || !form.nickname.trim()) {
            return '이메일, 비밀번호, 닉네임은 필수입니다.';
        }
        if (form.password.length < 8) {
            return '비밀번호는 8자 이상이어야 합니다.';
        }
        if (!form.termsAgreed) {
            return '이용약관에 동의해주세요.';
        }
        return '';
    };

    const onSignup = async (e) => {
        e.preventDefault();
        const msg = validate();
        if (msg) {
            setError(msg);
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signup(form);
            alert('회원가입이 완료되었습니다!\n로그인해주세요.');
            navigate('/login');
        } catch (err) {
            const serverMsg = err.response?.data?.message;
            setError(serverMsg || '회원가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthHeader>
                <AuthTitle>회원가입</AuthTitle>
                <AuthSubtitle>
                    {'카카오로 간편하게 시작하거나\n이메일로 직접 가입할 수 있어요.'}
                </AuthSubtitle>
            </AuthHeader>

            <KakaoButton type="button" onClick={onKakaoSignup}>
                <KakaoIcon />
                카카오 1초 회원가입
            </KakaoButton>

            <Divider>
                <span>또는 이메일로 가입</span>
            </Divider>

            <form onSubmit={onSignup}>
                <FormGroup>
                    <Label htmlFor="email">
                        이메일 <span style={{ color: '#e74c3c' }}>*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="이메일 입력"
                        value={form.email}
                        onChange={onChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">
                        비밀번호 <span style={{ color: '#e74c3c' }}>*</span>
                        <span style={{ fontWeight: 400, color: '#c0c0c0', marginLeft: 6 }}>
                            (8자 이상)
                        </span>
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="비밀번호 입력"
                        value={form.password}
                        onChange={onChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="nickname">
                        닉네임 <span style={{ color: '#e74c3c' }}>*</span>
                    </Label>
                    <Input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="닉네임 입력"
                        value={form.nickname}
                        onChange={onChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="phone">
                        휴대폰
                        <span style={{ fontWeight: 400, color: '#c0c0c0', marginLeft: 6 }}>
                            (선택)
                        </span>
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="010-0000-0000"
                        value={form.phone}
                        onChange={onChange}
                    />
                </FormGroup>

                <CheckSection>
                    <CheckRow>
                        <input
                            type="checkbox"
                            name="termsAgreed"
                            checked={form.termsAgreed}
                            onChange={onChange}
                        />
                        이용약관 동의{' '}
                        <span style={{ color: '#e74c3c', fontWeight: 700 }}>(필수)</span>
                    </CheckRow>
                    <CheckRow>
                        <input
                            type="checkbox"
                            name="marketingAgreed"
                            checked={form.marketingAgreed}
                            onChange={onChange}
                        />
                        마케팅 정보 수신 동의{' '}
                        <span style={{ color: '#c0c0c0' }}>(선택)</span>
                    </CheckRow>
                </CheckSection>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <PrimaryButton type="submit" disabled={loading}>
                    {loading ? '가입 중...' : '회원가입'}
                </PrimaryButton>
            </form>

            <BottomLink>
                이미 회원이신가요?
                <span onClick={() => navigate('/login')}>로그인</span>
            </BottomLink>
        </AuthContainer>
    );
};

export default SignupPage;
