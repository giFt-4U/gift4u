// MyPageStyle.js
import styled from 'styled-components';

export const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px 60px;
`;

export const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 20px 28px;
    margin: 0 -20px 24px;
    border-bottom: 1px solid #f2f2f2;
`;

export const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #f0f0f0;
    margin-bottom: 14px;
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
    margin-bottom: 14px;
    font-size: 32px;
    font-weight: 700;
    color: #fff;
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
    margin-top: 8px;
    font-size: 12px;
    color: #888;
    background-color: #f7f7f7;
    border-radius: 20px;
    padding: 4px 14px;
    letter-spacing: 0.5px;
`;

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
    color: #333;
    font-weight: 500;

    &:active {
        background-color: #fafafa;
    }

    span.arrow {
        color: #ccc;
        font-size: 16px;
    }
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

export const RedDot = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #e53935;
    border-radius: 50%;
    margin-left: 6px;
    vertical-align: middle;
`;