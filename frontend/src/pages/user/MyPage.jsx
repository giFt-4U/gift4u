// MyPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getMe } from '../../api/auth';
import {
    MyPageContainer,
    ProfileSection,
    ProfileImage,
    ProfileImagePlaceholder,
    ProfileName,
    ProfileEmail,
    ProfileBadge,
    FriendCode,
    MenuSection,
    MenuItem,
    LogoutButton,
} from '../../styles/MyPageStyle';

const KakaoIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.693 2 11.215c0 2.82 1.682 5.302 4.243 6.84-.16.558-.94 3.394-.97 3.607-.038.28.104.557.382.557.18 0 .312-.08.443-.17l4.27-2.835c.685.1 1.386.15 2.1.15C17.52 19.363 22 15.67 22 11.215 22 6.693 17.52 3 12 3z" />
    </svg>
);

const MyPage = () => {
    const navigate = useNavigate();
    const { user, setUser, clearToken } = useAuthStore();

    useEffect(() => {
        if (!user) {
            getMe()
                .then((res) => setUser(res.data))
                .catch(() => {
                    clearToken();
                    navigate('/login');
                });
        }
    }, []);

    const onLogout = () => {
        clearToken();
        navigate('/login');
    };

    const isKakao = user?.loginProvider === 'KAKAO';
    const initial = user?.nickname?.charAt(0)?.toUpperCase() || '?';

    return (
        <MyPageContainer>
            <ProfileSection>
                {user?.profileImage ? (
                    <ProfileImage src={user.profileImage} alt="프로필" />
                ) : (
                    <ProfileImagePlaceholder>{initial}</ProfileImagePlaceholder>
                )}

                <ProfileName>{user?.nickname || '이름 없음'}</ProfileName>
                <ProfileEmail>{user?.email || ''}</ProfileEmail>

                {user?.friendCode && (
                    <FriendCode>내 친구코드 · {user.friendCode}</FriendCode>
                )}

                {isKakao && (
                    <ProfileBadge>
                        <KakaoIcon />
                        카카오 계정
                    </ProfileBadge>
                )}
            </ProfileSection>

            <MenuSection>
                <MenuItem onClick={() => navigate('/friends')}>
                    친구 관리
                    <span className="arrow">›</span>
                </MenuItem>
                <MenuItem onClick={() => navigate('/friends/requestList')}>
                    친구 요청 목록
                    <span className="arrow">›</span>
                </MenuItem>
            </MenuSection>

            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </MyPageContainer>
    );
};

export default MyPage;
