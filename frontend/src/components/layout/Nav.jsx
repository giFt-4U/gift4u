import React from 'react';
import { Link } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';

const Nav = () => {
    return (

        <NavWrapper>

            <div className='nav-left'>

                <img
                    src="/assets/icons/search.png"
                    alt='검색'
                />

            </div>

            <h1>

                <Link to="/">
                    따숨품
                </Link>

            </h1>

            <div className='nav-right'>

                <img
                    src="/assets/icons/bell.png"
                    alt='알림'
                />

                <img
                    src="/assets/icons/user.png"
                    alt='유저'
                />

            </div>

        </NavWrapper>
    );
};

export default Nav;