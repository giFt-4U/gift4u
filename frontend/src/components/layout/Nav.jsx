// Nav.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';
import useAuthStore from '../../store/authStore';

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { token } = useAuthStore();

    const path = location.pathname;

    // 스크롤 노출 여부
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // 상품 페이지
    const isProduct = path === '/products';

    // 상품 상세 페이지
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

    const isMyPage = path === '/mypage' || path.startsWith('/mypage/');
    const isFriendsPage = path === '/friends' || path.startsWith('/friends/');

    // backHeader
    const getHeaderTitle = () => {
        if (path === '/mypage') return '마이페이지';
        if (path === '/mypage/edit') return '회원정보 수정';
        if (path === '/friends') return '친구 관리';
        if (path === '/friends/requestlist') return '친구 요청 목록';
        if (path === '/mypage/gifts') return '받은 선물함';
        if (isChatList) return '메시지';

        if (path.startsWith('/chat/') && roomId) {
            return location.state?.partnerName || '채팅방';
        }

        return null;
    };

    const titleText = getHeaderTitle();

    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 최상단 여백에서는 무조건 노출
            if (currentScrollY <= 10) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                setIsVisible(false); // 스크롤 내릴 때 숨김
            } else {
                setIsVisible(true);  // 스크롤 올릴 때 나타남
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleUserClick = () => {
        navigate(token ? '/mypage' : '/login');
    };

    return (
        <NavWrapper $isVisible={isVisible}>
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
                ) : (
                    isProduct || isProductDetail || isCart || isWishlist || isChatPage || isAuthPage || isMyPage || isFriendsPage
                ) ? (
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
            {/* 중앙 영역 */}
            <h1>
                {titleText ? (
                    <span
                        className="logo title-text"
                        style={{
                            color: '#333333',
                            cursor: 'default',
                            textDecoration: 'none',
                            userSelect: 'none'
                        }}
                    >
                        {titleText}
                    </span>
                ) : (
                    <Link to="/" className='logo' aria-label="따숨품 홈으로 이동">
                        따숨품
                    </Link>
                )}
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