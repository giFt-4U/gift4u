// MyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getMe } from '../../api/auth';
import { getFriendRequests } from '../../api/chatApi';
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
    const [hasNewRequest, setHasNewRequest] = useState(false);

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

    // 친구요청 개수
    useEffect(() => {
        const checkRequests = async () => {
            try {
                // 1. 서버에서 친구 요청 목록을 가져옵니다.
                const response = await getFriendRequests();

                // 2. 요청이 존재하는지 확인합니다.
                const isExist = response?.data && response.data.length > 0;

                // 3. 브라우저에 '읽음' 기록이 있는지 확인합니다.
                const isRead = localStorage.getItem('friendRequestsRead') === 'true';

                // 요청이 존재하고, 아직 읽지 않았다면 빨간 점을 표시합니다.
                if (isExist && !isRead) {
                    setHasNewRequest(true);
                } else {
                    setHasNewRequest(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkRequests();
    }, []);


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
                <MenuItem onClick={() => navigate('/friends/requestlist')}>
                    친구 요청 목록
                    <span className="arrow">›</span>
                    {hasNewRequest && <RedDot />}
                </MenuItem>
            </MenuSection>

            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </MyPageContainer>
    );
};

export default MyPage;
