import { useState } from 'react'
import Nav from './components/layout/Nav'
import Home from './pages/Home'
import GlobalStyle from './styles/GlobalStyle'
import { MainContent, MobileContainer } from './styles/AppLayout'

// 라우터 설정 파일
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GlobalStyle />
      <MobileContainer>
        <Nav />
        <MainContent>
          <Home />
        </MainContent>
      </MobileContainer>
    </>
  )
}

export default App