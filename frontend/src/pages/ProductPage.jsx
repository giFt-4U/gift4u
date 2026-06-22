import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductPageGrid } from '../styles/HomeStyle';
import HeartButton from '../components/common/HeartButton';

const ProductPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const brandName = searchParams.get('brandName') || '';

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filterBrandName, setFilterBrandName] = useState(brandName);
    const [loading, setLoading] = useState(false);

    // 정렬 상태
    const [sort, setSort] = useState('popular');

    const observerRef = useRef(null);

    // 이전 요청 결과가 새 정렬 결과를 덮지 않도록 관리
    const requestIdRef = useRef(0);

    useEffect(() => {
        requestIdRef.current += 1;

        setProducts([]);
        setPage(0);
        setHasMore(true);
        setFilterBrandName(brandName);
    }, [brandName]);

    // 정렬 변경
    const handleSortChange = (e) => {
        const nextSort = e.target.value;

        if (nextSort === sort) return;

        requestIdRef.current += 1;

        setProducts([]);
        setPage(0);
        setHasMore(true);
        setSort(nextSort);
    };

    useEffect(() => {
        // 브랜드 변경 직후 이전 브랜드 조건으로 요청되는 것 방지
        if (!hasMore || filterBrandName !== brandName) return;

        const requestId = ++requestIdRef.current;

        setLoading(true);

        axiosInstance
            .get("/api/products", {
                params: {
                    page,
                    size: 10,
                    sort,

                    ...(filterBrandName && {
                        brandName: filterBrandName,
                    }),
                },
            })
            .then((res) => {
                if (requestId !== requestIdRef.current) return;

                const newItems = res.data?.content || [];

                setProducts((prev) => {
                    if (page === 0) {
                        return newItems;
                    }

                    return [...prev, ...newItems];
                });

                // Spring Page 응답의 마지막 페이지 여부 사용
                if (typeof res.data?.last === 'boolean') {
                    setHasMore(!res.data.last);
                    return;
                }

                // last 값이 없을 경우 기존 방식 유지
                setHasMore(newItems.length === 10);
            })
            .catch((error) => {
                if (requestId !== requestIdRef.current) return;

                console.error("상품 조회 실패:", error);
                setHasMore(false);
            })
            .finally(() => {
                if (requestId === requestIdRef.current) {
                    setLoading(false);
                }
            });

    }, [page, filterBrandName, brandName, hasMore, sort]);

    useEffect(() => {
        if (!hasMore || loading || products.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.unobserve(entries[0].target);

                setPage((prev) => prev + 1);
            }
        }, { threshold: 1.0 });

        const target = observerRef.current;

        if (target) observer.observe(target);

        return () => observer.disconnect();

    }, [hasMore, loading, products.length]);

    const isEmpty = !loading && !hasMore && products.length === 0;

    return (
        <div style={{ padding: '0 20px' }}>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                }}
            >
                <h2
                    style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        lineHeight: '22px',
                        margin: 0,
                    }}
                >
                    {filterBrandName
                        ? `${filterBrandName} 상품`
                        : '베스트 상품'}
                </h2>

                <select
                    value={sort}
                    onChange={handleSortChange}
                    aria-label="상품 정렬"
                    style={{
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#666',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                >
                    <option value="popular">인기순</option>
                    <option value="latest">최신순</option>
                    <option value="priceAsc">낮은 가격순</option>
                    <option value="priceDesc">높은 가격순</option>
                </select>
            </div>

            {isEmpty && (
                <p
                    style={{
                        textAlign: 'center',
                        padding: '40px 0',
                        color: '#777',
                        fontSize: '14px',
                    }}
                >
                    {filterBrandName
                        ? '해당 브랜드의 상품이 없습니다.'
                        : '등록된 상품이 없습니다.'}
                </p>
            )}

            <ProductPageGrid>
                {products.map((product) => {
                    const productBrandName =
                        product.brandName || product.brand_name;

                    const imageSrc =
                        product.imageUrl ||
                        product.image_url ||
                        "/images/default.png";

                    return (
                        <div
                            key={product.id}
                            style={{
                                cursor: 'pointer',
                                position: 'relative',
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
                                    backgroundColor: "#f5f5f5",
                                }}
                            />

                            {productBrandName && (
                                <p
                                    className="product-brand"
                                    style={{
                                        margin: '10px 0 0',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: '#777',
                                        lineHeight: '1.2',
                                    }}
                                >
                                    {productBrandName}
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
                                {Number(product.price || 0).toLocaleString()}원
                            </p>
                        </div>
                    );
                })}
            </ProductPageGrid>

            {hasMore && !isEmpty && (
                <div ref={observerRef} style={{ height: '50px' }} />
            )}

            {!hasMore && products.length > 0 && (
                <p
                    style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#777',
                        fontSize: '14px',
                    }}
                >
                    마지막 상품입니다
                </p>
            )}

        </div>
    );
};

export default ProductPage;