//ProductNav.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../../api/Product';

const ProductHeader = () => {

    const navigate = useNavigate();

    return (

        <div className="product-header">

            <div onClick={() => navigate(-1)}>
                🔙
            </div>

            <h1>따숨품</h1>

            <div style={{ width: '24px' }} />

        </div>
    );
};

export default ProductHeader;