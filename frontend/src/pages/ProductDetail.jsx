//ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import {
    DetailWrapper,
    ImageArea,
    ProductInfoArea,
    BuyBox,
    DescArea
} from '../styles/ProductDetailStyle';
import HeartButton from '../components/common/HeartButton';

const ProductDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosInstance
            .get(`/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch(console.error);
    }, [id]);

    const handleGiftClick = () => {
        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 선물하기를 이용할 수 있습니다.");
            return;
        }

        const orderItem = {
            ...product,
            quantity: 1,
        };

        localStorage.setItem(
            "orderItems",
            JSON.stringify([orderItem])
        );

        navigate("/order");
    };

    if (!product) {
        return <div>로딩중...</div>;
    }

    const brandName = product.brandName || product.brand_name;
    const imageSrc = product.imageUrl || product.image_url || "/images/default.png";

    return (
        <DetailWrapper>

            <ImageArea>
                <HeartButton product={product} />

                <img
                    src={imageSrc}
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = "/images/default.png";
                    }}
                />

            </ImageArea>

            <ProductInfoArea>
                {brandName && (
                    <p className="product-brand">
                        {brandName}
                    </p>
                )}

                <h2 className="product-name">
                    {product.name}
                </h2>

                <p className="product-price">
                    {product.price?.toLocaleString()}원
                </p>
            </ProductInfoArea>

            <BuyBox>
                <button
                    type="button"
                    onClick={handleGiftClick}
                >
                    선물하기
                </button>
            </BuyBox>

            <DescArea>
                <h3>상품 상세 설명</h3>

                <p>
                    {product.description}
                </p>
            </DescArea>

        </DetailWrapper>
    );
};

export default ProductDetail;