// Nav.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';

const Nav = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;

    // 상품 목록 페이지
    const isProduct = path === '/products';

    // 장바구니 페이지
    const isCart = path === '/cart';

    return (

        <NavWrapper>

            {/* 왼쪽 영역 */}
            <div className='nav-left'>

                {/* 상품페이지와 장바구니 페이지는 뒤로가기 아이콘 사용 */}
                {(isProduct || isCart) ? (

                    <img
                        src="/assets/icons/back.png"
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}
                    />

                ) : (

                    // 메인 / 상세 / 검색 계열은 검색 아이콘 사용
                    <img
                        src="/assets/icons/search.png"
                        alt="검색"
                        onClick={() => navigate('/search')}
                    />

                )}

            </div>

            {/* 중앙 로고 */}
            <h1>
                <Link
                    to="/"
                    className='logo'
                >
                    따숨품
                </Link>
            </h1>

            {/* 오른쪽 영역 */}
            <div className='nav-right'>

                {isCart ? (

                    // 장바구니 페이지는 오른쪽을 비워두되, 정렬을 위해 공간만 확보
                    <div className='empty-space' />

                ) : isProduct ? (

                    // 상품 목록 페이지는 장바구니 아이콘
                    <img
                        src="/assets/icons/shopping_cart.png"
                        alt="장바구니"
                        onClick={() => navigate('/cart')}
                    />

                ) : (

                    // 메인 / 상품상세 페이지는 알림 + 유저 아이콘
                    <>
                        <img
                            src="/assets/icons/bell.png"
                            alt="알림"
                        />

                        <img
                            src="/assets/icons/user.png"
                            alt="유저"
                        />
                    </>

                )}

            </div>

        </NavWrapper>
    );
};

export default Nav;