// FriendsStyle.js
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px 14px;
    border-bottom: 1px solid #f5f5f5;
`;

export const Title = styled.h1`
    font-size: 18px;
    font-weight: 700;
    color: #FF8C00;
    margin: 0;
`;

export const FriendCount = styled.span`
    font-size: 13px;
    color: #bbb;
    font-weight: 400;
    margin-left: 6px;
`;

export const FriendList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
`;

export const FriendItem = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f5;

    &:active {
        background: #fafafa;
    }
`;

export const Avatar = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #FFE0B2;
    color: #FF8C00;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const FriendInfo = styled.div`
    flex: 1;
    overflow: hidden;
`;

export const FriendName = styled.p`
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 600;
    color: #222;
`;

export const FriendCode = styled.p`
    margin: 0;
    font-size: 12px;
    color: #bbb;
    letter-spacing: 0.5px;
`;

export const CenterText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #aaa;
    font-size: 14px;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    gap: 10px;
`;

export const EmptyText = styled.p`
    font-size: 14px;
    color: #aaa;
    text-align: center;
    line-height: 1.7;
    letter-spacing: 0;
    text-transform: none;
`;

export const AddFriendButton = styled.button`
    margin-top: 12px;
    padding: 10px 28px;
    background-color: #FF8C00;
    border: none;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    letter-spacing: 0;
    text-transform: none;

    &:active {
        opacity: 0.85;
    }
`;
