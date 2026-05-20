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

    // 데이터 로딩
    useEffect(() => {

        if (!hasMore) return;

        axiosInstance
            .get(`/api/products?page=${page}&size=10&sort=popular`)
            .then((res) => {

                const newItems = res.data.content;

                setProducts((prev) => [...prev, ...newItems]);

                // 마지막 페이지 체크
                if (newItems.length < 10) {
                    setHasMore(false);
                }

            })
            .catch((err) => console.error(err));

    }, [page]);

    // 무한스크롤
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
                    <div
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                    >

                        <img
                            src={product.prdImg}
                            alt={product.prdName}
                            style={{
                                width: '100%',
                                height: '180px',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />

                        <h3>{product.prdName}</h3>

                        <p>
                            {product.prdPrice?.toLocaleString()}원
                        </p>

                    </div>
                ))}

            </ProductPageGrid>

            {/* observer trigger */}
            {
                hasMore && (
                    <div
                        ref={observerRef}
                        style={{ height: '50px' }}
                    />
                )
            }

            {/* end message */}
            {
                !hasMore && (
                    <p style={{ textAlign: 'center', padding: '20px' }}>
                        마지막 상품입니다
                    </p>
                )
            }

        </div>
    );
};

export default ProductPage;