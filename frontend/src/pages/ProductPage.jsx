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


    // ?ç∞?ù¥?Ñ∞ Î°úÎî©

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


                // ÎßàÏ?Îß? ?éò?ù¥Ïß? Ï≤¥ÌÅ¨

                if (newItems.length < 10) {
                    setHasMore(false);
                }

            })
            .catch(console.error);

    }, [page]);


    // Î¨¥Ìïú?ä§?Å¨Î°?

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

            <h2>Î≤†Ïä§?ä∏ ?ÉÅ?íà</h2>

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
                                height: "180px",      // ?üî? ?ïµ?ã¨ (Í≥†Ï†ï)
                                objectFit: "cover",
                                borderRadius: "10px",
                                backgroundColor: "#f5f5f5"
                            }}
                        />

                        <h3>{product.name}</h3>


                        <p>
                            {product.prdPrice?.toLocaleString()}?õê
                        </p>


                    </div>
                ))}

            </ProductPageGrid>

            {hasMore && <div ref={observerRef} style={{ height: '50px' }} />}


            {/* end message */}
            {
                !hasMore && (
                    <p style={{ textAlign: 'center', padding: '20px' }}>
                        ÎßàÏ?Îß? ?ÉÅ?íà?ûÖ?ãà?ã§
                    </p>
                )
            }
=======
            {!hasMore && (
                <p style={{ textAlign: 'center', padding: '20px' }}>
                    ÎßàÏ?Îß? ?ÉÅ?íà?ûÖ?ãà?ã§
                </p>
            )}


        </div>
    );
};

export default ProductPage;