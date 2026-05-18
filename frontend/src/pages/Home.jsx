import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { ProductGrid } from '../styles/HomeStyle';
import axiosInstance from '../api/axiosInstance';
import MainBanner from '../components/layout/MainBanner';

const Home = () => {

    const [productList, setProductList] = useState([]);

    useEffect(() => {

        axiosInstance
            .get("/api/products?page=0&size=10&sort=popular")
            .then((response) => {

                setProductList(response.data.content);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    return (
        <div className='home-container' style={{ padding: '0 20px' }}>

            <MainBanner />

            <h3>인기상품</h3>

            <div className='product-list-popular'>

                <ProductGrid>

                    {productList.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </ProductGrid>

            </div>

        </div>
    );
};

export default Home;