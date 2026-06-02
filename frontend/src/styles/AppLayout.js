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

    /* 
        기본 페이지는 padding 20px 사용.
        단, 장바구니 페이지는 피그마 UI처럼 전체 폭을 써야 해서 padding 제거.
    */
    padding: ${({ $noPadding }) => ($noPadding ? "0" : "20px")};
`;

export const NavWrapper = styled.nav`
    height: 64px;

    display: flex;
    align-items: center;

    padding: 0 20px;

    background: #ffffff;

    border-bottom: 1px solid #f2f2f2;

    /*
        상단 영역은 3분할 구조.
        왼쪽 / 중앙 / 오른쪽 영역을 같은 비율로 맞춰서
        로고가 항상 정확히 중앙에 오도록 고정.
    */
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
        font-size: 22px;
        font-weight: 700;

        color: #f5c542;

        text-decoration: none;
        line-height: 1;
    }

    img {
        width: 24px;
        height: 24px;

        cursor: pointer;
        display: block;
    }

    /*
        장바구니 페이지 오른쪽 공백용.
        오른쪽에 아이콘이 없어도 왼쪽 뒤로가기 아이콘과 균형을 맞춤.
    */
    .empty-space {
        width: 24px;
        height: 24px;
    }
`;