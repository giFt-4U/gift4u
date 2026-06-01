// ProductDetailStyle.js

import styled from "styled-components";

/* 전체 레이아웃 */
export const DetailWrapper = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
`;



/* 이미지 영역 */
export const ImageArea = styled.div`
    width: 100%;
    margin-bottom: 20px;

    img {
        width: 100%;
        height: auto;
        border-radius: 16px;
        object-fit: cover;
    }
`;

/* 구매 버튼 영역 */
export const BuyBox = styled.div`
    width: 100%;
    margin: 20px 0;

    button {
        width: 100%;
        padding: 16px;
        border: none;
        border-radius: 12px;

        background-color: #f5c542;
        color: white;

        font-size: 18px;
        font-weight: bold;

        cursor: pointer;

        transition: 0.2s;

        &:hover {
            opacity: 0.9;
        }
    }
`;

/* 설명 영역 */
export const DescArea = styled.div`
    margin-top: 30px;
    padding: 20px;

    background-color: #f8f8f8;
    border-radius: 16px;

    h3 {
        margin-bottom: 12px;
        font-size: 18px;
    }

    p {
        line-height: 1.6;
        color: #555;
        font-size: 14px;
    }
`;