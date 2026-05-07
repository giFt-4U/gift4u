import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
    box-sizing: border-box;
    margin:0;
    padding: 0;
    }

    /*웹 브라우저 배경*/
    body{
        background-color: #f0f0f4;
        display: flex;
        justify-content: center;
    }
`;

export default GlobalStyle;