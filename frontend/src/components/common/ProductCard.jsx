import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    return (

        <div
            className='product-card'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/products/${product.id}`)}
        >

            <div className='product-image'>

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover'
                    }}
                />

            </div>

            <div className='product-info'>

                <h4 className='product-name'>
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