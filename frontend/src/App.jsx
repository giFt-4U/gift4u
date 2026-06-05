// App.jsx

import Nav from './components/layout/Nav';
import GlobalStyle from './styles/GlobalStyle';
import { MainContent, MobileContainer } from './styles/AppLayout';
import { Outlet, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  // 전체 너비 구분선이 필요한 페이지는 MainContent padding 제거
  const isCartPage =
    location.pathname === '/cart' ||
    location.pathname === '/order' ||
    location.pathname === '/mypage' ||
    location.pathname === '/friends';

  // 주문 페이지는 자체 상단바를 사용하므로 공통 Nav 숨김
  const isOrderPage = location.pathname === '/order';


  return (
    <>
      <GlobalStyle />
      
      <MobileContainer>


        {!isOrderPage && <Nav />}

        <MainContent $noPadding={isCartPage}>


          <Outlet />
        </MainContent>
      </MobileContainer>
    </>
  );
}

export default App;
