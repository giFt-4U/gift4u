// AppLayout.js

import styled from "styled-components";

export const MobileContainer = styled.div`
    width: 100%;
    max-width: 500px;
    min-width: 360px;

    min-height: 100vh;

    background-color: white;

    margin: 0 auto;

    position: relative;

    overflow-x: hidden;
`;

export const MainContent = styled.main`
    width: 100%;

    padding: ${({ $noPadding }) => ($noPadding ? "0" : "20px")};
`;

export const NavWrapper = styled.nav`
    height: 64px;

    display: flex;
    align-items: center;

    padding: 0 18px;

    background: #ffffff;

    border-bottom: 1px solid #f2f2f2;

    .nav-left,
    .nav-right {
        flex: 1;

        display: flex;
        align-items: center;
    }

    .nav-left {
        justify-content: flex-start;
    }

    .nav-right {
        justify-content: flex-end;
        gap: 14px;
    }

    h1 {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;

        text-decoration: none;
    }

    .logo-image {
        width: 96px;
        height: 52px;

        object-fit: contain;
        display: block;
    }

    .nav-left img,
    .nav-right img {
        width: 22px;
        height: 22px;

        cursor: pointer;
        display: block;
        object-fit: contain;
    }

    .empty-space {
        width: 22px;
        height: 22px;
    }

    .plus-button {
        width: 24px;
        height: 24px;

        border: none;
        background: transparent;
        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 28px;
        font-weight: 300;
        line-height: 1;

        color: #111;
        cursor: pointer;
    }
`;