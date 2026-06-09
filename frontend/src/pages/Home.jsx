// Home.jsx

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { ProductGrid } from '../styles/HomeStyle';
import axiosInstance from '../api/axiosInstance';
import MainBanner from '../components/layout/MainBanner';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../components/layout/CategorySection';
import FloatingChatButton from '../components/common/FloatingChatButton';

const getProductList = (data) => {
    // 백엔드 응답이 Page 형태일 때
    if (data && Array.isArray(data.content)) {
        return data.content;
    }

    // 백엔드 응답이 배열 형태일 때
    if (Array.isArray(data)) {
        return data;
    }

    // 백엔드 응답이 { data: [...] } 형태일 때
    if (data && Array.isArray(data.data)) {
        return data.data;
    }

    // 백엔드 응답이 { data: { content: [...] } } 형태일 때
    if (data?.data && Array.isArray(data.data.content)) {
        return data.data.content;
    }

    return [];
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [brandName, setBrandName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/api/products", {
                params: {
                    page: 0,
                    size: 10,
                    sort: "popular",

                    // 브랜드가 선택되어 있으면 브랜드 기준 조회
                    ...(brandName
                        ? { brandName }
                        : categoryId !== 0
                            ? { categoryId }
                            : {}),
                },
            })
            .then((res) => {
                const productList = getProductList(res.data);

                setProducts(productList);
            })
            .catch((error) => {
                console.error("상품 조회 실패:", error);
                setProducts([]);
            });
    }, [categoryId, brandName]);

    const handleSelectCategory = (id) => {
        setCategoryId(id);
        setBrandName("");
    };

    const handleSelectBrand = (name) => {
        setBrandName(name);
        setCategoryId(0);
    };

    const handleViewAllClick = () => {
        if (brandName) {
            navigate(`/products?brandName=${encodeURIComponent(brandName)}`);
            return;
        }

        navigate('/products');
    };

    const sectionTitle = brandName ? `${brandName} 상품` : '인기상품';

    return (
        <div className='home-container' style={{ padding: '0 20px' }}>
            <MainBanner />

            <CategorySection
                onSelectCategory={handleSelectCategory}
                onSelectBrand={handleSelectBrand}
            />

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
                    {sectionTitle}
                </h3>

                <button
                    type="button"
                    onClick={handleViewAllClick}
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
                {products.length === 0 ? (
                    <p
                        style={{
                            textAlign: 'center',
                            padding: '40px 0',
                            color: '#777',
                            fontSize: '14px',
                        }}
                    >
                        {brandName
                            ? '해당 브랜드의 상품이 없습니다.'
                            : '등록된 상품이 없습니다.'}
                    </p>
                ) : (
                    <ProductGrid>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </ProductGrid>
                )}
            </div>

            <FloatingChatButton />
        </div>
    );
};

export default Home;