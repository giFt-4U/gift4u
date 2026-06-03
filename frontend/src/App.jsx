//App.jsx
import Nav from './components/layout/Nav'
import GlobalStyle from './styles/GlobalStyle'
import { MainContent, MobileContainer } from './styles/AppLayout'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <MobileContainer>
        <Nav />
        <MainContent>
          <Outlet />
        </MainContent>
      </MobileContainer>
    </>
  )
}

export default App;
