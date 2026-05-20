//ProductPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/common/ProductCard';
import { ProductPageGrid } from '../styles/HomeStyle';

const ProductPage = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);

    // 데이터 로딩
    useEffect(() => {

        if (!hasMore) return;

        axiosInstance
            .get(`/api/products?page=${page}&size=10&sort=popular`)
            .then((res) => {

                const newItems = res.data.content;

                setProducts((prev) => [...prev, ...newItems]);

                // 마지막 페이지 체크 (백엔드 기준)
                if (newItems.length < 10) {
                    setHasMore(false);
                }

            })
            .catch((err) => console.error(err));

    }, [page]);

    // Intersection Observer (스크롤 감지)
    useEffect(() => {

        if (!hasMore) return;

        const observer = new IntersectionObserver((entries) => {

            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }

        }, {
            threshold: 1.0
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();

    }, [hasMore]);

    return (

        <div style={{ padding: '0 20px' }}>

            <h2>베스트 상품</h2>

            <ProductPageGrid>

                {products.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </ProductPageGrid>

            {/* 스크롤 감지 트리거 */}
            {
                hasMore && (
                    <div
                        ref={observerRef}
                        style={{ height: '50px' }}
                    />
                )
            }

            {/* 끝 메시지 */}
            {
                !hasMore && (
                    <p style={{ textAlign: 'center', padding: '20px' }}>
                        마지막 상품입니다
                    </p>
                )
            }

        </div >
    );
};

export default ProductPage;