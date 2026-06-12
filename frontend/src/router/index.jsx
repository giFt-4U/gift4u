// index.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';

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
import ReceivedGifts from '../pages/gift/ReceivedGifts';
import PaymentCheckoutPage from '../pages/payment/PaymentCheckoutPage';
import PaymentSuccess from '../pages/payment/PaymentSuccess';

import FriendRequestList from '../pages/friend/FriendRequstList';

import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';
import KakaoCallbackPage from '../pages/user/KakaoCallbackPage';
import MyPage from '../pages/user/MyPage';
import MyPageEdit from '../pages/user/MyPageEdit';
import MyPagePassword from '../pages/user/MyPagePassword';
import MyPageWithdraw from '../pages/user/MyPageWithdraw';
import FriendsPage from '../pages/user/FriendsPage';

import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUserListPage from '../pages/admin/AdminUserListPage';
import AdminProductListPage from '../pages/admin/AdminProductListPage';

export default function Router() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <div style={{ width: '100%', minHeight: '100vh' }}>
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

                        {/* PAYMENT */}
                        <Route path="gifts/checkout" element={<PaymentCheckoutPage />} />
                        <Route path="gifts/success" element={<PaymentSuccess />} />

                        {/* AUTH */}
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                        <Route path="kakao/auth-code" element={<KakaoCallbackPage />} />
                        <Route path="mypage" element={<MyPage />} />
                        <Route path="mypage/edit" element={<MyPageEdit />} />
                        <Route path="mypage/password" element={<MyPagePassword />} />
                        <Route path="mypage/withdraw" element={<MyPageWithdraw />} />
                        <Route path="mypage/gifts" element={<ReceivedGifts />} />
                        <Route path="friends" element={<FriendsPage />} />

                        {/* FRIEND */}
                        <Route path="friends/requestlist" element={<FriendRequestList />} />
                        <Route path="/friends/select" element={<FriendsSelect />} />

                        {/* SEARCH */}
                        <Route path="search" element={<SearchPage />} />
                    </Route>

                    {/* ADMIN */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="users" element={<AdminUserListPage />} />
                        <Route path="products" element={<AdminProductListPage />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}