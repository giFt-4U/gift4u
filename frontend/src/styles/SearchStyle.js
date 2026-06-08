// SearchStyle.js

import styled from "styled-components";

export const PageWrapper = styled.div`
    padding: 16px;
`;

export const SearchInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 10px;

    margin-bottom: 16px;
    outline: none;

    font-size: 14px;
    color: #111;

    &:focus {
        border-color: #f5c542;
    }
`;

export const Section = styled.div`
    margin-bottom: 20px;

    h4 {
        margin: 0 0 10px;

        font-size: 15px;
        font-weight: 700;
        color: #111;
        line-height: 20px;
    }
`;

export const TagBox = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const Tag = styled.button`
    padding: 6px 11px;

    border: none;
    border-radius: 20px;

    background: #ffe082;
    color: #333;

    font-size: 13px;
    font-weight: 600;

    cursor: pointer;
`;

export const TagGray = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 6px 8px 6px 11px;

    background: #e0e0e0;
    border-radius: 20px;

    color: #333;
    font-size: 13px;
    font-weight: 500;

    cursor: pointer;
`;

export const RemoveRecentButton = styled.button`
    width: 18px;
    height: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: rgba(0, 0, 0, 0.15);
    color: #fff;

    font-size: 13px;
    line-height: 1;

    cursor: pointer;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    gap: 14px;
    margin-top: 20px;
`;

export const Card = styled.div`
    position: relative;

    background: #fff;
    border-radius: 12px;
    overflow: hidden;

    cursor: pointer;
    transition: 0.2s;

    &:hover {
        transform: translateY(-3px);
    }
`;

export const ProductImg = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;

    display: block;
    object-fit: cover;

    border-radius: 12px;
    background-color: #f5f5f5;
`;

export const InfoBox = styled.div`
    padding: 10px 2px 4px;

    .product-brand {
        margin: 0 0 5px;

        font-size: 12px;
        font-weight: 600;
        color: #777;
        line-height: 16px;
    }

    .product-name {
        margin: 0 0 6px;

        font-size: 14px;
        font-weight: 500;
        color: #111;
        line-height: 20px;
    }

    .product-price {
        margin: 0;

        font-size: 14px;
        font-weight: 700;
        color: #111;
        line-height: 18px;
    }
`;

export const EmptyText = styled.p`
    margin: 8px 0 20px;

    text-align: center;

    font-size: 13px;
    color: #777;
    line-height: 20px;
`;