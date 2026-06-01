// SearchStyle.js

import styled from "styled-components";

export const PageWrapper = styled.div`
    padding: 16px;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 16px;
    outline: none;

    &:focus {
        border-color: #f5c542;
    }
`;

export const Section = styled.div`
    margin-bottom: 20px;

    h4 {
        margin-bottom: 10px;
    }
`;

export const TagBox = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const Tag = styled.span`
    padding: 6px 10px;
    background: #ffe082;
    border-radius: 20px;
    cursor: pointer;
`;

export const TagGray = styled.span`
    padding: 6px 10px;
    background: #e0e0e0;
    border-radius: 20px;
    cursor: pointer;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 20px;
`;

export const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        transform: translateY(-3px);
    }
`;

export const ProductImg = styled.img`
    width: 100%;
    height: 140px;
    object-fit: cover;
`;

export const InfoBox = styled.div`
    padding: 8px;
`;