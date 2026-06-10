import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavWrapper } from '../../styles/AppLayout';
import useAuthStore from '../../store/authStore';

const BackHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuthStore();

    const path = location.pathname;


    return (
        <NavWrapper>
            <img
                src="/assets/icons/back.png"
                alt="뒤로가기"
                onClick={() => navigate(-1)}
            />

            <h1>
                <Link to="/" className='logo' aria-label="따숨품 홈으로 이동">
                    <img
                        src="/assets/logo/dasumpum_logo.png"
                        alt="따숨품"
                        style={{
                            width: "104px",
                            height: "56px",
                            objectFit: "contain",
                            display: "block",
                        }}
                    />
                </Link>
            </h1>
            <div style={{ width: '24px' }} />

        </NavWrapper>
    );
};

export default BackHeader;
