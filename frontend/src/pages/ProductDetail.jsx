//ProductDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

import products from '../data/products';

import {
    DetailContainer,
    ProductImage,
    ProductInfo,
    ProductName,
    ProductPrice,
    BuyButton,
    DescriptionBox
} from '../styles/ProductDetailStyle';

const ProductDetailPage = () => {

    const { id } = useParams();

    // URL의 id와 일치하는 상품 찾기
    const product = products.find(
        item => item.id === Number(id)
    );

    // 상품 없을 때
    if (!product) {
        return <div>상품이 존재하지 않습니다.</div>;
    }

    return (
        <>


            <DetailContainer>

                {/* 상품 이미지 */}
                <ProductImage
                    src={product.image_url}
                    alt={product.name}
                />

                {/* 상품 정보 */}
                <ProductInfo>

                    <ProductName>
                        {product.name}
                    </ProductName>

                    <ProductPrice>
                        {product.price.toLocaleString()}원
                    </ProductPrice>

                </ProductInfo>

                {/* 구매 버튼 */}
                <BuyButton>
                    구매하기
                </BuyButton>

                {/* 상품 설명 */}
                <DescriptionBox>

                    <h2>상품 상세 설명</h2>

                    <p>
                        {product.description}
                    </p>

                </DescriptionBox>

            </DetailContainer>
        </>
    );
};

export default ProductDetailPage;