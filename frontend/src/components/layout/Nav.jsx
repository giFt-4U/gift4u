// Nav.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isProductPage = location.pathname === '/products';

    return (
        <NavWrapper>

            {/* LEFT */}
            <div className='nav-left'>

                {isProductPage ? (
                    <img
                        src="/assets/icons/back.png"
                        alt='뒤로가기'
                        onClick={() => navigate(-1)}
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <img
                        src="/assets/icons/search.png"
                        alt='검색'
                        style={{ cursor: 'pointer' }}
                    />
                )}

            </div>

            {/* CENTER LOGO */}
            <h1>
                <Link to="/" className="logo">
                    따숨품
                </Link>
            </h1>

            {/* RIGHT */}
            <div className='nav-right'>

                {isProductPage ? (
                    <img
                        src="/assets/icons/shopping_cart.png"
                        alt="장바구니"
                        onClick={() => navigate('/cart')}
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <>
                        <img
                            src="/assets/icons/bell.png"
                            alt='알림'
                            style={{ cursor: 'pointer' }}
                        />

                        <img
                            src="/assets/icons/user.png"
                            alt='유저'
                            style={{ cursor: 'pointer' }}
                        />
                    </>
                )}

            </div>

        </NavWrapper>
    );
};

export default Nav;