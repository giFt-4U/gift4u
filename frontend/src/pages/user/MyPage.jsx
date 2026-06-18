// MyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getMe } from '../../api/auth';
import { resolveUserRole, isAdminRole } from '../../utils/authUtils';
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
    ShareFriendCodeButton,
    MenuSection,
    MenuItem,
    MenuRight,
    RedDot,
    LogoutButton,
} from '../../styles/MyPageStyle';
import ShareModal from '../../components/common/ShareModal';
import { copyText, buildFriendInviteUrl, getDefaultShareImageUrl } from '../../utils/shareUtils';

const KakaoIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.693 2 11.215c0 2.82 1.682 5.302 4.243 6.84-.16.558-.94 3.394-.97 3.607-.038.28.104.557.382.557.18 0 .312-.08.443-.17l4.27-2.835c.685.1 1.386.15 2.1.15C17.52 19.363 22 15.67 22 11.215 22 6.693 17.52 3 12 3z" />
    </svg>
);

const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M6 16V6a2 2 0 0 1 2-2h10" strokeLinecap="round" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M5 12.5 10 17.5 19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ShareIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="17" cy="7" r="2.2" />
        <circle cx="17" cy="17" r="2.2" />
        <path d="M8.2 11.1 14.8 8.2" strokeLinecap="round" />
        <path d="M8.2 12.9 14.8 15.8" strokeLinecap="round" />
    </svg>
);

const MyPage = () => {
    const navigate = useNavigate();
    const { user, setUser, clearToken } = useAuthStore();
    const [hasNewRequest, setHasNewRequest] = useState(false);
    const [copied, setCopied] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    useEffect(() => {
        getMe()
            .then((res) => {
                const token = localStorage.getItem('token');
                const role = resolveUserRole(res.data, token);
                setUser({ ...res.data, role });
            })
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
            await copyText(user.friendCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (error) {
            console.error(error);
            alert('복사에 실패했어요. 코드를 길게 눌러 직접 복사해주세요.');
        }
    };

    const isKakao = user?.loginProvider === 'KAKAO';
    const isAdmin = isAdminRole(user?.role);
    const initial = user?.nickname?.charAt(0)?.toUpperCase() || '?';
    const friendInviteUrl = user?.friendCode ? buildFriendInviteUrl(user.friendCode) : '';

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
                            {copied ? <CheckIcon /> : <CopyIcon />}
                        </CopyFriendCodeButton>
                        <ShareFriendCodeButton
                            type="button"
                            onClick={() => setShareOpen(true)}
                            aria-label="친구 코드 공유"
                            title="친구 코드 공유"
                        >
                            <ShareIcon />
                        </ShareFriendCodeButton>
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
                {isAdmin && (
                    <MenuItem onClick={() => navigate('/admin')}>
                        관리자 페이지
                        <span className="arrow">›</span>
                    </MenuItem>
                )}

                <MenuItem onClick={() => navigate('/mypage/edit')}>
                    회원정보 수정
                    <span className="arrow">›</span>
                </MenuItem>

                <MenuItem onClick={() => navigate('/wishlist')}>
                    위시리스트
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
                {!isKakao && (
                    <MenuItem onClick={() => navigate('/mypage/password')}>
                        비밀번호 변경
                        <span className="arrow">›</span>
                    </MenuItem>
                )}
                <MenuItem onClick={() => navigate('/mypage/withdraw')} $danger>
                    회원탈퇴
                    <span className="arrow">›</span>
                </MenuItem>
            </MenuSection>

            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>

            {user?.friendCode && (
                <ShareModal
                    open={shareOpen}
                    onClose={() => setShareOpen(false)}
                    shareUrl={friendInviteUrl}
                    kakao={{
                        title: `[따숨품] ${user.nickname || '친구'}님의 친구 초대`,
                        description: `친구 코드: ${user.friendCode}\n친구 추가 후 선물을 주고받아보세요!`,
                        imageUrl: getDefaultShareImageUrl(),
                        buttonTitle: '친구 추가하기',
                    }}
                    smsText={`[따숨품] 친구로 추가해주세요!\n친구 코드: ${user.friendCode}\n${friendInviteUrl}`}
                />
            )}
        </MyPageContainer>
    );
};

export default MyPage;
