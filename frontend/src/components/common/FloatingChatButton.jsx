// FloatingChatButton.jsx

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FloatingChatButton = ({ hasUnread = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 채팅을 이용할 수 있습니다.");
            return;
        }

        navigate("/chat");
    };

    return (
        <ChatButton
            type="button"
            onClick={handleClick}
            aria-label="채팅"
        >
            <img
                src={hasUnread ? "/assets/icons/chat2.png" : "/assets/icons/chat1.png"}
                alt="채팅"
            />

            {hasUnread && <UnreadDot />}
        </ChatButton>
    );
};

export default FloatingChatButton;

const ChatButton = styled.button`
    position: fixed;
    bottom: 24px;
    width: 92px;
    height: 92px;
    border: none;
    border-radius: 50%;
    background: transparent;
    padding: 0;
    cursor: pointer;
    z-index: 500;

    right: max(18px, calc((100vw - 500px) / 2 + 18px));

    @media (min-width: 1000px) {
        right: max(18px, calc((88vw - 500px) / 2 - 170px)); 
    }

    img {
        width: 92px;
        height: 92px;
        display: block;
        object-fit: contain;
    }

    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.95);
    }
`;

const UnreadDot = styled.span`
    position: absolute;
    top: 8px;
    right: 8px;

    width: 16px;
    height: 16px;

    border-radius: 50%;
    background-color: #ff3b30;
    border: 2px solid #ffffff;
`;