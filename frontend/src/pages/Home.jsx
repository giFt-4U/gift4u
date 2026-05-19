//Home.jsx

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { ProductGrid } from '../styles/HomeStyle';
import axiosInstance from '../api/axiosInstance';
import MainBanner from '../components/layout/MainBanner';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [productList, setProductList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        axiosInstance
            .get("/api/products?page=0&size=10&sort=popular")
            .then((response) => {

                console.log(response.data.content);

                setProductList(response.data.content);


            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    return (

        <div
            className='home-container'
            style={{ padding: '0 20px' }}
        >

            {/* 메인 배너 */}
            <MainBanner />

            {/* 제목 + 전체보기 */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}
            >

                <h3>인기상품</h3>

                <button
                    onClick={() => navigate('/products')}
                    style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    전체보기
                </button>

            </div>

            {/* 상품 리스트 */}
            <div className='product-list-popular'>

                <ProductGrid>

                    {productList.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </ProductGrid>

            </div>

        </div>
    );
};

export default Home;