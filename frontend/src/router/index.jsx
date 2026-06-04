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


                </Route>
            </Routes>
        </BrowserRouter>
    );
}