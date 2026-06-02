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

    // 상품 상세 페이지
    const isProductDetail = path.startsWith('/products/');

    // 장바구니 페이지
    const isCart = path === '/cart';

    // 위시리스트 페이지
    const isWishlist = path === '/wishlist';

    return (

        <NavWrapper>

            {/* 왼쪽 영역 */}
            <div className='nav-left'>

                {/* 
                    상품페이지 / 상품상세페이지 / 장바구니 / 위시리스트는
                    이전 페이지로 돌아갈 수 있도록 뒤로가기 아이콘 사용
                */}
                {(isProduct || isProductDetail || isCart || isWishlist) ? (

                    <img
                        src="/assets/icons/back.png"
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}
                    />

                ) : (

                    // 메인 / 검색 계열은 검색 아이콘 사용
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

                    // 장바구니 페이지는 오른쪽 공백
                    <div className='empty-space' />

                ) : (isProduct || isProductDetail || isWishlist) ? (

                    // 상품 목록 / 상품 상세 / 위시리스트 페이지는 장바구니 아이콘
                    <img
                        src="/assets/icons/shopping_cart.png"
                        alt="장바구니"
                        onClick={() => navigate('/cart')}
                    />

                ) : (

                    // 메인 / 검색 페이지는 알림 + 유저 아이콘
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