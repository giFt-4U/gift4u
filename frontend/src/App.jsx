// App.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/layout/Nav';
import {
  AppWrapper,
  LeftSection,
  MobileContainer,
  MainContent,
} from './styles/AppLayout';

function App() {
  const location = useLocation();
  const path = location.pathname;

  // 좌우 padding 제거가 필요한 페이지
  const isNoPaddingPage = path === '/cart' || path === '/order';

  // 주문 페이지는 자체 상단바를 사용하므로 공통 Nav 숨김
  const isOrderPage = path === '/order';

  return (
    <AppWrapper>
      <LeftSection>
        <img
          src={`${import.meta.env.BASE_URL}assets/logo/intro.svg`}
          alt="따숨품 로고 및 소개글"
        />
      </LeftSection>

      <MobileContainer>
        {!isOrderPage && <Nav />}

        <MainContent
          $noPadding={isNoPaddingPage}
          $noTopPadding={isOrderPage}
        >
          <Outlet />
        </MainContent>
      </MobileContainer>
    </AppWrapper>
  );
}

export default App;