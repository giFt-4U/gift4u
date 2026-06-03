//AppLayout.js

import styled from "styled-components";

export const MobileContainer = styled.div`
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
    background-color: white;
    margin: 0 auto;
    position: relative;
`;

export const MainContent = styled.div`
    padding: 20px;
`

export const NavWrapper = styled.nav`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 0 20px;

    .nav-left,
    .nav-right {
        width: 60px;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 10px;
    }

    h1 {
        position: absolute;

        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        margin: 0;
        padding: 0;

        line-height: 1;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 22px;
        font-weight: 700;

        color: #f5c542;
        text-decoration: none;

        line-height: 1;
    }

    svg {
        width: 24px;
        height: 24px;

        display: block;
    }
`;