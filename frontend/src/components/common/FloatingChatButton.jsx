// FloatingChatButton.jsx

import React from "react";
import styled from "styled-components";

const FloatingChatButton = ({ hasUnread = false }) => {

    const handleClick = () => {
        alert("채팅 서비스는 추후 연결 예정입니다.");
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