// GlobalStyle.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body,
    #root {
        min-height: 100vh;
    }

    body {
        background-color: #f0f0f4;

        font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.5px;
        text-transform: uppercase;

        color: #1d1d1d;
    }

    button,
    input,
    textarea,
    select {
        font-family: inherit;
        letter-spacing: inherit;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
    }

    /*
        피그마 텍스트 규격 공통 클래스
    */

    .text-emphasis {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-weight: 600;
        font-size: 20px;
        line-height: 16px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .text-title {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-weight: 500;
        font-size: 22px;
        line-height: 23px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .text-subtitle {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-weight: 500;
        font-size: 20px;
        line-height: 16px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .text-body {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .text-detail {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }
`;

export default GlobalStyle;