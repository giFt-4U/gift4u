//Home.jsx

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { ProductGrid } from '../styles/HomeStyle';
import axiosInstance from '../api/axiosInstance';
import MainBanner from '../components/layout/MainBanner';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../components/layout/CategorySection';

const Home = () => {

    const [products, setProducts] = useState([]); // ⭐ 하나만 사용
    const [categoryId, setCategoryId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        axiosInstance
            .get("/api/products", {
                params: {
                    page: 0,
                    size: 10,
                    sort: "popular",

                    ...(categoryId !== 0 && { categoryId })
                }
            })
            .then((res) => {
                setProducts(res.data.content);
            });

    }, [categoryId]);

    return (
        <div className='home-container' style={{ padding: '0 20px' }}>

            <MainBanner />

            <CategorySection onSelectCategory={setCategoryId} />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                }}
            >
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        lineHeight: '22px',
                    }}
                >
                    인기상품
                </h3>

                <button
                    onClick={() => navigate('/products')}
                    style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '18px',
                    }}
                >
                    전체보기
                </button>
            </div>

            <div
                style={{
                    minHeight: '700px'
                }}
            >

                <ProductGrid>

                    {products.map((product) => (

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