//GlobalStyle.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        min-height: 100vh;
    }

    /*웹 브라우저 배경*/
    body {
        background-color: #f0f0f4;
        display: flex;
        justify-content: center;
    }

    #root {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
    }
`;

export default GlobalStyle;