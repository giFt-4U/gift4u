// ProductDetailStyle.js

import styled from "styled-components";

export const DetailWrapper = styled.div`
    width: 100%;
    padding-bottom: 60px;
`;

export const ImageArea = styled.div`
    width: 100%;
    position: relative;

    img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        display: block;

        border-radius: 0;
        background-color: #f5f5f5;
    }
`;

export const ProductInfoArea = styled.section`
    padding: 10px 4px 28px;

    .product-brand {
        margin: 0;

        font-size: 12px;
        font-weight: 600;
        color: #777;
        line-height: 1.2;
    }

    .product-name {
        margin: 6px 0 0;

        font-size: 15px;
        font-weight: 500;
        color: #111;
        line-height: 20px;
    }

    .product-price {
        margin: 6px 0 0;

        font-size: 15px;
        font-weight: 700;
        color: #111;
        line-height: 20px;
    }
`;

export const BuyBox = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;

    padding: 36px 0 56px;

    button {
        width: 320px;
        max-width: 80%;
        height: 48px;

        border: none;
        border-radius: 4px;

        background-color: #151515;
        color: #ffffff;

        font-size: 15px;
        font-weight: 500;

        cursor: pointer;
    }
`;

export const DescArea = styled.section`
    border-top: 1px solid #222;

    padding: 24px 4px 80px;

    h3 {
        margin: 0 0 14px;

        font-size: 16px;
        font-weight: 600;
        color: #111;
        line-height: 22px;
    }

    p {
        margin: 0;

        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 22px;
    }
`;