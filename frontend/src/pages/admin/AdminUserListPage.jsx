import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { getAdminUsers } from '../../api/adminApi';

/* ── Styles ──────────────────────────────────────────────── */
const PageTitle = styled.h2`
    font-size: 20px; font-weight: 700; color: #111827;
    margin-bottom: 4px; letter-spacing: 0; text-transform: none;
`;
const PageSub = styled.p`
    font-size: 13px; color: #9ca3af; margin-bottom: 24px;
    letter-spacing: 0; text-transform: none;
`;
const Card = styled.div`
    background: #fff; border: 1px solid #e8eaed; border-radius: 14px; overflow: hidden;
`;
const ToolBar = styled.div`
    padding: 16px 20px; display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid #f3f4f6; flex-wrap: wrap;
`;
const SearchWrap = styled.div`position: relative; flex-shrink: 0;`;
const SearchIcon = styled.span`
    position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
    color: #9ca3af; font-size: 14px; pointer-events: none;
`;
const SearchInput = styled.input`
    height: 36px; padding: 0 12px 0 32px; border: 1.5px solid #e5e7eb;
    border-radius: 8px; font-size: 13px; width: 220px; outline: none;
    font-family: inherit; letter-spacing: 0; text-transform: none;
    &::placeholder { color: #d1d5db; }
    &:focus { border-color: #ff8c00; }
`;
const FilterBtn = styled.button`
    height: 36px; padding: 0 14px; border-radius: 8px;
    border: 1.5px solid ${({ $active }) => ($active ? '#ff8c00' : '#e5e7eb')};
    background: ${({ $active }) => ($active ? '#fff4e8' : '#fff')};
    color: ${({ $active }) => ($active ? '#e07800' : '#6b7280')};
    font-size: 12.5px; font-weight: ${({ $active }) => ($active ? '600' : '500')};
    cursor: pointer; white-space: nowrap; font-family: inherit;
    letter-spacing: 0; text-transform: none; transition: all .12s;
    &:hover { border-color: #ff8c00; color: #e07800; }
`;
const CountBadge = styled.span`
    margin-left: auto; font-size: 12px; color: #9ca3af;
    letter-spacing: 0; text-transform: none;
`;
const Table = styled.table`
    width: 100%; border-collapse: collapse; font-size: 13px;
    letter-spacing: 0; text-transform: none;
`;
const Thead = styled.thead`background: #fafafa;`;
const Th = styled.th`
    padding: 10px 20px; text-align: left; font-size: 11px; font-weight: 600;
    color: #9ca3af; text-transform: uppercase; letter-spacing: .5px;
    border-bottom: 1px solid #f3f4f6; white-space: nowrap;
`;
const Tr = styled.tr`
    transition: background .1s;
    &:hover { background: #fafbff; }
    &:not(:last-child) td { border-bottom: 1px solid #f9fafb; }
`;
const Td = styled.td`padding: 14px 20px; color: #374151; vertical-align: middle;`;
const UserInfo = styled.div`display: flex; align-items: center; gap: 10px;`;
const Avatar = styled.div`
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #ff8c00, #ffb347);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; color: #fff; flex-shrink: 0; overflow: hidden;
`;
const AvatarImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const UserName = styled.p`font-weight: 600; color: #111827; font-size: 13px; line-height: 1.3;`;
const UserEmail = styled.p`font-size: 11.5px; color: #9ca3af; margin-top: 1px;`;
const Chip = styled.span`
    display: inline-flex; padding: 3px 9px; border-radius: 6px;
    font-size: 11.5px; font-weight: 600; white-space: nowrap;
    background: ${({ $v }) => ({
        KAKAO: '#fef9c3', LOCAL: '#eff6ff',
        active: '#f0fdf4', deleted: '#fff1f0',
    }[$v] || '#f3f4f6')};
    color: ${({ $v }) => ({
        KAKAO: '#92400e', LOCAL: '#1d4ed8',
        active: '#059669', deleted: '#dc2626',
    }[$v] || '#6b7280')};
`;
const EmptyCell = styled.td`
    padding: 64px 20px; text-align: center; color: #9ca3af;
    font-size: 14px; letter-spacing: 0; text-transform: none;
`;
const ErrorCell = styled(EmptyCell)`color: #dc2626;`;
const Pagination = styled.div`
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-top: 1px solid #f3f4f6;
`;
const PaginationInfo = styled.p`
    font-size: 12px; color: #9ca3af; letter-spacing: 0; text-transform: none;
`;
const PageBtnGroup = styled.div`display: flex; gap: 4px;`;
const PageBtn = styled.button`
    width: 32px; height: 32px; border-radius: 7px;
    border: 1.5px solid ${({ $active }) => ($active ? '#ff8c00' : '#e5e7eb')};
    background: ${({ $active }) => ($active ? '#ff8c00' : '#fff')};
    color: ${({ $active }) => ($active ? '#fff' : '#374151')};
    font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all .12s;
    &:hover:not(:disabled) { border-color: #ff8c00; }
    &:disabled { opacity: .4; cursor: not-allowed; }
`;

/* ── 상수 ────────────────────────────────────────────────── */
const PAGE_SIZE = 10;
const FILTERS = [
    { label: '전체',   value: 'all' },
    { label: '활성',   value: 'active' },
    { label: '탈퇴',   value: 'deleted' },
];

/* ── 날짜 포맷 ───────────────────────────────────────────── */
const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('ko-KR');
};

/* ── Component ───────────────────────────────────────────── */
const AdminUserListPage = () => {
    const [users, setUsers]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState('');
    const [search, setSearch]     = useState('');
    const [filter, setFilter]     = useState('all');
    const [page, setPage]         = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const searchTimer = useRef(null);

    const fetchUsers = useCallback(async (searchVal, filterVal, pageVal) => {
        setLoading(true);
        setError('');
        try {
            const res = await getAdminUsers({
                search: searchVal,
                status: filterVal,
                page: pageVal,
                size: PAGE_SIZE,
            });
            const data = res.data;
            setUsers(data.content || []);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
        } catch (err) {
            setError('회원 목록을 불러오지 못했습니다.');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // 최초 로드
    useEffect(() => {
        fetchUsers(search, filter, page);
    }, []);

    // 필터 변경 시 즉시 조회
    const onFilter = useCallback((val) => {
        setFilter(val);
        setPage(0);
        fetchUsers(search, val, 0);
    }, [search, fetchUsers]);

    // 검색 — 0.5초 디바운스
    const onSearch = useCallback((e) => {
        const val = e.target.value;
        setSearch(val);
        setPage(0);
        clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            fetchUsers(val, filter, 0);
        }, 500);
    }, [filter, fetchUsers]);

    // 페이지 변경
    const onPage = useCallback((p) => {
        setPage(p);
        fetchUsers(search, filter, p);
    }, [search, filter, fetchUsers]);

    return (
        <div>
            <PageTitle>회원 관리</PageTitle>
            <PageSub>가입된 회원을 조회하고 관리합니다.</PageSub>

            <Card>
                <ToolBar>
                    <SearchWrap>
                        <SearchIcon>🔍</SearchIcon>
                        <SearchInput
                            value={search}
                            onChange={onSearch}
                            placeholder="닉네임 또는 이메일"
                        />
                    </SearchWrap>
                    {FILTERS.map((f) => (
                        <FilterBtn key={f.value} $active={filter === f.value} onClick={() => onFilter(f.value)}>
                            {f.label}
                        </FilterBtn>
                    ))}
                    <CountBadge>총 {totalElements}명</CountBadge>
                </ToolBar>

                <Table>
                    <Thead>
                        <tr>
                            <Th>회원</Th>
                            <Th>전화번호</Th>
                            <Th>가입 방식</Th>
                            <Th>가입일</Th>
                            <Th>상태</Th>
                        </tr>
                    </Thead>
                    <tbody>
                        {loading ? (
                            <tr><EmptyCell colSpan={5}>불러오는 중…</EmptyCell></tr>
                        ) : error ? (
                            <tr><ErrorCell colSpan={5}>{error}</ErrorCell></tr>
                        ) : users.length === 0 ? (
                            <tr><EmptyCell colSpan={5}>검색 결과가 없습니다.</EmptyCell></tr>
                        ) : users.map((u) => (
                            <Tr key={u.id}>
                                <Td>
                                    <UserInfo>
                                        <Avatar>
                                            {u.profileImage
                                                ? <AvatarImg src={u.profileImage} alt="" />
                                                : (u.nickname?.charAt(0) || '?')}
                                        </Avatar>
                                        <div>
                                            <UserName>{u.nickname}</UserName>
                                            <UserEmail>{u.email}</UserEmail>
                                        </div>
                                    </UserInfo>
                                </Td>
                                <Td style={{ color: u.phone ? '#374151' : '#d1d5db' }}>
                                    {u.phone || '—'}
                                </Td>
                                <Td>
                                    <Chip $v={u.loginProvider}>
                                        {u.loginProvider === 'KAKAO' ? '카카오' : '일반'}
                                    </Chip>
                                </Td>
                                <Td style={{ color: '#6b7280', fontSize: 12 }}>
                                    {formatDate(u.createdAt)}
                                </Td>
                                <Td>
                                    <Chip $v={u.deletedAt ? 'deleted' : 'active'}>
                                        {u.deletedAt ? '탈퇴' : '활성'}
                                    </Chip>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationInfo>
                            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, totalElements)} / {totalElements}명
                        </PaginationInfo>
                        <PageBtnGroup>
                            <PageBtn onClick={() => onPage(page - 1)} disabled={page === 0}>‹</PageBtn>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <PageBtn key={i} $active={i === page} onClick={() => onPage(i)}>{i + 1}</PageBtn>
                            ))}
                            <PageBtn onClick={() => onPage(page + 1)} disabled={page >= totalPages - 1}>›</PageBtn>
                        </PageBtnGroup>
                    </Pagination>
                )}
            </Card>
        </div>
    );
};

export default AdminUserListPage;
