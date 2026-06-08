// Nav.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';
import useAuthStore from '../../store/authStore';

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuthStore();

    const path = location.pathname;

    // 상품 페이지
    const isProduct = path === '/products';

    // 상품 상세 페이지
    const isProductDetail = path.startsWith('/products/');

    // 검색 페이지
    const isSearch = path === '/search';

    // 장바구니 페이지
    const isCart = path === '/cart';

    // 위시리스트 페이지
    const isWishlist = path === '/wishlist';

    // 로그인 / 회원가입 페이지
    const isAuthPage = ['/login', '/signup'].includes(path);

    // 채팅 목록 페이지
    const isChatList = path === '/chat';

    // 채팅 관련 페이지
    const isChatPage = path.startsWith('/chat');

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleWishlistClick = () => {
        navigate('/wishlist');
    };

    const handleUserClick = () => {
        navigate(token ? '/mypage' : '/login');
    };

    const shouldShowBackButton =
        isProduct ||
        isProductDetail ||
        isSearch ||
        isCart ||
        isWishlist ||
        isChatPage ||
        isAuthPage;

    return (
        <NavWrapper>
            {/* 왼쪽 영역 */}
            <div className='nav-left'>
                {isChatList ? (
                    <button
                        type="button"
                        className="plus-button"
                        onClick={() => navigate('/chat/add')}
                        aria-label="친구 추가"
                    >
                        +
                    </button>
                ) : shouldShowBackButton ? (
                    <img
                        src="/assets/icons/back.png"
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}
                    />
                ) : (
                    <img
                        src="/assets/icons/search.png"
                        alt="검색"
                        onClick={() => navigate('/search')}
                    />
                )}
            </div>

            {/* 중앙 로고 */}
            <h1>
                <Link to="/" className='logo' aria-label="따숨품 홈으로 이동">
                    <img
                        src="/assets/logo/dasumpum_logo.png"
                        alt="따숨품"
                        className="logo-image"
                    />
                </Link>
            </h1>

            {/* 오른쪽 영역 */}
            <div className='nav-right'>
                {isCart ? (
                    <div className="empty-space" />
                ) : (
                    <>
                        <img
                            src="/assets/icons/user.png"
                            alt="유저"
                            onClick={handleUserClick}
                        />

                        <img
                            src="/assets/icons/heart.png"
                            alt="위시리스트"
                            onClick={handleWishlistClick}
                        />

                        <img
                            src="/assets/icons/shopping_cart.png"
                            alt="장바구니"
                            onClick={handleCartClick}
                        />
                    </>
                )}
            </div>
        </NavWrapper>
    );
};

export default Nav;