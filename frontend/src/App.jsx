// App.jsx

import Nav from './components/layout/Nav';
import GlobalStyle from './styles/GlobalStyle';
import { MainContent, MobileContainer } from './styles/AppLayout';
import { Outlet, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  // 장바구니 페이지에서는 MainContent padding을 제거하기 위한 조건
  const isCartPage = location.pathname === '/cart';

  return (
    <>
      <GlobalStyle />

      <MobileContainer>

        {/* 모든 페이지에서 공통으로 사용하는 상단 Nav */}
        <Nav />

        {/* 장바구니 페이지는 피그마 UI처럼 내부에서 직접 여백을 관리 */}
        <MainContent $noPadding={isCartPage}>

          <Outlet />

        </MainContent>

      </MobileContainer>
    </>
  );
}

export default App;