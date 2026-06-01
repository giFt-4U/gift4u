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

                <Route
                    path="/"
                    element={<App />}
                >

                    <Route
                        index
                        element={<Home />}
                    />

                    <Route
                        path="products"
                        element={<ProductPage />}
                    />

                    <Route
                        path="products/:id"
                        element={<ProductDetail />}
                    />

                    <Route
                        path="search"
                        element={<SearchPage />}
                    />
                    <Route
                        path="cart"
                        element={<CartPage />}
                    />


                </Route>

            </Routes>

        </BrowserRouter>
    );
}