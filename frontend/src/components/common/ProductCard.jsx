// ProductCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeartButton from "../common/HeartButton";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const brandName = product.brandName || product.brand_name;
    const imageSrc = product.imageUrl || product.image_url || "/images/default.png";

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
                    src={imageSrc}
                    alt={product.name}
                    style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f5'
                    }}
                    onError={(e) => {
                        e.target.src = "/images/default.png";
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
                    minHeight: '80px'
                }}
            >
                {brandName && (
                    <p
                        className='product-brand'
                        style={{
                            margin: 0,
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#777',
                            lineHeight: '1.2'
                        }}
                    >
                        {brandName}
                    </p>
                )}

                <h4
                    className='product-name'
                    style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.4',
                        minHeight: '40px'
                    }}
                >
                    {product.name}
                </h4>

                <p
                    className='product-price'
                    style={{
                        margin: 0,
                        fontSize: '15px',
                        fontWeight: 700
                    }}
                >
                    {Number(product.price || 0).toLocaleString()}원
                </p>
            </div>
        </div>
    );
};

export default ProductCard;