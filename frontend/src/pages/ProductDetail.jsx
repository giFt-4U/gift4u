//ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { DetailWrapper, ImageArea, BuyBox, DescArea } from '../styles/ProductDetailStyle';
import HeartButton from '../components/common/HeartButton';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);



    useEffect(() => {

        axiosInstance
            .get(`/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch(console.error);

    }, [id]);

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
                <button>구매하기</button>
            </BuyBox>

            <DescArea>
                <h3>상품 상세 설명</h3>
                <p>{product.description}</p>
            </DescArea>

        </DetailWrapper>
    );
};

export default ProductDetail;