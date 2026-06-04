// Home.jsx

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { ProductGrid } from '../styles/HomeStyle';
import axiosInstance from '../api/axiosInstance';
import MainBanner from '../components/layout/MainBanner';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../components/layout/CategorySection';
import FloatingChatButton from '../components/common/FloatingChatButton';

const Home = () => {
    const [products, setProducts] = useState([]);
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
                console.log("상품 응답 데이터:", res.data);

                const data = res.data;

                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && Array.isArray(data.content)) {
                    setProducts(data.content);
                } else {
                    setProducts([]);
                }
            })
            .catch((err) => {
                console.error("상품 조회 실패:", err);
                setProducts([]);
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

            <div style={{ minHeight: '700px' }}>
                <ProductGrid>
                    {Array.isArray(products) && products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </ProductGrid>
            </div>

            <FloatingChatButton />
        </div>
    );
};

export default Home;