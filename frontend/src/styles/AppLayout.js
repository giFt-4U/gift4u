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
    align-itmes: center;
    justify-content: center;
    padding: 0 20px;
    border-bootom: 1px solid #f0f0f0;
    position: sticky;
    backgraound-color: white;
    z-index:10;
`;