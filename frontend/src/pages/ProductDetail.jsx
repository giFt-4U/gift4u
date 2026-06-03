// ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import {
    DetailWrapper,
    ImageArea,
    BuyBox,
    DescArea
} from '../styles/ProductDetailStyle';
import HeartButton from '../components/common/HeartButton';
import { addToCart } from '../utils/Cart';

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

    const handleAddCart = () => {
        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 장바구니를 이용할 수 있습니다.");
            return;
        }

        addToCart(product);

        alert("장바구니에 담겼습니다.");
    };

    const handleBuyClick = () => {
        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 구매하기를 이용할 수 있습니다.");
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

    return (
        <DetailWrapper>

            <ImageArea
                style={{
                    position: 'relative'
                }}
            >
                <HeartButton product={product} />

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = "/images/default.png";
                    }}
                    style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        borderRadius: "12px",
                        backgroundColor: "#f5f5f5"
                    }}
                />
            </ImageArea>

            <BuyBox>
                <button
                    type="button"
                    onClick={handleAddCart}
                >
                    장바구니 담기
                </button>

                <button
                    type="button"
                    onClick={handleBuyClick}
                >
                    구매하기
                </button>
            </BuyBox>

            <DescArea>
                <h3>상품 상세 설명</h3>
                <p>{product.description}</p>
            </DescArea>

        </DetailWrapper>
    );
};

export default ProductDetail;