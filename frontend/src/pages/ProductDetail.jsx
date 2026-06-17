//ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import useAuthStore from '../store/authStore';

import {
    DetailWrapper,
    ImageArea,
    ProductInfoArea,
    ProductTitleRow,
    BuyBox,
    DescArea,
    ShareTrigger,
} from '../styles/ProductDetailStyle';

import HeartButton from '../components/common/HeartButton';
import ShareModal from '../components/common/ShareModal';
import { addToCart } from '../utils/Cart';
import {
    buildProductShareUrl,
    getProductImageUrl,
} from '../utils/shareUtils';

const ShareArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="17" cy="7" r="2.2" />
        <circle cx="17" cy="17" r="2.2" />
        <path d="M8.2 11.1 14.8 8.2" strokeLinecap="round" />
        <path d="M8.2 12.9 14.8 15.8" strokeLinecap="round" />
    </svg>
);

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const [product, setProduct] = useState(null);
    const [shareOpen, setShareOpen] = useState(false);

    useEffect(() => {
        axiosInstance
            .get(`/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((error) => console.error('상품 상세 조회 실패:', error));
    }, [id]);

    const handleCartClick = () => {
        if (!localStorage.getItem('token')) {
            alert('로그인 후 장바구니를 이용할 수 있습니다.');
            return;
        }
        addToCart(product);
        alert('장바구니에 담겼습니다.');
    };

    const handleGiftClick = () => {
        if (!localStorage.getItem('token')) {
            alert('로그인 후 선물하기를 이용할 수 있습니다.');
            return;
        }
        localStorage.setItem('orderItems', JSON.stringify([{ ...product, quantity: 1 }]));
        navigate('/order');
    };

    if (!product) return <div>로딩중...</div>;

    const brandName = product.brandName || product.brand_name;
    const imageSrc = product.imageUrl || product.image_url || '/images/default.png';
    const friendCode = user?.friendCode;
    const shareUrl = buildProductShareUrl(id, friendCode);
    const shareImageUrl = getProductImageUrl(product);

    return (
        <DetailWrapper>
            <ImageArea>
                <HeartButton product={product} />
                <img
                    src={imageSrc}
                    alt={product.name}
                    onError={(e) => { e.target.src = '/images/default.png'; }}
                />
            </ImageArea>

            <ProductInfoArea>
                {brandName && <p className="product-brand">{brandName}</p>}
                <ProductTitleRow>
                    <h2 className="product-name">{product.name}</h2>
                    <ShareTrigger type="button" onClick={() => setShareOpen(true)} aria-label="공유하기">
                        <ShareArrowIcon />
                        공유
                    </ShareTrigger>
                </ProductTitleRow>
                <p className="product-price">{product.price?.toLocaleString()}원</p>
            </ProductInfoArea>

            <BuyBox>
                <button type="button" className="cart-button" onClick={handleCartClick}>
                    장바구니 담기
                </button>
                <button type="button" className="gift-button" onClick={handleGiftClick}>
                    선물하기
                </button>
            </BuyBox>

            <DescArea>
                <h3>상품 상세 설명</h3>
                <p>{product.description}</p>
            </DescArea>

            <ShareModal
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                shareUrl={shareUrl}
                kakao={{
                    title: product.name,
                    description: `${product.price?.toLocaleString()}원`,
                    imageUrl: shareImageUrl,
                    buttonTitle: '따숨품에서 보기',
                }}
                smsText={`[따숨품] ${product.name} ${product.price?.toLocaleString()}원\n${shareUrl}`}
            />
        </DetailWrapper>
    );
};

export default ProductDetail;
