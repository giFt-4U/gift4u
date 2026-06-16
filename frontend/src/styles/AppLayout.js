// AppLayout.js

import styled, { createGlobalStyle } from "styled-components";

export const FontStyle = createGlobalStyle`
    @font-face {
        font-family: 'Mbc1961';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961M.woff2') format('woff2');
        font-weight: normal;
        font-display: swap;
    }
`;

export const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;

    @media (min-width: 1000px) {
        justify-content: center; 
        gap: 60px;
    }
`;

export const LeftSection = styled.div`
    display: none;

    @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 100px; 
    }
    img {
        width: 340px;
        height: auto;
        object-fit: contain;
        margin-right: 200px;
        padding-top: 180px;
    }
`;

export const MobileContainer = styled.div`
    width: 100%;
    max-width: 500px;
    min-width: 360px;

    min-height: 100vh;

    background-color: white;

    margin: 0 auto;

    position: relative;

    overflow-x: hidden;

    box-shadow: 0 0 35px #2e252049;

    @media (min-width: 1000px) {
        margin: 0;
    }
`;

export const MainContent = styled.main`
    width: 100%;

    padding-top: ${({ $noTopPadding }) => ($noTopPadding ? "0" : "80px")};
    padding-left: ${({ $noPadding }) => ($noPadding ? "0" : "20px")};
    padding-right: ${({ $noPadding }) => ($noPadding ? "0" : "20px")};
    padding-bottom: ${({ $noPadding }) => ($noPadding ? "0" : "20px")};
`;

////////////////////////////////////////////////

export const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(${props => props.$isVisible ? '0' : '-100%'});

    width: 100%;
    max-width: 500px;
    z-index: 1000;
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
        font-family: 'Mbc1961', sans-serif;;
        font-size: 22px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 1.5px;
        text-transform: uppercase;

        color: #FF8D28;

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
    
    /* 애니메이션 */
    transition: transform 0.3s ease-in-out, left 0.3s ease-in-out;

    @media (min-width: 1000px) {
        /* 
           전체 중앙(50%)을 기준으로:
           오른쪽 모바일 박스의 정중앙 축 위치는 [좌측 로고 가로폭(340px) + gap(60px)]의 절반인 200px만큼 오른쪽으로 이동
        */
        left: calc(50% + 300px);
        transform: translateX(-50%) translateY(${props => props.$isVisible ? '0' : '-100%'});
    }

`;