// MyPageStyle.js
import styled from 'styled-components';

export const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px 60px;
`;

export const TopBar = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0 4px;
`;

export const BackButton = styled.button`
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 50%;
    background-color: #f7f7f7;
    color: #444;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
`;

export const TopTitle = styled.h1`
    font-size: 16px;
    font-weight: 700;
    color: #222;
`;

export const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 20px 28px;
    margin: 0 -20px 24px;
    border-bottom: 1px solid #f2f2f2;
`;

export const ProfileImageWrap = styled.div`
    position: relative;
    margin-bottom: 14px;
`;

export const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #f0f0f0;
    border: 2px solid #f5c542;
`;

export const ProfileImagePlaceholder = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f5c542;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    color: #fff;
`;

export const ProfileEditButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    background-color: #ff8c00;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
`;

export const ProfileName = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 4px;
`;

export const ProfileEmail = styled.p`
    font-size: 13px;
    color: #aaa;
`;

export const FriendCode = styled.p`
    font-size: 12px;
    color: #666;
    background-color: #f7f7f7;
    border-radius: 20px;
    padding: 4px 14px;
    letter-spacing: 0.5px;
`;

export const FriendCodeRow = styled.div`
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

export const CopyFriendCodeButton = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #ececec;
    background-color: #fff;
    color: #777;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    cursor: pointer;

    svg {
        width: 15px;
        height: 15px;
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const ShareFriendCodeButton = styled(CopyFriendCodeButton)``;

export const ProfileBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    padding: 4px 10px;
    border-radius: 20px;
    background-color: #fee500;
    font-size: 11px;
    font-weight: 700;
    color: #3c1e1e;
`;

export const MenuSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 -20px;
    padding: 16px 20px;
    border-bottom: 1px solid #f7f7f7;
    cursor: pointer;
    font-size: 14px;
    color: ${({ $danger }) => ($danger ? '#e74c3c' : '#333')};
    font-weight: 500;

    &:active {
        background-color: #fafafa;
    }

    span.arrow {
        color: #ccc;
        font-size: 16px;
    }
`;

export const MenuRight = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

export const RedDot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff4d4f;
`;

export const LogoutButton = styled.button`
    width: 100%;
    height: 50px;
    margin-top: 32px;
    background-color: #fff;
    border: 1.5px solid #e6e6e6;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #e74c3c;
    cursor: pointer;
    transition: background-color 0.15s;

    &:active {
        background-color: #fff5f5;
    }
`;
