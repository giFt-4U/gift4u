import React from 'react';
// import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    //   const navigate = useNavigate();

    const { id, prdImg, brandName, prdName, prdPrice } = product;

    // const handleCardClick = () => {
    //     navigate(`/product/${id}`);
    // }
    return (
        <div className='product-card' style={{ cursor: 'pointer' }}>
            <div className='product-image'>
                <img src='public/assets/image.png' style={{ width: '100%' }} />
            </div>
            <div className='product-info'>
                <p className='brand-name'>{brandName}</p>
                <h4 className='product-name'>{prdName}</h4>
                <p className='product-price'>{prdPrice.toLocaleString()}원</p>
            </div>
        </div>
    );
};

export default ProductCard;