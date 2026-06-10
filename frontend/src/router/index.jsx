// index.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';

import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import ProductDetail from '../pages/ProductDetail';
import SearchPage from '../pages/SearchPage';

import CartPage from '../pages/CartPage';
import OrderPage from '../pages/OrderPage';
import WishlistPage from '../pages/WishlistPage';

import ChatAddFriend from '../pages/chat/ChatAddFriend';
import ChatList from '../pages/chat/ChatList';
import ChatRoom from '../pages/chat/ChatRoom';

import GiftCard from '../pages/gift/GiftCard';
import GiftCardView from '../pages/gift/GiftCardView';
import GiftAddress from '../pages/gift/GiftAddress';
import GiftAccept from '../pages/gift/GiftAccept';
import FriendsSelect from '../pages/friend/FriendsSelect';

import FriendRequestList from '../pages/friend/FriendRequstList';

import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';
import KakaoCallbackPage from '../pages/user/KakaoCallbackPage';
import MyPage from '../pages/user/MyPage';
import MyPageEdit from '../pages/user/MyPageEdit';
import FriendsPage from '../pages/user/FriendsPage';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />

                    {/* PRODUCT */}
                    <Route path="products" element={<ProductPage />} />
                    <Route path="products/:id" element={<ProductDetail />} />

                    {/* CART / ORDER / WISHLIST */}
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />

                    {/* CHAT */}
                    <Route path="chat/add" element={<ChatAddFriend />} />
                    <Route path="chat" element={<ChatList />} />
                    <Route path="chat/:roomId" element={<ChatRoom />} />

                    {/* GIFT */}
                    <Route path="gifts/card" element={<GiftCard />} />
                    <Route path="gifts/card/preview" element={<GiftCardView />} />
                    <Route path="gifts/:uuid/address" element={<GiftAddress />} />
                    <Route path="gifts/:uuid/accept" element={<GiftAccept />} />
                    <Route path="gifts/:uuid" element={<GiftCardView />} />

                    {/* AUTH */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="kakao/auth-code" element={<KakaoCallbackPage />} />
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="mypage/edit" element={<MyPageEdit />} />
                    <Route path="friends" element={<FriendsPage />} />

                    {/* FRIEND */}
                    <Route path="friends/requestlist" element={<FriendRequestList />} />
                    <Route path="/friends/select" element={<FriendsSelect />} />

                    {/* SEARCH */}
                    <Route path="search" element={<SearchPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}