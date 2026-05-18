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
    padding:20px;
`

export const NavWrapper = styled.nav`

    width: 100%;
    height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 20px;

    background-color: white;

    box-sizing: border-box;

    .nav-left img,
    .nav-right img {

        width: 24px;
        height: 24px;

        cursor: pointer;
    }

    .nav-right {

        display: flex;
        gap: 12px;
    }

    h1 {

        font-size: 20px;
        margin: 0;
    }

    h1 a {

        text-decoration: none;
        color: black;
    }
`;