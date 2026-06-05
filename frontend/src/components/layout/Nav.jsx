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
    //상품 페이지
    const isProduct = path === '/products';
    
    //상품 상세 페이지
    const isProductDetail = path.startsWith('/products/');
    
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

    const handleUserClick = () => {
        navigate(token ? '/mypage' : '/login');
    };

    return (
        <NavWrapper>
            {/* 왼쪽 영역 */}
            <div className='nav-left'>
                {isChatList ? (
                    // /chat 페이지에서는 돋보기 대신 + 버튼
                    <button
                        type="button"
                        className="plus-button"
                        onClick={() => navigate('/chat/add')}
                        aria-label="친구 추가"
                    >
                        +
                    </button>
                ) : (isProduct || isProductDetail || isCart || isWishlist || isChatPage || isAuthPage) ? (
                    // 상품 / 장바구니 / 위시리스트 / 채팅 관련 / 로그인 / 회원가입 페이지는 뒤로가기
                    <img
                        src="/assets/icons/back.png"
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}
                    />
                ) : (
                    // 기본 페이지는 검색 아이콘
                    <img
                        src="/assets/icons/search.png"
                        alt="검색"
                        onClick={() => navigate('/search')}
                    />
                )}
            </div>

            {/* 중앙 로고 */}
            <h1>
                <Link to="/" className='logo'>
                    따숨품
                </Link>
            </h1>

            {/* 오른쪽 영역 */}
            <div className='nav-right'>
                {isCart ? (
                    // 장바구니 페이지에서는 오른쪽 공백 처리
                    <div className="empty-space" />
                ) : (
                    <>
                        <img
                            src="/assets/icons/user.png"
                            alt="유저"
                            style={{ cursor: 'pointer' }}
                            onClick={handleUserClick}
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