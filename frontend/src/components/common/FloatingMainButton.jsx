
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FloatingMainButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <MainButton
            type="button"
            onClick={handleClick}
            aria-label="메인"
        >
            <img
                src="/assets/icons/main.svg"
                alt="메인 홈"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
        </MainButton>
    );
};

export default FloatingMainButton;

const MainButton = styled.button`
    position: fixed;

    right: max(18px, calc((100vw - 500px) / 2 + 18px));
    bottom: 24px;

    width: 92px;
    height: 92px;

    border: none;
    border-radius: 50%;

    background: transparent;
    padding: 0;

    cursor: pointer;
    z-index: 1000; 

    transition: transform 0.1s ease;
    &:active {
        transform: scale(0.95);
    }
`;