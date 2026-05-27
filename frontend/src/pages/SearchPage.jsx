import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

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

    // 📌 최근 검색어 불러오기
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('recentSearch') || '[]');
        setRecent(saved);
    }, []);

    // 📌 검색 실행 (debounce)
    useEffect(() => {
        if (!keyword.trim()) return;

        const timer = setTimeout(() => {
            fetchSearch(keyword);
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);

    // 📌 검색 API
    const fetchSearch = (value) => {
        setLoading(true);

        axiosInstance
            .get(`/api/products?keyword=${value}&page=0&size=10&sort=popular`)
            .then((res) => {
                setResults(res.data.content || []);
                saveRecent(value);
                setSearchParams({ keyword: value });
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    // 📌 최근 검색어 저장
    const saveRecent = (value) => {
        let updated = [value, ...recent.filter(v => v !== value)];
        updated = updated.slice(0, 5);

        setRecent(updated);
        localStorage.setItem('recentSearch', JSON.stringify(updated));
    };

    // 📌 인기/최근 클릭 검색
    const onSearchClick = (value) => {
        setKeyword(value);
    };

    return (
        <PageWrapper>

            {/* 검색창 */}
            <SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="상품을 검색하세요"
            />

            {/* 인기 검색어 */}
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

            {/* 최근 검색어 */}
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

            {/* 로딩 */}
            {loading && <p>검색중...</p>}

            {/* 결과 */}
            <Grid>
                {results.map((item) => (
                    <Card
                        key={item.id}
                        onClick={() => navigate(`/products/${item.id}`)}
                    >

                        <ProductImg
                            src={`${item.imageUrl}`}
                            alt={item.name}
                        />

                        <InfoBox>
                            <h4>{item.name}</h4>
                            <p>{item.price?.toLocaleString()}원</p>
                        </InfoBox>

                    </Card>
                ))}
            </Grid>

        </PageWrapper>
    );
};

export default SearchPage;