// AdminPage.jsx

import React, { useState } from 'react';
import {
    AdminWrapper,
    AdminTopBar,
    AdminBody,
    AdminSidebar,
    AdminMenuItem,
    AdminMain,
    AdminCard,
    CardTitle,
    UserCount,
    AdminTable,
    EmptyAdminBox,
    AdminButton,
} from '../../styles/AdminStyle';

const mockUsers = [
    {
        id: 1,
        nickname: '김광현',
        email: 'ABC@NAVER.COM',
        phone: '010-1234-1234',
        createdAt: '2026-06-12',
    },
    {
        id: 2,
        nickname: '김광현',
        email: 'ABC@NAVER.COM',
        phone: '010-1234-1234',
        createdAt: '2026-06-12',
    },
    {
        id: 3,
        nickname: '김광현',
        email: 'ABC@NAVER.COM',
        phone: '010-1234-1234',
        createdAt: '2026-06-12',
    },
];

const AdminPage = () => {
    const [activeMenu, setActiveMenu] = useState('users');

    const renderContent = () => {
        if (activeMenu === 'users') {
            return (
                <AdminCard>
                    <CardTitle>
                        전체 사용자 <UserCount>{mockUsers.length}</UserCount>명
                    </CardTitle>

                    <AdminTable>
                        <thead>
                            <tr>
                                <th></th>
                                <th>닉네임</th>
                                <th>이메일</th>
                                <th>연락처</th>
                                <th>가입일</th>
                            </tr>
                        </thead>

                        <tbody>
                            {mockUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{user.nickname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </AdminTable>
                </AdminCard>
            );
        }

        if (activeMenu === 'products') {
            return (
                <AdminCard>
                    <CardTitle>상품 관리</CardTitle>

                    <EmptyAdminBox>
                        <h3>상품 CRUD 기능 준비 중</h3>
                        <p>
                            추후 상품 등록, 수정, 삭제, 비활성화 기능을
                            관리자 페이지에서 관리할 수 있도록 확장할 예정입니다.
                        </p>

                        <AdminButton type="button" disabled>
                            상품 등록 예정
                        </AdminButton>
                    </EmptyAdminBox>
                </AdminCard>
            );
        }

        return (
            <AdminCard>
                <CardTitle>통계</CardTitle>

                <EmptyAdminBox>
                    <h3>통계 기능 준비 중</h3>
                    <p>
                        추후 상품 조회수, 주문 수, 인기 검색어, 매출 통계 등을
                        확인할 수 있도록 업데이트할 예정입니다.
                    </p>
                </EmptyAdminBox>
            </AdminCard>
        );
    };

    return (
        <AdminWrapper>
            <AdminTopBar>
                따숨품 관리자
            </AdminTopBar>

            <AdminBody>
                <AdminSidebar>
                    <AdminMenuItem
                        $active={activeMenu === 'users'}
                        onClick={() => setActiveMenu('users')}
                    >
                        사용자 관리
                    </AdminMenuItem>

                    <AdminMenuItem
                        $active={activeMenu === 'products'}
                        onClick={() => setActiveMenu('products')}
                    >
                        상품 관리
                    </AdminMenuItem>

                    <AdminMenuItem
                        $active={activeMenu === 'stats'}
                        onClick={() => setActiveMenu('stats')}
                    >
                        통계 [추후 업데이트 예정]
                    </AdminMenuItem>
                </AdminSidebar>

                <AdminMain>
                    {renderContent()}
                </AdminMain>
            </AdminBody>
        </AdminWrapper>
    );
};

export default AdminPage;