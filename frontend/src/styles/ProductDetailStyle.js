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
        margin: 0;
        flex: 1;
        min-width: 0;

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

export const ProductTitleRow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-top: 6px;
`;

export const BuyBox = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    padding: 36px 4px 56px;

    button {
        height: 48px;

        border-radius: 4px;

        font-size: 15px;
        font-weight: 500;

        cursor: pointer;
    }

    .cart-button {
        border: 1px solid #151515;
        background-color: #ffffff;
        color: #151515;
    }

    .gift-button {
        border: 1px solid #151515;
        background-color: #151515;
        color: #ffffff;
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

export const ShareTrigger = styled.button`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
    border: none;
    background: none;
    cursor: pointer;
    color: #666;
    font-size: 13px;
    font-weight: 500;

    svg {
        width: 18px;
        height: 18px;
    }

    &:hover {
        color: #111;
    }
`;