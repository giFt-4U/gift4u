//index.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import ProductDetail from '../pages/ProductDetail';
import SearchPage from '../pages/SearchPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import KakaoCallbackPage from '../pages/KakaoCallbackPage';

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />


                    {/* PRODUCT */}
                    <Route path="products" element={<ProductPage />} />
                    <Route path="products/:id" element={<ProductDetail />} />


                    {/* CHAT / GIFT — import·컴포넌트 미완성이라 임시 주석 (팀 lane 작업 후 해제) */}
                    {/* <Route path='chat' element={<ChatList />} /> */}
                    {/* <Route path='chat/add' element={<ChatAddFriend />} /> */}
                    {/* <Route path='chat/:roomId' element={<ChatRoom />} /> */}
                    {/* <Route path='gifts/card' element={<GiftCard />} /> */}
                    {/* <Route path='gifts/card/preview' element={<GiftCardView />} /> */}
                    {/* <Route path='gifts/:uuid' element={<GiftCardView />} /> */}
                    {/* <Route path='gifts/:uuid/address' element={<GiftAddress />} /> */}
                    {/* <Route path='gifts/:uuid/accept' element={<GiftAccept />} /> */}

                    {/* AUTH */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="kakao/auth-code" element={<KakaoCallbackPage />} />

                    {/* SEARCH */}
                    <Route path="search" element={<SearchPage />} />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}