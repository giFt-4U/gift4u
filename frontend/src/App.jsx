// App.jsx

import Nav from './components/layout/Nav';
import GlobalStyle from './styles/GlobalStyle';
import { MainContent, MobileContainer } from './styles/AppLayout';
import { Outlet, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  // 장바구니 페이지와 주문 페이지에서는 MainContent padding 제거
  const isCartPage =
    location.pathname === '/cart' ||
    location.pathname === '/order';

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
