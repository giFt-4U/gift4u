//ProductPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ProductPageGrid } from '../styles/HomeStyle';

const ProductPage = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);

    useEffect(() => {

        if (!hasMore) return;

        axiosInstance
            .get(`/api/products?page=${page}&size=10&sort=popular`)
            .then((res) => {

                const newItems = res.data.content || [];

                if (newItems.length === 0) {
                    setHasMore(false);
                    return;
                }

                setProducts((prev) => [...prev, ...newItems]);

                if (newItems.length < 10) {
                    setHasMore(false);
                }

            })
            .catch(console.error);

    }, [page]);

    useEffect(() => {

        if (!hasMore) return;

        const observer = new IntersectionObserver((entries) => {

            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }

        }, { threshold: 1.0 });

        const target = observerRef.current;

        if (target) observer.observe(target);

        return () => observer.disconnect();

    }, [hasMore]);

    return (
        <div style={{ padding: '0 20px' }}>

            <h2>베스트 상품</h2>

            <ProductPageGrid>

                {products.map((product) => (

                    <div
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                    >

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = "/images/default.png";
                            }}
                            style={{
                                width: "100%",
                                height: "180px",      // 🔥 핵심 (고정)
                                objectFit: "cover",
                                borderRadius: "10px",
                                backgroundColor: "#f5f5f5"
                            }}
                        />

                        <h3>{product.name}</h3>

                        <p>{product.price?.toLocaleString()}원</p>

                    </div>
                ))}

            </ProductPageGrid>

            {hasMore && <div ref={observerRef} style={{ height: '50px' }} />}

            {!hasMore && (
                <p style={{ textAlign: 'center', padding: '20px' }}>
                    마지막 상품입니다
                </p>
            )}

        </div>
    );
};

export default ProductPage;