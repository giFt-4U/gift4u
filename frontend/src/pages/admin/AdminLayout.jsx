import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../../store/authStore';

/* ── icons (inline SVG, no deps) ────────────────────────── */
const IconGrid = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
);
const IconUsers = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" /><path d="M2 21v-1a7 7 0 0 1 14 0v1" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M22 21v-1a4 4 0 0 0-3-3.87" />
    </svg>
);
const IconBox = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);
const IconLogout = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
const IconChevron = ({ open }) => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform .2s' }}>
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

/* ── Layout ───────────────────────────────────────────────── */
const Shell = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    background: #f4f5f7;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;
    letter-spacing: 0;
    text-transform: none;
    font-size: 14px;
    color: #111827;
    position: fixed;
    inset: 0;
    overflow: auto;
`;

/* ── Sidebar ──────────────────────────────────────────────── */
const Sidebar = styled.nav`
    width: ${({ $open }) => ($open ? '232px' : '60px')};
    min-height: 100vh;
    background: #fff;
    border-right: 1px solid #e8eaed;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width .22s cubic-bezier(.4,0,.2,1);
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 200;
`;

const SidebarHeader = styled.div`
    height: 56px;
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0 14px;
    border-bottom: 1px solid #f0f0f0;
    flex-shrink: 0;
`;

const BrandMark = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: linear-gradient(135deg, #ff8c00, #ffb347);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    font-family: 'Mbc1961', sans-serif;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
`;

const BrandLabel = styled.div`
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    width: ${({ $open }) => ($open ? '140px' : '0')};
    transition: opacity .15s, width .22s;
`;

const BrandName = styled.p`
    font-size: 13.5px;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
`;

const BrandSub = styled.p`
    font-size: 10.5px;
    color: #9ca3af;
    margin-top: 1px;
`;

const SidebarBody = styled.div`
    flex: 1;
    padding: 8px 8px;
    overflow-y: auto;
    overflow-x: hidden;
`;

const NavSection = styled.div`
    margin-bottom: 4px;
`;

const NavSectionLabel = styled.p`
    font-size: 10px;
    font-weight: 600;
    color: #9ca3af;
    letter-spacing: .8px;
    text-transform: uppercase;
    padding: 10px 8px 4px;
    white-space: nowrap;
    overflow: hidden;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    height: ${({ $open }) => ($open ? 'auto' : '0')};
    transition: opacity .1s;
`;

const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    color: #6b7280;
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    white-space: nowrap;
    transition: background .12s, color .12s;
    position: relative;

    svg { flex-shrink: 0; }

    span {
        overflow: hidden;
        opacity: ${({ $open }) => ($open ? 1 : 0)};
        transition: opacity .1s;
    }

    &:hover {
        background: #f9fafb;
        color: #111827;
    }

    &.active {
        background: #fff4e8;
        color: #e07800;
        font-weight: 600;

        svg { color: #e07800; }
    }
`;

const SidebarFooter = styled.div`
    padding: 8px;
    border-top: 1px solid #f0f0f0;
`;

const LogoutBtn = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 0;
    background: transparent;
    color: #9ca3af;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background .12s, color .12s;

    svg { flex-shrink: 0; }

    span {
        overflow: hidden;
        opacity: ${({ $open }) => ($open ? 1 : 0)};
        transition: opacity .1s;
    }

    &:hover {
        background: #fff1f0;
        color: #dc2626;
    }
`;

/* ── Main ─────────────────────────────────────────────────── */
const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 100vh;
`;

const TopBar = styled.header`
    height: 56px;
    background: #fff;
    border-bottom: 1px solid #e8eaed;
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 12px;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 100;
`;

const ToggleBtn = styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background .12s;

    &:hover { background: #f3f4f6; }
`;

const TopBarBreadcrumb = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    flex: 1;
`;

const AdminChip = styled.span`
    padding: 4px 10px;
    border-radius: 6px;
    background: #fff4e8;
    color: #e07800;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .3px;
`;

const Content = styled.main`
    flex: 1;
    padding: 28px 32px;
    max-width: 1280px;
`;

/* ── Component ────────────────────────────────────────────── */
const AdminLayout = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const { clearToken } = useAuthStore();

    const onLogout = () => {
        clearToken();
        navigate('/login');
    };

    return (
        <Shell>
            <Sidebar $open={open}>
                <SidebarHeader>
                    <BrandMark onClick={() => setOpen(v => !v)}>따</BrandMark>
                    <BrandLabel $open={open}>
                        <BrandName>따숨품 Admin</BrandName>
                        <BrandSub>관리자 콘솔</BrandSub>
                    </BrandLabel>
                </SidebarHeader>

                <SidebarBody>
                    <NavSection>
                        <NavSectionLabel $open={open}>Overview</NavSectionLabel>
                        <NavItem to="/admin" end $open={open}>
                            <IconGrid /><span>대시보드</span>
                        </NavItem>
                    </NavSection>

                    <NavSection>
                        <NavSectionLabel $open={open}>Management</NavSectionLabel>
                        <NavItem to="/admin/users" $open={open}>
                            <IconUsers /><span>회원 관리</span>
                        </NavItem>
                        <NavItem to="/admin/products" $open={open}>
                            <IconBox /><span>상품 관리</span>
                        </NavItem>
                    </NavSection>
                </SidebarBody>

                <SidebarFooter>
                    <LogoutBtn onClick={onLogout} $open={open}>
                        <IconLogout /><span>로그아웃</span>
                    </LogoutBtn>
                </SidebarFooter>
            </Sidebar>

            <Main>
                <TopBar>
                    <ToggleBtn onClick={() => setOpen(v => !v)}>
                        <IconChevron open={open} />
                    </ToggleBtn>
                    <TopBarBreadcrumb>따숨품 관리자</TopBarBreadcrumb>
                    <AdminChip>Admin</AdminChip>
                </TopBar>
                <Content>
                    <Outlet />
                </Content>
            </Main>
        </Shell>
    );
};

export default AdminLayout;
