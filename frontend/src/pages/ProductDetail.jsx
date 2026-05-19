//ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        axiosInstance
            .get(`/api/products/${id}`)
            .then((response) => {

                setProduct(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, [id]);

    if (!product) {

        return <div>로딩중...</div>;
    }

    return (

        <div>

            <img src={product.prdImg} alt={product.name} width="100%" />

            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <h2>{product.price?.toLocaleString()}원</h2>

        </div>
    );
};

export default ProductDetail;