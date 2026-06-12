// KakaoCallbackPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { kakaoLogin, getMe } from '../../api/auth';
import { resolveUserRole, isAdminRole } from '../../utils/authUtils';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthStore();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        if (!code) {
            navigate('/login');
            return;
        }

        kakaoLogin(code)
            .then(async (res) => {
                setToken(res.data.accessToken);
                try {
                    const meRes = await getMe();
                    const role = resolveUserRole(meRes.data, res.data.accessToken);
                    setUser({ ...meRes.data, role });
                    navigate(isAdminRole(role) ? '/admin' : '/', { replace: true });
                } catch {
                    navigate('/', { replace: true });
                }
            })
            .catch(() => {
                alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
                navigate('/login');
            });
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                gap: '16px',
            }}
        >
            <div
                style={{
                    width: '36px',
                    height: '36px',
                    border: '3px solid #f5c542',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.75s linear infinite',
                }}
            />
            <p style={{ color: '#999', fontSize: '14px' }}>카카오 로그인 중...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default KakaoCallbackPage;
