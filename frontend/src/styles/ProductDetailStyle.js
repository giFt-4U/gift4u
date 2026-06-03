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
    margin-bottom: 28px;

    img {
        width: 100%;
        height: auto;
        border-radius: 16px;
        object-fit: cover;
    }
`;

/* 장바구니 담기 / 구매하기 버튼 영역 */
export const BuyBox = styled.div`
    width: 100%;
    margin: 24px 0 32px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    button {
        width: 100%;
        height: 52px;

        border-radius: 12px;

        font-size: 15px;
        font-weight: 700;

        cursor: pointer;

        transition: 0.2s;
    }

    button:first-child {
        border: 1px solid #f5c542;
        background-color: #ffffff;
        color: #f5a623;
    }

    button:last-child {
        border: none;
        background-color: #f5c542;
        color: white;
    }

    button:hover {
        opacity: 0.9;
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