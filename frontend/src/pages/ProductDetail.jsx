import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { DetailWrapper, ImageArea, BuyBox, DescArea } from '../styles/ProductDetailStyle';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {

        axiosInstance
            .get(`/api/products?page=0&size=30`)
            .then((res) => {

                const list = res.data.content;

                const found = list.find(
                    item => item.id === Number(id)
                );

                setProduct(found);

            })
            .catch((err) => console.error(err));

    }, [id]);

    if (!product) {
        return <div>로딩중...</div>;
    }

    return (
        <DetailWrapper>



            <ImageArea>
                <img
                    src={product.imageUrl}
                    alt={product.name}
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