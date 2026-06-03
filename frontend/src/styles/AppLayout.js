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

    padding: 0 20px;

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
        gap: 12px;
    }

    h1 {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0;
    }

    .logo {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-size: 22px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 1.5px;
        text-transform: uppercase;

        color: #f5c542;

        text-decoration: none;
    }

    img {
        width: 24px;
        height: 24px;

        cursor: pointer;
        display: block;
    }

    .empty-space {
        width: 24px;
        height: 24px;
    }
`;