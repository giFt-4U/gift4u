// ProductDetailStyle.js

import styled from "styled-components";

export const DetailContainer = styled.div`
    padding: 20px;
`;

export const ProductImage = styled.img`
    width: 100%;
    border-radius: 16px;
    object-fit: cover;
`;

export const ProductInfo = styled.div`
    margin-top: 20px;
`;

export const ProductName = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
`;

export const ProductPrice = styled.p`
    font-size: 22px;
    font-weight: bold;
    color: #f5c542;
`;

export const BuyButton = styled.button`
    width: 100%;
    margin-top: 24px;
    padding: 16px;

    border: none;
    border-radius: 12px;

    background-color: #f5c542;
    color: white;

    font-size: 18px;
    font-weight: bold;

    cursor: pointer;
`;

export const DescriptionBox = styled.div`
    margin-top: 30px;
    padding: 20px;

    background-color: #f8f8f8;
    border-radius: 16px;

    h2 {
        margin-bottom: 12px;
        font-size: 20px;
    }

    p {
        line-height: 1.6;
        color: #555;
    }
`;