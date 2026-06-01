// Nav.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';

const Nav = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;

    const isHome =
        path === '/';

    const isProduct =
        path === '/products';

    const isDetail =
        path.includes('/products/');

    const isCart =
        path === '/cart';

    return (

        <NavWrapper>

            {/* LEFT */}
            <div className='nav-left'>

                {(isProduct || isCart) ? (

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

            {/* CENTER */}
            <h1>

                <Link
                    to="/"
                    className='logo'
                >
                    따숨품
                </Link>

            </h1>

            {/* RIGHT */}
            <div className='nav-right'>

                {isCart ? (

                    <div className='empty-space' />

                ) : isProduct ? (

                    <img
                        src="/assets/icons/shopping_cart.png"
                        alt="장바구니"
                        onClick={() => navigate('/cart')}
                    />

                ) : (

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