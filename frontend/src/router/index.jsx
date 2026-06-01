//index.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import ProductDetail from '../pages/ProductDetail';
import SearchPage from '../pages/SearchPage';
import CartPage from '../pages/CartPage';

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

                    {/* SEARCH */}
                    <Route path="search" element={<SearchPage />} />


                </Route>

            </Routes>

        </BrowserRouter>
    );
}