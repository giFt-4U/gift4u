//HomeStyle.js

import styled from "styled-components";
import Home from "../pages/Home";

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 10px 0;
`;

export const BannerWrapper = styled.div`

    width: 100%;

    aspect-ratio: 16 / 9;

    border-radius: 16px;

    overflow: hidden;

    margin-bottom: 24px;

    img {

        width: 100%;
        height: 100%;

        object-fit: cover;
    }
`;

export const ProductPageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 10px 0;
`;