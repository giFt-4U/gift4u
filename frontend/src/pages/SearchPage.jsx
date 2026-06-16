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
    RemoveRecentButton,
    Grid,
    Card,
    ProductImg,
    InfoBox,
    EmptyText
} from '../styles/SearchStyle';

const DEFAULT_TRENDING = ['유모차', '기저귀', '분유', '아기 침대'];

const RECENT_SEARCH_KEY = 'recentSearch';
const POPULAR_SEARCH_KEY = 'popularSearchCount';

// 검색어 정규화
const normalizeKeyword = (value) => {
    const trimmed = value.trim().replace(/\s+/g, ' ');
    const noSpace = trimmed.replace(/\s/g, '');

    // 아기침대라고 입력해도 DB 상품명 기준인 아기 침대로 보정
    if (noSpace === '아기침대') {
        return '아기 침대';
    }

    return trimmed;
};

// localStorage JSON 파싱 안전 처리
const getStorageData = (key, defaultValue) => {
    try {
        return JSON.parse(
            localStorage.getItem(key) || JSON.stringify(defaultValue)
        );
    } catch (error) {
        console.error(`${key} localStorage 파싱 실패:`, error);
        localStorage.removeItem(key);
        return defaultValue;
    }
};

// 인기 검색어 가져오기
const getPopularKeywords = () => {
    const saved = getStorageData(POPULAR_SEARCH_KEY, {});

    const sorted = Object.entries(saved)
        .sort((a, b) => b[1] - a[1])
        .map(([keyword]) => keyword);

    const merged = [
        ...sorted,
        ...DEFAULT_TRENDING.filter((item) => !sorted.includes(item))
    ];

    return merged.slice(0, 4);
};

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const keywordParam = searchParams.get('keyword') || '';

    const [keyword, setKeyword] = useState(keywordParam);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recent, setRecent] = useState([]);
    const [popularKeywords, setPopularKeywords] = useState(DEFAULT_TRENDING);
    const [hasSearched, setHasSearched] = useState(false);

    // 인기 검색어 저장
    const savePopularKeyword = (value) => {
        const searchValue = normalizeKeyword(value);

        if (!searchValue) return;

        const saved = getStorageData(POPULAR_SEARCH_KEY, {});

        saved[searchValue] = (saved[searchValue] || 0) + 1;

        localStorage.setItem(
            POPULAR_SEARCH_KEY,
            JSON.stringify(saved)
        );

        setPopularKeywords(getPopularKeywords());
    };

    // 최근 검색어 저장
    const saveRecent = (value) => {
        const searchValue = normalizeKeyword(value);

        if (!searchValue) return;

        setRecent((prev) => {
            const updated = [
                searchValue,
                ...prev.filter((item) => item !== searchValue)
            ].slice(0, 5);

            localStorage.setItem(
                RECENT_SEARCH_KEY,
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    // 검색 API 호출
    const fetchSearch = async (value) => {
        const searchValue = normalizeKeyword(value);

        if (!searchValue) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        try {
            setLoading(true);
            setHasSearched(true);

            const res = await axiosInstance.get('/api/products', {
                params: {
                    keyword: searchValue,
                    page: 0,
                    size: 10,
                    sort: 'popular',
                },
            });

            setResults(res.data.content || []);
        } catch (error) {
            console.error('검색 실패:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // 처음 페이지 진입 시 최근 검색어 / 인기 검색어 세팅
    useEffect(() => {
        const savedRecent = getStorageData(RECENT_SEARCH_KEY, []);

        setRecent(savedRecent);
        setPopularKeywords(getPopularKeywords());
    }, []);

    // URL keyword가 바뀌면 검색 결과 갱신
    useEffect(() => {
        const searchValue = normalizeKeyword(keywordParam);

        if (!searchValue) {
            setKeyword('');
            setResults([]);
            setHasSearched(false);
            return;
        }

        setKeyword(searchValue);
        fetchSearch(searchValue);
    }, [keywordParam]);

    // 최근 검색어 삭제
    const removeRecent = (e, value) => {
        e.stopPropagation();

        setRecent((prev) => {
            const updated = prev.filter((item) => item !== value);

            localStorage.setItem(
                RECENT_SEARCH_KEY,
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    // 검색 제출
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const searchValue = normalizeKeyword(keyword);

        if (!searchValue) return;

        saveRecent(searchValue);
        savePopularKeyword(searchValue);
        setKeyword(searchValue);

        const currentKeyword = normalizeKeyword(keywordParam);

        // URL이 이미 같은 검색어면 직접 검색 실행
        // URL이 다르면 setSearchParams 이후 useEffect에서 검색 실행
        if (currentKeyword === searchValue) {
            fetchSearch(searchValue);
        } else {
            setSearchParams({ keyword: searchValue });
        }
    };

    // 인기 검색어 / 최근 검색어 클릭
    const onSearchClick = (value) => {
        const searchValue = normalizeKeyword(value);

        if (!searchValue) return;

        saveRecent(searchValue);
        savePopularKeyword(searchValue);
        setKeyword(searchValue);

        const currentKeyword = normalizeKeyword(keywordParam);

        if (currentKeyword === searchValue) {
            fetchSearch(searchValue);
        } else {
            setSearchParams({ keyword: searchValue });
        }
    };

    return (
        <PageWrapper>

            <form onSubmit={handleSearchSubmit}>
                <SearchInput
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="상품을 검색하세요"
                />
            </form>

            <Section>
                <h4>🔥 인기 검색어</h4>

                <TagBox>
                    {popularKeywords.map((item) => (
                        <Tag
                            key={item}
                            type="button"
                            onClick={() => onSearchClick(item)}
                        >
                            {item}
                        </Tag>
                    ))}
                </TagBox>
            </Section>

            <Section>
                <h4>🕘 최근 검색어</h4>

                {recent.length > 0 ? (
                    <TagBox>
                        {recent.map((item) => (
                            <TagGray
                                key={item}
                                onClick={() => onSearchClick(item)}
                            >
                                <span>{item}</span>

                                <RemoveRecentButton
                                    type="button"
                                    onClick={(e) => removeRecent(e, item)}
                                    aria-label={`${item} 최근 검색어 삭제`}
                                >
                                    ×
                                </RemoveRecentButton>
                            </TagGray>
                        ))}
                    </TagBox>
                ) : (
                    <EmptyText>
                        최근 검색어가 없습니다.
                    </EmptyText>
                )}
            </Section>

            {loading && (
                <EmptyText>
                    검색중...
                </EmptyText>
            )}

            {!loading && hasSearched && results.length === 0 && (
                <EmptyText>
                    검색 결과가 없습니다.
                </EmptyText>
            )}

            <Grid>
                {results.map((item) => {
                    const brandName = item.brandName || item.brand_name;
                    const imageSrc = item.imageUrl || item.image_url || "/images/default.png";

                    return (
                        <Card
                            key={item.id}
                            onClick={() => navigate(`/products/${item.id}`)}
                        >
                            <HeartButton product={item} />

                            <ProductImg
                                src={imageSrc}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = "/images/default.png";
                                }}
                            />

                            <InfoBox>
                                {brandName && (
                                    <p className="product-brand">
                                        {brandName}
                                    </p>
                                )}

                                <h4 className="product-name">
                                    {item.name}
                                </h4>

                                <p className="product-price">
                                    {Number(item.price || 0).toLocaleString()}원
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