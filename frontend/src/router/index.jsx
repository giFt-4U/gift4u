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

<<<<<<< HEAD
=======
// CHAT
import ChatList from '../pages/chat/ChatList';
import ChatAddFriend from '../pages/chat/ChatAddFriend';
import ChatRoom from '../pages/chat/ChatRoom';

// GIFT
import GiftCard from '../pages/gift/GiftCard';
import GiftCardView from '../pages/gift/GiftCardView';
import GiftAddress from '../pages/gift/GiftAddress';
import GiftAccept from '../pages/gift/GiftAccept';
>>>>>>> refs/heads/feature-jeawon02

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />

                    {/* PRODUCT */}
                    <Route path="products" element={<ProductPage />} />
                    <Route path="products/:id" element={<ProductDetail />} />

                    {/* SEARCH */}
                    <Route path="search" element={<SearchPage />} />

                    {/* CART / ORDER / WISHLIST */}
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />

                    {/* CHAT */}
                    <Route path="chat" element={<ChatList />} />
                    <Route path="chat/add" element={<ChatAddFriend />} />
                    <Route path="chat/:roomId" element={<ChatRoom />} />

                    {/* GIFT */}
                    <Route path="gifts/card" element={<GiftCard />} />
                    <Route path="gifts/card/preview" element={<GiftCardView />} />
                    <Route path="gifts/:uuid" element={<GiftCardView />} />
                    <Route path="gifts/:uuid/address" element={<GiftAddress />} />
                    <Route path="gifts/:uuid/accept" element={<GiftAccept />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}