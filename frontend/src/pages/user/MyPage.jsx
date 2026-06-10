// MyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getMe } from '../../api/auth';
import { getFriendRequests } from '../../api/chatApi';
import {
    MyPageContainer,
    TopBar,
    BackButton,
    TopTitle,
    ProfileSection,
    ProfileImageWrap,
    ProfileImage,
    ProfileImagePlaceholder,
    ProfileEditButton,
    ProfileName,
    ProfileEmail,
    ProfileBadge,
    FriendCodeRow,
    FriendCode,
    CopyFriendCodeButton,
    MenuSection,
    MenuItem,
    MenuRight,
    RedDot,
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
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        getMe()
            .then((res) => setUser(res.data))
            .catch(() => {
                clearToken();
                navigate('/login');
            });
    }, []);

    const onLogout = () => {
        clearToken();
        navigate('/login');
    };

    const onCopyFriendCode = async () => {
        if (!user?.friendCode) return;
        try {
            await navigator.clipboard.writeText(user.friendCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (error) {
            console.error(error);
            alert('복사에 실패했어요. 다시 시도해주세요.');
        }
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
            <TopBar>
                <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
                    ‹
                </BackButton>
                <TopTitle>마이페이지</TopTitle>
            </TopBar>

            <ProfileSection>
                <ProfileImageWrap>
                    {user?.profileImage ? (
                        <ProfileImage src={user.profileImage} alt="프로필" />
                    ) : (
                        <ProfileImagePlaceholder>{initial}</ProfileImagePlaceholder>
                    )}
                    <ProfileEditButton onClick={() => navigate('/mypage/edit')} aria-label="프로필 수정">
                        +
                    </ProfileEditButton>
                </ProfileImageWrap>

                <ProfileName>{user?.nickname || '이름 없음'}</ProfileName>
                <ProfileEmail>{user?.email || ''}</ProfileEmail>

                {user?.friendCode && (
                    <FriendCodeRow>
                        <FriendCode>나의 코드 · {user.friendCode}</FriendCode>
                        <CopyFriendCodeButton
                            onClick={onCopyFriendCode}
                            aria-label={copied ? '복사 완료' : '코드 복사'}
                            title={copied ? '복사 완료' : '코드 복사'}
                        >
                            {copied ? '✓' : '⧉'}
                        </CopyFriendCodeButton>
                    </FriendCodeRow>
                )}

                {isKakao && (
                    <ProfileBadge>
                        <KakaoIcon />
                        카카오 계정
                    </ProfileBadge>
                )}
            </ProfileSection>

            <MenuSection>
                <MenuItem onClick={() => navigate('/mypage/edit')}>
                    회원정보 수정
                    <span className="arrow">›</span>
                </MenuItem>
                <MenuItem onClick={() => navigate('/friends')}>
                    친구 관리
                    <span className="arrow">›</span>
                </MenuItem>
                <MenuItem onClick={() => navigate('/friends/requestlist')}>
                    친구 요청 목록
                    <MenuRight>
                        {hasNewRequest && <RedDot />}
                        <span className="arrow">›</span>
                    </MenuRight>
                </MenuItem>
                <MenuItem onClick={() => navigate('/mypage/gifts')}>
                    받은 선물함
                    <span className="arrow">›</span>
                </MenuItem>
            </MenuSection>

            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </MyPageContainer>
    );
};

export default MyPage;
