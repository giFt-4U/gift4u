// AdminProductListPage.jsx

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import {
    getAdminProducts,
    createAdminProduct,
    updateAdminProduct,
    deleteAdminProduct,
} from '../../api/adminProductApi';

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

    &:hover {
        background: #e07800;
    }
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

    &::placeholder {
        color: #d1d5db;
    }

    &:focus {
        border-color: #ff8c00;
    }
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

    &:focus {
        border-color: #ff8c00;
    }
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

const Thead = styled.thead`
    background: #fafafa;
`;

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

    &:hover {
        background: #fafbff;
    }

    &:not(:last-child) td {
        border-bottom: 1px solid #f9fafb;
    }
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
    margin: 0;
`;

const ProductBrand = styled.p`
    font-size: 11.5px;
    color: #9ca3af;
    margin: 1px 0 0;
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

const ButtonGroup = styled.div`
    display: flex;
    gap: 6px;
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

    &:hover {
        border-color: #ff8c00;
        color: #e07800;
    }
`;

const DeleteBtn = styled(ActionBtn)`
    &:hover {
        border-color: #dc2626;
        color: #dc2626;
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
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

const PageBtnGroup = styled.div`
    display: flex;
    gap: 4px;
`;

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

    &:hover:not(:disabled) {
        border-color: #ff8c00;
    }

    &:disabled {
        opacity: .4;
        cursor: not-allowed;
    }
`;

/* ── Modal ─────────────────────────────────────────────── */
const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(17, 24, 39, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
`;

const ModalBox = styled.div`
    width: 720px;
    max-width: 100%;
    max-height: 92vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, .18);
`;

const ModalHeader = styled.div`
    height: 58px;
    padding: 0 22px;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ModalTitle = styled.h3`
    font-size: 17px;
    font-weight: 700;
    color: #111827;
    margin: 0;
`;

const CloseButton = styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    font-size: 22px;
    cursor: pointer;

    &:hover {
        background: #f3f4f6;
    }
`;

const Form = styled.form`
    padding: 22px;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const FormField = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;
    grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
`;

const Label = styled.span`
    font-size: 12px;
    font-weight: 700;
    color: #6b7280;
`;

const Input = styled.input`
    height: 38px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 0 12px;
    font-size: 13px;
    outline: none;
    font-family: inherit;

    &:focus {
        border-color: #ff8c00;
    }
`;

const Select = styled.select`
    height: 38px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 0 12px;
    font-size: 13px;
    outline: none;
    background: #fff;
    font-family: inherit;

    &:focus {
        border-color: #ff8c00;
    }
`;

const Textarea = styled.textarea`
    min-height: 100px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 13px;
    outline: none;
    resize: vertical;
    font-family: inherit;

    &:focus {
        border-color: #ff8c00;
    }
`;

const CheckLabel = styled.label`
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #374151;
`;

const ModalFooter = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const CancelButton = styled.button`
    height: 38px;
    padding: 0 16px;
    border-radius: 8px;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    color: #6b7280;
    cursor: pointer;
    font-family: inherit;
`;

const SubmitButton = styled.button`
    height: 38px;
    padding: 0 18px;
    border: 0;
    border-radius: 8px;
    background: #ff8c00;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;

    &:disabled {
        opacity: .6;
        cursor: not-allowed;
    }
`;

/* ── Data ─────────────────────────────────────────────── */
const CATS = ['전체', '수유', '위생', '라이프', '세탁/세척', '맘케어', '베이비케어'];

const CATEGORY_OPTIONS = [
    { id: 3, name: '수유' },
    { id: 2, name: '위생' },
    { id: 4, name: '라이프' },
    { id: 5, name: '세탁/세척' },
    { id: 6, name: '맘케어' },
    { id: 7, name: '베이비케어' },
];

const PAGE_SIZE = 10;

const initialForm = {
    id: null,
    categoryId: 3,
    brandName: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    salesCount: 0,
    imageUrl: '',
    active: true,
};

const getCategoryName = (categoryId) => {
    const id = Number(categoryId);

    if (id === 2) return '위생';
    if (id === 3) return '수유';
    if (id === 4) return '라이프';
    if (id === 5) return '세탁/세척';
    if (id === 6) return '맘케어';
    if (id === 7) return '베이비케어';

    return '미분류';
};

const getProductActive = (product) => {
    if (typeof product.active === 'boolean') {
        return product.active;
    }

    if (typeof product.isActive === 'number') {
        return product.isActive === 1;
    }

    if (typeof product.is_active === 'number') {
        return product.is_active === 1;
    }

    return true;
};

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('전체');
    const [page, setPage] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getAdminProducts({
                page: 0,
                size: 200,
            });

            const data = res.data;

            if (Array.isArray(data?.content)) {
                setProducts(data.content);
                return;
            }

            if (Array.isArray(data)) {
                setProducts(data);
                return;
            }

            setProducts([]);
        } catch (error) {
            console.error('관리자 상품 목록 조회 실패:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filtered = products.filter((p) => {
        const s = search.toLowerCase();

        const name = p.name || '';
        const brandName = p.brandName || p.brand_name || '';
        const categoryName = p.categoryName || getCategoryName(p.categoryId);

        return (
            (!s || name.toLowerCase().includes(s) || brandName.toLowerCase().includes(s)) &&
            (category === '전체' || categoryName === category)
        );
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

    const paged = filtered.slice(
        page * PAGE_SIZE,
        (page + 1) * PAGE_SIZE
    );

    const onSearch = useCallback((e) => {
        setSearch(e.target.value);
        setPage(0);
    }, []);

    const onCategory = useCallback((e) => {
        setCategory(e.target.value);
        setPage(0);
    }, []);

    const openCreateModal = () => {
        setForm(initialForm);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setForm({
            id: product.id,
            categoryId: product.categoryId || 3,
            brandName: product.brandName || product.brand_name || '',
            name: product.name || '',
            description: product.description || '',
            price: product.price ?? '',
            stock: product.stock ?? '',
            salesCount: product.salesCount ?? product.sales_count ?? 0,
            imageUrl: product.imageUrl || product.image_url || '',
            active: getProductActive(product),
        });

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setForm(initialForm);
        setSaving(false);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert('상품명을 입력해주세요.');
            return;
        }

        if (!form.price) {
            alert('가격을 입력해주세요.');
            return;
        }

        if (Number(form.price) < 0) {
            alert('가격은 0원 이상이어야 합니다.');
            return;
        }

        if (Number(form.stock || 0) < 0) {
            alert('재고는 0개 이상이어야 합니다.');
            return;
        }

        const payload = {
            categoryId: Number(form.categoryId),
            brandName: form.brandName.trim(),
            name: form.name.trim(),
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock || 0),
            salesCount: Number(form.salesCount || 0),
            imageUrl: form.imageUrl.trim(),
            active: form.active,
        };

        try {
            setSaving(true);

            if (form.id) {
                await updateAdminProduct(form.id, payload);
                alert('상품이 수정되었습니다.');
            } else {
                await createAdminProduct(payload);
                alert('상품이 등록되었습니다.');
            }

            closeModal();
            fetchProducts();
        } catch (error) {
            console.error('상품 저장 실패:', error);
            alert('상품 저장에 실패했습니다.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteProduct = async (product) => {
        const active = getProductActive(product);

        if (!active) {
            alert('이미 비활성화된 상품입니다.');
            return;
        }

        const ok = window.confirm(
            `"${product.name}" 상품을 비활성화하시겠습니까?`
        );

        if (!ok) return;

        try {
            await deleteAdminProduct(product.id);
            alert('상품이 비활성화되었습니다.');
            fetchProducts();
        } catch (error) {
            console.error('상품 비활성화 실패:', error);
            alert('상품 비활성화에 실패했습니다.');
        }
    };

    return (
        <div>
            <PageHeader>
                <div>
                    <PageTitle>상품 관리</PageTitle>
                    <PageSub>등록된 상품을 조회하고 관리합니다.</PageSub>
                </div>

                <AddBtn type="button" onClick={openCreateModal}>
                    + 상품 등록
                </AddBtn>
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
                        {CATS.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
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
                            <tr>
                                <EmptyCell colSpan={6}>불러오는 중…</EmptyCell>
                            </tr>
                        ) : paged.length === 0 ? (
                            <tr>
                                <EmptyCell colSpan={6}>검색 결과가 없습니다.</EmptyCell>
                            </tr>
                        ) : (
                            paged.map((p) => {
                                const brandName = p.brandName || p.brand_name || '-';
                                const categoryName = p.categoryName || getCategoryName(p.categoryId);
                                const imageUrl = p.imageUrl || p.image_url;
                                const active = getProductActive(p);

                                return (
                                    <Tr key={p.id}>
                                        <Td>
                                            <ProductCell>
                                                <Thumb>
                                                    {imageUrl ? (
                                                        <ThumbImg
                                                            src={imageUrl}
                                                            alt=""
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                        />
                                                    ) : (
                                                        '📦'
                                                    )}
                                                </Thumb>

                                                <div>
                                                    <ProductName>{p.name}</ProductName>
                                                    <ProductBrand>{brandName}</ProductBrand>
                                                </div>
                                            </ProductCell>
                                        </Td>

                                        <Td style={{ color: '#6b7280' }}>
                                            {categoryName}
                                        </Td>

                                        <Td style={{ fontWeight: 600, color: '#111827' }}>
                                            ₩ {Number(p.price || 0).toLocaleString()}
                                        </Td>

                                        <Td
                                            style={{
                                                color: Number(p.stock) === 0 ? '#dc2626' : '#374151',
                                                fontWeight: Number(p.stock) === 0 ? 600 : 400,
                                            }}
                                        >
                                            {Number(p.stock) === 0 ? '품절' : `${p.stock}개`}
                                        </Td>

                                        <Td>
                                            <Chip $v={active ? 'on' : 'off'}>
                                                {active ? '판매중' : '비활성'}
                                            </Chip>
                                        </Td>

                                        <Td>
                                            <ButtonGroup>
                                                <ActionBtn
                                                    type="button"
                                                    onClick={() => openEditModal(p)}
                                                >
                                                    수정
                                                </ActionBtn>

                                                <DeleteBtn
                                                    type="button"
                                                    onClick={() => handleDeleteProduct(p)}
                                                    disabled={!active}
                                                >
                                                    삭제
                                                </DeleteBtn>
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationInfo>
                            {page * PAGE_SIZE + 1}–
                            {Math.min((page + 1) * PAGE_SIZE, filtered.length)}
                            {' '} / {filtered.length}개
                        </PaginationInfo>

                        <PageBtnGroup>
                            <PageBtn
                                type="button"
                                onClick={() => setPage((p) => p - 1)}
                                disabled={page === 0}
                            >
                                ‹
                            </PageBtn>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PageBtn
                                    key={i}
                                    type="button"
                                    $active={i === page}
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </PageBtn>
                            ))}

                            <PageBtn
                                type="button"
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page >= totalPages - 1}
                            >
                                ›
                            </PageBtn>
                        </PageBtnGroup>
                    </Pagination>
                )}
            </Card>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalBox>
                        <ModalHeader>
                            <ModalTitle>
                                {form.id ? '상품 수정' : '상품 등록'}
                            </ModalTitle>

                            <CloseButton type="button" onClick={closeModal}>
                                ×
                            </CloseButton>
                        </ModalHeader>

                        <Form onSubmit={handleSubmit}>
                            <FormGrid>
                                <FormField>
                                    <Label>상품명</Label>
                                    <Input
                                        name="name"
                                        value={form.name}
                                        onChange={handleFormChange}
                                        placeholder="상품명을 입력하세요"
                                    />
                                </FormField>

                                <FormField>
                                    <Label>브랜드명</Label>
                                    <Input
                                        name="brandName"
                                        value={form.brandName}
                                        onChange={handleFormChange}
                                        placeholder="예: 따숨베베"
                                    />
                                </FormField>

                                <FormField>
                                    <Label>카테고리</Label>
                                    <Select
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleFormChange}
                                    >
                                        {CATEGORY_OPTIONS.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormField>

                                <FormField>
                                    <Label>가격</Label>
                                    <Input
                                        name="price"
                                        type="number"
                                        value={form.price}
                                        onChange={handleFormChange}
                                        placeholder="가격"
                                    />
                                </FormField>

                                <FormField>
                                    <Label>재고</Label>
                                    <Input
                                        name="stock"
                                        type="number"
                                        value={form.stock}
                                        onChange={handleFormChange}
                                        placeholder="재고"
                                    />
                                </FormField>

                                <FormField>
                                    <Label>판매량</Label>
                                    <Input
                                        name="salesCount"
                                        type="number"
                                        value={form.salesCount}
                                        onChange={handleFormChange}
                                        placeholder="판매량"
                                    />
                                </FormField>

                                <FormField $full>
                                    <Label>이미지 경로</Label>
                                    <Input
                                        name="imageUrl"
                                        value={form.imageUrl}
                                        onChange={handleFormChange}
                                        placeholder="/images/example.jpg"
                                    />
                                </FormField>

                                <FormField $full>
                                    <Label>상품 설명</Label>
                                    <Textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleFormChange}
                                        placeholder="상품 설명을 입력하세요"
                                    />
                                </FormField>

                                <CheckLabel>
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={form.active}
                                        onChange={handleFormChange}
                                    />
                                    판매중으로 노출
                                </CheckLabel>
                            </FormGrid>

                            <ModalFooter>
                                <CancelButton type="button" onClick={closeModal}>
                                    취소
                                </CancelButton>

                                <SubmitButton type="submit" disabled={saving}>
                                    {saving ? '저장 중...' : '저장'}
                                </SubmitButton>
                            </ModalFooter>
                        </Form>
                    </ModalBox>
                </ModalOverlay>
            )}
        </div>
    );
};

export default AdminProductListPage;