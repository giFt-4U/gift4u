import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { ProductGrid } from '../styles/HomeStyle';

const Home = () => {

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const dummyData = [
            {
                id: 1,
                prdImg: "https://via.placeholder.com/150",
                brandName: "F4",
                prdName: "기프트 세트",
                prdPrice: 30000
            },
            {
                id: 2,
                prdImg: "https://via.placeholder.com/150",
                brandName: "gift4u",
                prdName: "애착인형",
                prdPrice: 15000
            },
            {
                id: 3,
                prdImg: "https://via.placeholder.com/150",
                brandName: "gift4u",
                prdName: "애착인형",
                prdPrice: 15000
            },
            {
                id: 4,
                prdImg: "https://via.placeholder.com/150",
                brandName: "gift4u",
                prdName: "애착인형",
                prdPrice: 15000
            },
            {
                id: 5,
                prdImg: "https://via.placeholder.com/150",
                brandName: "gift4u",
                prdName: "애착인형",
                prdPrice: 15000
            },
            {
                id: 6,
                prdImg: "https://via.placeholder.com/150",
                brandName: "gift4u",
                prdName: "애착인형",
                prdPrice: 15000
            }
        ];
        setProductList(dummyData);
    }, []);

    return (
        <div className='home-container' style={{ padding: '0 20px' }}>
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