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
                    ...(categoryId !== 0 && { categoryId }),
                },
            })
            .then((res) => {
                const data = res.data;

                // 백엔드 응답이 Page 형태일 때
                if (data && Array.isArray(data.content)) {
                    setProducts(data.content);
                    return;
                }

                // 백엔드 응답이 배열 형태일 때
                if (Array.isArray(data)) {
                    setProducts(data);
                    return;
                }

                // 백엔드 응답이 { data: [...] } 형태일 때
                if (data && Array.isArray(data.data)) {
                    setProducts(data.data);
                    return;
                }

                // 백엔드 응답이 { data: { content: [...] } } 형태일 때
                if (data?.data && Array.isArray(data.data.content)) {
                    setProducts(data.data.content);
                    return;
                }

                // 예상하지 못한 응답이면 빈 배열 처리
                setProducts([]);
            })
            .catch((error) => {
                console.error("상품 조회 실패:", error);
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
                    type="button"
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
                    minHeight: '700px',
                }}
            >
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