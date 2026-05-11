import { useState } from 'react'
import Nav from './components/layout/Nav'
import Home from './pages/Home'
import GlobalStyle from './styles/GlobalStyle'
import { MainContent, MobileContainer } from './styles/AppLayout'

function App() {

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