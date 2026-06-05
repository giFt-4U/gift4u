// ProductPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ProductPageGrid } from '../styles/HomeStyle';
import HeartButton from '../components/common/HeartButton';

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

    }, [page, hasMore]);

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

            <h2
                style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '22px',
                    marginBottom: '18px',
                }}
            >
                베스트 상품
            </h2>

            <ProductPageGrid>

                {products.map((product) => {
                    const brandName = product.brandName || product.brand_name;
                    const imageSrc = product.imageUrl || product.image_url || "/images/default.png";

                    return (
                        <div
                            key={product.id}
                            style={{
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                            <HeartButton product={product} />

                            <img
                                src={imageSrc}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = "/images/default.png";
                                }}
                                style={{
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    backgroundColor: "#f5f5f5"
                                }}
                            />

                            {brandName && (
                                <p
                                    className='product-brand'
                                    style={{
                                        margin: '10px 0 0',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: '#777',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {brandName}
                                </p>
                            )}

                            <h3
                                style={{
                                    marginTop: '6px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                }}
                            >
                                {product.name}
                            </h3>

                            <p
                                style={{
                                    marginTop: '6px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    lineHeight: '18px',
                                }}
                            >
                                {product.price?.toLocaleString()}원
                            </p>

                        </div>
                    );
                })}

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