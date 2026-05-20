//AppLayout.js

import styled from "styled-components";
import App from "../App";

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;

    .nav-left,
    .nav-right {
        width: 60px;   /* ⭐ 핵심 */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px; /* ⭐ 아이콘 간격 */
    }

    h1 {
        flex: 1;       /* ⭐ 가운데 고정 */
        text-align: center;
        margin: 0;
    }
        
    .logo {
        font-size: 20px;
        font-weight: 700;
        color: #f5c542;
        text-decoration: none;
        letter-spacing: 1px;

        
    }
`;

