//ProductCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {

        navigate(`/product/${product.id}`);
    };

    return (

        <div
            className='product-card'
            style={{ cursor: 'pointer' }}
            onClick={handleCardClick}
        >

            <div className='product-image'>

                <img
                    src={product.prdImg}
                    alt={product.Name}

                    style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover'
                    }}
                />

            </div>

            <div className='product-info'>

                <p className='brand-name'>

                    {product.brandName}

                </p>

                <h4 className='product-name'>

                    {product.prdName}

                </h4>

                <p className='product-price'>

                    {product.prdPrice?.toLocaleString()}원

                </p>

            </div>

        </div>
    );
};

export default ProductCard;