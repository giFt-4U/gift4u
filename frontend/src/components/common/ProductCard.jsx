// ProductCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeartButton from "../common/HeartButton";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();


    return (

        <div
            className='product-card'
            style={{
                cursor: 'pointer',
                position: 'relative'
            }}
            onClick={() => navigate(`/products/${product.id}`)}
        >

            <div className='product-image'>

                <HeartButton product={product} />

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f5'
                    }}
                />

            </div>

            <div
                className='product-info'
                style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    minHeight: '70px'
                }}
            >

                <h4
                    className='product-name'
                    style={{
                        fontSize: '14px',
                        lineHeight: '1.4',
                        minHeight: '40px'
                    }}
                >
                    {product.name}
                </h4>

                <p className='product-price'>
                    {product.price?.toLocaleString()}원
                </p>

            </div>

        </div>
    );
};

export default ProductCard;