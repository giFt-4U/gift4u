// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { login, getMe } from '../../api/auth';
import { getRoleFromToken, isAdminRole, resolveUserRole } from '../../utils/authUtils';
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
    BottomLink,
} from '../../styles/AuthStyle';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = 'http://localhost:5173/kakao/auth-code';

const KakaoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.693 2 11.215c0 2.82 1.682 5.302 4.243 6.84-.16.558-.94 3.394-.97 3.607-.038.28.104.557.382.557.18 0 .312-.08.443-.17l4.27-2.835c.685.1 1.386.15 2.1.15C17.52 19.363 22 15.67 22 11.215 22 6.693 17.52 3 12 3z" />
    </svg>
);

const LoginPage = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 이미 ADMIN으로 로그인된 상태면 관리자 페이지로
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        getMe()
            .then((res) => {
                const role = resolveUserRole(res.data, token);
                setUser({ ...res.data, role });
                if (isAdminRole(role)) {
                    navigate('/admin', { replace: true });
                }
            })
            .catch(() => {});
    }, [navigate, setUser]);

    const onKakaoLogin = () => {
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

    const onLogin = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            localStorage.removeItem('user');
            const res = await login(email, password);
            const accessToken = res.data.accessToken;
            setToken(accessToken);
            const meRes = await getMe();
            const role = res.data.role || resolveUserRole(meRes.data, accessToken);
            setUser({ ...meRes.data, role });
            navigate(isAdminRole(role) ? '/admin' : '/', { replace: true });
        } catch {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthHeader>
                <AuthTitle>로그인</AuthTitle>
                <AuthSubtitle>
                    {'카카오로 간편하게 로그인하거나\n이메일로 직접 로그인할 수 있어요.'}
                </AuthSubtitle>
            </AuthHeader>

            <KakaoButton type="button" onClick={onKakaoLogin}>
                <KakaoIcon />
                카카오 간편 로그인 / 회원가입
            </KakaoButton>

            <Divider>
                <span>또는 이메일로 로그인</span>
            </Divider>

            <form onSubmit={onLogin}>
                <FormGroup>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <PrimaryButton type="submit" disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </PrimaryButton>
            </form>

            <BottomLink>
                아직 회원이 아니신가요?
                <span onClick={() => navigate('/signup')}>회원가입</span>
            </BottomLink>
        </AuthContainer>
    );
};

export default LoginPage;
