//GlobalStyle.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
        margin:0;
        padding:0;
    }

    html,
    body,
    #root{
        min-height:100vh;
    }

    body{
        background-color:#f0f0f4;
    }

    h1, h2, h3, h4, h5, h6, p {
    margin: 0;
}
    
`;

export default GlobalStyle;