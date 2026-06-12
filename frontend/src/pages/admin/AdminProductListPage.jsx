import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

/* ── Styles (Admin 공통 패턴 재사용) ─────────────────────── */
const PageHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    gap: 16px;
`;
const PageTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
    letter-spacing: 0;
    text-transform: none;
`;
const PageSub = styled.p`
    font-size: 13px;
    color: #9ca3af;
    letter-spacing: 0;
    text-transform: none;
`;
const AddBtn = styled.button`
    height: 38px;
    padding: 0 18px;
    background: #ff8c00;
    color: #fff;
    border: 0;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    font-family: inherit;
    letter-spacing: 0;
    text-transform: none;
    transition: background .12s;
    &:hover { background: #e07800; }
`;

const Card = styled.div`
    background: #fff;
    border: 1px solid #e8eaed;
    border-radius: 14px;
    overflow: hidden;
`;
const ToolBar = styled.div`
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #f3f4f6;
    flex-wrap: wrap;
`;
const SearchWrap = styled.div`
    position: relative;
    flex-shrink: 0;
`;
const SearchIcon = styled.span`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 14px;
    pointer-events: none;
`;
const SearchInput = styled.input`
    height: 36px;
    padding: 0 12px 0 32px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-size: 13px;
    width: 220px;
    outline: none;
    transition: border .15s;
    font-family: inherit;
    letter-spacing: 0;
    text-transform: none;
    &::placeholder { color: #d1d5db; }
    &:focus { border-color: #ff8c00; }
`;
const FilterSelect = styled.select`
    height: 36px;
    padding: 0 10px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-size: 13px;
    background: #fff;
    cursor: pointer;
    outline: none;
    font-family: inherit;
    letter-spacing: 0;
    text-transform: none;
    &:focus { border-color: #ff8c00; }
`;
const CountBadge = styled.span`
    margin-left: auto;
    font-size: 12px;
    color: #9ca3af;
    letter-spacing: 0;
    text-transform: none;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    letter-spacing: 0;
    text-transform: none;
`;
const Thead = styled.thead`background: #fafafa;`;
const Th = styled.th`
    padding: 10px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: .5px;
    border-bottom: 1px solid #f3f4f6;
    white-space: nowrap;
`;
const Tr = styled.tr`
    transition: background .1s;
    &:hover { background: #fafbff; }
    &:not(:last-child) td { border-bottom: 1px solid #f9fafb; }
`;
const Td = styled.td`
    padding: 14px 20px;
    color: #374151;
    vertical-align: middle;
`;

const ProductCell = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;
const Thumb = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #f3f4f6;
    border: 1px solid #e8eaed;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    overflow: hidden;
`;
const ThumbImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const ProductName = styled.p`
    font-weight: 600;
    color: #111827;
    line-height: 1.3;
`;
const ProductBrand = styled.p`
    font-size: 11.5px;
    color: #9ca3af;
    margin-top: 1px;
`;

const Chip = styled.span`
    display: inline-flex;
    padding: 3px 9px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    background: ${({ $v }) => ($v === 'on' ? '#f0fdf4' : '#fff1f0')};
    color: ${({ $v }) => ($v === 'on' ? '#059669' : '#dc2626')};
`;

const ActionBtn = styled.button`
    height: 28px;
    padding: 0 12px;
    border-radius: 7px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 0;
    text-transform: none;
    transition: all .12s;
    &:hover { border-color: #ff8c00; color: #e07800; }
`;

const EmptyCell = styled.td`
    padding: 64px 20px;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
    letter-spacing: 0;
    text-transform: none;
`;

const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-top: 1px solid #f3f4f6;
`;
const PaginationInfo = styled.p`
    font-size: 12px;
    color: #9ca3af;
    letter-spacing: 0;
    text-transform: none;
`;
const PageBtnGroup = styled.div`display: flex; gap: 4px;`;
const PageBtn = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 7px;
    border: 1.5px solid ${({ $active }) => ($active ? '#ff8c00' : '#e5e7eb')};
    background: ${({ $active }) => ($active ? '#ff8c00' : '#fff')};
    color: ${({ $active }) => ($active ? '#fff' : '#374151')};
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .12s;
    &:hover:not(:disabled) { border-color: #ff8c00; }
    &:disabled { opacity: .4; cursor: not-allowed; }
`;

/* ── Mock ────────────────────────────────────────────────── */
const CATS = ['전체', '수유', '위생', '라이프', '세탁/세척', '남케이', '베이비케어'];
const MOCK = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    name: ['아기 젖병', '유기농 물티슈', '배앓이 쿠션', '아기 세제', '수유 쿠션', '신생아 이불'][i % 6] + (i > 5 ? ` ${i}` : ''),
    brand: ['베베핀', '그린맘', '마더스베이비', '보솜이'][i % 4],
    category: CATS[(i % 6) + 1],
    price: (9900 + i * 2500).toLocaleString('ko-KR'),
    stock: i % 5 === 0 ? 0 : 10 + i,
    imageUrl: null,
}));

const PAGE_SIZE = 10;

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('전체');
    const [page, setPage] = useState(0);

    useEffect(() => {
        setLoading(true);
        // TODO: axiosInstance.get('/api/admin/products', { params: { page, size: PAGE_SIZE } })
        setTimeout(() => { setProducts(MOCK); setLoading(false); }, 350);
    }, []);

    const filtered = products.filter((p) => {
        const s = search.toLowerCase();
        return (!s || p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s))
            && (category === '전체' || p.category === category);
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const onSearch = useCallback((e) => { setSearch(e.target.value); setPage(0); }, []);
    const onCategory = useCallback((e) => { setCategory(e.target.value); setPage(0); }, []);

    return (
        <div>
            <PageHeader>
                <div>
                    <PageTitle>상품 관리</PageTitle>
                    <PageSub>등록된 상품을 조회하고 관리합니다.</PageSub>
                </div>
                <AddBtn onClick={() => alert('상품 등록 — 추후 구현')}>+ 상품 등록</AddBtn>
            </PageHeader>

            <Card>
                <ToolBar>
                    <SearchWrap>
                        <SearchIcon>🔍</SearchIcon>
                        <SearchInput
                            value={search}
                            onChange={onSearch}
                            placeholder="상품명 또는 브랜드"
                        />
                    </SearchWrap>
                    <FilterSelect value={category} onChange={onCategory}>
                        {CATS.map((c) => <option key={c}>{c}</option>)}
                    </FilterSelect>
                    <CountBadge>총 {filtered.length}개</CountBadge>
                </ToolBar>

                <Table>
                    <Thead>
                        <tr>
                            <Th>상품</Th>
                            <Th>카테고리</Th>
                            <Th>가격</Th>
                            <Th>재고</Th>
                            <Th>상태</Th>
                            <Th>관리</Th>
                        </tr>
                    </Thead>
                    <tbody>
                        {loading ? (
                            <tr><EmptyCell colSpan={6}>불러오는 중…</EmptyCell></tr>
                        ) : paged.length === 0 ? (
                            <tr><EmptyCell colSpan={6}>검색 결과가 없습니다.</EmptyCell></tr>
                        ) : paged.map((p) => (
                            <Tr key={p.id}>
                                <Td>
                                    <ProductCell>
                                        <Thumb>
                                            {p.imageUrl ? <ThumbImg src={p.imageUrl} alt="" /> : '📦'}
                                        </Thumb>
                                        <div>
                                            <ProductName>{p.name}</ProductName>
                                            <ProductBrand>{p.brand}</ProductBrand>
                                        </div>
                                    </ProductCell>
                                </Td>
                                <Td style={{ color: '#6b7280' }}>{p.category}</Td>
                                <Td style={{ fontWeight: 600, color: '#111827' }}>₩ {p.price}</Td>
                                <Td style={{ color: p.stock === 0 ? '#dc2626' : '#374151', fontWeight: p.stock === 0 ? 600 : 400 }}>
                                    {p.stock === 0 ? '품절' : `${p.stock}개`}
                                </Td>
                                <Td>
                                    <Chip $v={p.stock > 0 ? 'on' : 'off'}>
                                        {p.stock > 0 ? '판매중' : '품절'}
                                    </Chip>
                                </Td>
                                <Td>
                                    <ActionBtn onClick={() => alert(`${p.name} 수정`)}>수정</ActionBtn>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationInfo>
                            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} / {filtered.length}개
                        </PaginationInfo>
                        <PageBtnGroup>
                            <PageBtn onClick={() => setPage(p => p - 1)} disabled={page === 0}>‹</PageBtn>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <PageBtn key={i} $active={i === page} onClick={() => setPage(i)}>{i + 1}</PageBtn>
                            ))}
                            <PageBtn onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>›</PageBtn>
                        </PageBtnGroup>
                    </Pagination>
                )}
            </Card>
        </div>
    );
};

export default AdminProductListPage;
