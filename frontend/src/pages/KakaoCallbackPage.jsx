// KakaoCallbackPage.jsx
// 카카오 로그인 후 리다이렉트 되는 페이지
// URL: /kakao/auth-code?code=...
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { kakaoLogin } from '../api/auth';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        if (!code) {
            navigate('/login');
            return;
        }

        kakaoLogin(code)
            .then((res) => {
                setToken(res.data.accessToken);
                navigate('/');
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
