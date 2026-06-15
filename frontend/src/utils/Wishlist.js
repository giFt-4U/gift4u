// Wishlist.js

import axiosInstance from "../api/axiosInstance";

const isLogin = () => {
    return !!localStorage.getItem("token");
};

// 위시리스트 목록 가져오기
export const getWishlistItems = async () => {
    if (!isLogin()) {
        return [];
    }

    const res = await axiosInstance.get("/api/wishlist/me");

    const data = res.data;

    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.data)) {
        return data.data;
    }

    if (Array.isArray(data?.content)) {
        return data.content;
    }

    return [];
};

// 위시리스트에 상품 추가
export const addToWishlist = async (product) => {
    if (!isLogin()) {
        alert("로그인 후 위시리스트를 이용할 수 있습니다.");
        return false;
    }

    await axiosInstance.post(
        `/api/wishlist/products/${product.id}`
    );

    return true;
};

// 위시리스트에서 상품 삭제
export const removeFromWishlist = async (productId) => {
    if (!isLogin()) {
        return false;
    }

    await axiosInstance.delete(
        `/api/wishlist/products/${productId}`
    );

    return true;
};

// 위시리스트에 이미 담겼는지 확인
export const isInWishlist = async (productId) => {
    try {
        if (!isLogin()) {
            return false;
        }

        const wishlistItems = await getWishlistItems();

        return wishlistItems.some(
            item => Number(item.id) === Number(productId)
        );
    } catch (error) {
        console.error("위시리스트 여부 확인 실패:", error);
        return false;
    }
};

// 친구 위시리스트 목록 가져오기
export const getFriendWishlistItems = async (friendCode) => {
    if (!friendCode) {
        return [];
    }

    const res = await axiosInstance.get(`/api/wishlist/friends/${friendCode}`);

    const data = res.data;

    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.data)) {
        return data.data;
    }

    if (Array.isArray(data?.content)) {
        return data.content;
    }

    return [];
};