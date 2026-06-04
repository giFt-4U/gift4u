// FloatingChatButton.jsx

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FloatingChatButton = ({ hasUnread = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("로그인이 필요한 서비스 입니다.");
            navigate("/login");
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
                src={
                    hasUnread
                        ? "/assets/icons/chat2.png"
                        : "/assets/icons/chat1.png"
                }
                alt="채팅"
            />
        </ChatButton>
    );
};

export default FloatingChatButton;

const ChatButton = styled.button`
    position: fixed;

    right: max(20px, calc((100vw - 500px) / 2 + 20px));
    bottom: 26px;

    width: 82px;
    height: 82px;

    border: none;
    border-radius: 200px;

    background: transparent;
    padding: 0;

    cursor: pointer;
    z-index: 500;

    img {
        width: 82px;
        height: 82px;
        display: block;
        object-fit: contain;
    }
`;