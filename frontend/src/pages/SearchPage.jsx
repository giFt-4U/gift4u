// SearchPage.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import HeartButton from '../components/common/HeartButton';

import {
    PageWrapper,
    SearchInput,
    Section,
    TagBox,
    Tag,
    TagGray,
    Grid,
    Card,
    ProductImg,
    InfoBox
} from '../styles/SearchStyle';

const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const keywordParam = searchParams.get('keyword') || '';

    const [keyword, setKeyword] = useState(keywordParam);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recent, setRecent] = useState([]);

    const trending = ['유모차', '기저귀', '분유', '아기침대'];

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('recentSearch') || '[]');
        setRecent(saved);
    }, []);

    useEffect(() => {
        if (!keyword.trim()) return;

        const timer = setTimeout(() => {
            fetchSearch(keyword);
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);

    const fetchSearch = (value) => {
        setLoading(true);

        axiosInstance
            .get(`/api/products?keyword=${value}&page=0&size=10&sort=popular`)
            .then((res) => {
                setResults(res.data.content || []);
                saveRecent(value);
                setSearchParams({ keyword: value });
            })
            .finally(() => setLoading(false));
    };

    const saveRecent = (value) => {
        let updated = [value, ...recent.filter(v => v !== value)];
        updated = updated.slice(0, 5);

        setRecent(updated);
        localStorage.setItem('recentSearch', JSON.stringify(updated));
    };

    const onSearchClick = (value) => {
        setKeyword(value);
    };

    return (
        <PageWrapper>

            <SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="상품을 검색하세요"
            />

            <Section>
                <h4>🔥 인기 검색어</h4>
                <TagBox>
                    {trending.map((item) => (
                        <Tag key={item} onClick={() => onSearchClick(item)}>
                            {item}
                        </Tag>
                    ))}
                </TagBox>
            </Section>

            <Section>
                <h4>🕘 최근 검색어</h4>
                <TagBox>
                    {recent.map((item) => (
                        <TagGray key={item} onClick={() => onSearchClick(item)}>
                            {item}
                        </TagGray>
                    ))}
                </TagBox>
            </Section>

            {loading && <p>검색중...</p>}

            <Grid>
                {results.map((item) => {
                    const brandName = item.brandName || item.brand_name;
                    const imageSrc = item.imageUrl || item.image_url || "/images/default.png";

                    return (
                        <Card
                            key={item.id}
                            onClick={() => navigate(`/products/${item.id}`)}
                            style={{
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                        >
                            <HeartButton product={item} />

                            <ProductImg
                                src={imageSrc}
                                alt={item.name}
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

                            <InfoBox>
                                {brandName && (
                                    <p
                                        className='product-brand'
                                        style={{
                                            margin: 0,
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: '#777',
                                            lineHeight: '1.2'
                                        }}
                                    >
                                        {brandName}
                                    </p>
                                )}

                                <h4
                                    style={{
                                        margin: '0 0 6px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        lineHeight: '20px'
                                    }}
                                >
                                    {item.name}
                                </h4>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        lineHeight: '18px'
                                    }}
                                >
                                    {item.price?.toLocaleString()}원
                                </p>
                            </InfoBox>


                        </Card>
                    );
                })}
            </Grid>

        </PageWrapper>
    );
};

export default SearchPage;