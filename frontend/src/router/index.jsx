//index.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import ProductDetail from '../pages/ProductDetail';
import SearchPage from '../pages/SearchPage';
import CartPage from '../pages/CartPage';
import OrderPage from '../pages/OrderPage';
import WishlistPage from '../pages/WishlistPage';

import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';
import KakaoCallbackPage from '../pages/user/KakaoCallbackPage';
import MyPage from '../pages/user/MyPage';


export default function Router() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />


                    {/* PRODUCT */}
                    <Route path="products" element={<ProductPage />} />
                    <Route path="products/:id" element={<ProductDetail />} />


                    {/* CHAT */}
                    <Route path='chat' element={<ChatList />} />
                    <Route path='chat/add' element={<ChatAddFriend />} />
                    <Route path='chat/:roomId' element={<ChatRoom />} />du


                    {/* GIFT */}
                    <Route path='gifts/card' element={<GiftCard />} />
                    <Route path='gifts/card/preview' element={<GiftCardView />} />
                    <Route path='gifts/:uuid' element={<GiftCardView />} /> {/* 받는 사람 링크 */}
                    <Route path='gifts/:uuid/address' element={<GiftAddress />} />
                    <Route path='gifts/:uuid/accept' element={<GiftAccept />} />

                    {/* AUTH */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="kakao/auth-code" element={<KakaoCallbackPage />} />
                    <Route path="mypage" element={<MyPage />} />

                    {/* SEARCH */}
                    <Route path="search" element={<SearchPage />} />


                </Route>

            </Routes>

        </BrowserRouter>
    );
}
