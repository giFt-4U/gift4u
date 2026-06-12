import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

/* ── Styles ──────────────────────────────────────────────── */
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
    margin-bottom: 24px;
    letter-spacing: 0;
    text-transform: none;
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
    color: #111827;
    transition: border .15s;
    letter-spacing: 0;
    text-transform: none;
    font-family: inherit;

    &::placeholder { color: #d1d5db; }
    &:focus { border-color: #ff8c00; }
`;

const FilterBtn = styled.button`
    height: 36px;
    padding: 0 14px;
    border-radius: 8px;
    border: 1.5px solid ${({ $active }) => ($active ? '#ff8c00' : '#e5e7eb')};
    background: ${({ $active }) => ($active ? '#fff4e8' : '#fff')};
    color: ${({ $active }) => ($active ? '#e07800' : '#6b7280')};
    font-size: 12.5px;
    font-weight: ${({ $active }) => ($active ? '600' : '500')};
    cursor: pointer;
    white-space: nowrap;
    transition: all .12s;
    font-family: inherit;
    letter-spacing: 0;
    text-transform: none;

    &:hover {
        border-color: #ff8c00;
        color: #e07800;
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
    cursor: default;
    &:hover { background: #fafbff; }
    &:not(:last-child) td { border-bottom: 1px solid #f9fafb; }
`;
const Td = styled.td`
    padding: 14px 20px;
    color: #374151;
    vertical-align: middle;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const Avatar = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff8c00, #ffb347);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    color: #fff;
    flex-shrink: 0;
    overflow: hidden;
`;
const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const UserName = styled.p`
    font-weight: 600;
    color: #111827;
    font-size: 13px;
    line-height: 1.3;
`;
const UserEmail = styled.p`
    font-size: 11.5px;
    color: #9ca3af;
    margin-top: 1px;
`;

const Chip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    white-space: nowrap;

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

    &:hover:not(:disabled) { border-color: #ff8c00; color: ${({ $active }) => ($active ? '#fff' : '#e07800')}; }
    &:disabled { opacity: .4; cursor: not-allowed; }
`;

/* ── Mock data ───────────────────────────────────────────── */
const MOCK = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    nickname: ['김따숨', '이선물', '박육아', '최아기', '정따뜻'][i % 5] + (i > 4 ? i : ''),
    email: `user${i + 1}@example.com`,
    phone: i % 3 === 0 ? `010-${1000 + i}-${2000 + i}` : null,
    loginProvider: i % 4 === 0 ? 'KAKAO' : 'LOCAL',
    createdAt: new Date(2026, 0, i + 1).toLocaleDateString('ko-KR'),
    deletedAt: i % 8 === 0 ? '2026. 6. 1.' : null,
    profileImage: null,
}));

const PAGE_SIZE = 10;
const FILTERS = [
    { label: '전체', value: 'all' },
    { label: '활성', value: 'active' },
    { label: '탈퇴', value: 'deleted' },
    { label: '카카오', value: 'KAKAO' },
    { label: '일반', value: 'LOCAL' },
];

const AdminUserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(0);

    useEffect(() => {
        setLoading(true);
        // TODO: axiosInstance.get('/api/admin/users', { params: { page, size: PAGE_SIZE } })
        setTimeout(() => { setUsers(MOCK); setLoading(false); }, 350);
    }, []);

    const filtered = users.filter((u) => {
        const s = search.toLowerCase();
        const matchSearch = !s || u.nickname.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
        const matchFilter =
            filter === 'all' ||
            (filter === 'active' && !u.deletedAt) ||
            (filter === 'deleted' && !!u.deletedAt) ||
            u.loginProvider === filter;
        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const onSearch = useCallback((e) => { setSearch(e.target.value); setPage(0); }, []);
    const onFilter = useCallback((v) => { setFilter(v); setPage(0); }, []);

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
                    <CountBadge>총 {filtered.length}명</CountBadge>
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
                        ) : paged.length === 0 ? (
                            <tr><EmptyCell colSpan={5}>검색 결과가 없습니다.</EmptyCell></tr>
                        ) : paged.map((u) => (
                            <Tr key={u.id}>
                                <Td>
                                    <UserInfo>
                                        <Avatar>
                                            {u.profileImage
                                                ? <AvatarImg src={u.profileImage} alt="" />
                                                : u.nickname.charAt(0)}
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
                                <Td><Chip $v={u.loginProvider}>{u.loginProvider === 'KAKAO' ? '카카오' : '일반'}</Chip></Td>
                                <Td style={{ color: '#6b7280', fontSize: 12 }}>{u.createdAt}</Td>
                                <Td>
                                    <Chip $v={u.deletedAt ? 'deleted' : 'active'}>
                                        {u.deletedAt ? `탈퇴` : '활성'}
                                    </Chip>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationInfo>
                            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} / {filtered.length}명
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

export default AdminUserListPage;
