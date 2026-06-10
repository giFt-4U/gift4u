// App.jsx

import Nav from './components/layout/Nav';
import BackHeader from './components/layout/BackHeader';
import GlobalStyle from './styles/GlobalStyle';
import { MainContent, MobileContainer } from './styles/AppLayout';
import { Outlet, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const path = location.pathname;

  // 전체 너비 구분선이 필요한 페이지는 MainContent padding 제거
  const isCartPage =
    path === '/cart' ||
    path === '/order' ||
    path === '/mypage';

  // 뒤로가기 헤더
  const isBackHeaderPage =
    path.startsWith('/chat/') ||
    path.startsWith('/gifts/') ||
    path === '/mypage/gifts' ||
    path === '/friends';

  // 주문 페이지는 자체 상단바를 사용하므로 공통 Nav 숨김
  const isOrderPage = location.pathname === '/order';


  return (
    <>
      <GlobalStyle />

      <MobileContainer>


        {!isOrderPage && !isBackHeaderPage && <Nav />}
        {isBackHeaderPage && <BackHeader />}

        <MainContent $noPadding={isCartPage}>


          <Outlet />
        </MainContent>
      </MobileContainer>
    </>
  );
}

export default App;
