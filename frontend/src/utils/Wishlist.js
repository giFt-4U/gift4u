// Wishlist.js

import axiosInstance from "../api/axiosInstance";

let wishlistCache = null;
let wishlistRequest = null;
let cachedToken = null;

const getToken = () => {
    return localStorage.getItem("token");
};

const isLogin = () => {
    return !!getToken();
};

const resetWishlistCacheIfTokenChanged = () => {
    const token = getToken();

    if (cachedToken !== token) {
        wishlistCache = null;
        wishlistRequest = null;
        cachedToken = token;
    }

    return token;
};

const normalizeWishlistData = (data) => {
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

const getProductId = (item) => {
    return Number(item.productId ?? item.id);
};

// 위시리스트 캐시 초기화
export const clearWishlistCache = () => {
    wishlistCache = null;
    wishlistRequest = null;
};

// 위시리스트 목록 가져오기
export const getWishlistItems = async ({ force = false } = {}) => {
    const token = resetWishlistCacheIfTokenChanged();

    if (!token) {
        clearWishlistCache();
        return [];
    }

    if (!force && wishlistCache) {
        return wishlistCache;
    }

    if (!force && wishlistRequest) {
        return wishlistRequest;
    }

    wishlistRequest = axiosInstance
        .get("/api/wishlist/me")
        .then((res) => {
            const items = normalizeWishlistData(res.data);
            wishlistCache = items;
            return items;
        })
        .finally(() => {
            wishlistRequest = null;
        });

    return wishlistRequest;
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

    // 캐시가 이미 있으면 추가된 상품을 캐시에도 반영
    if (wishlistCache) {
        const exists = wishlistCache.some(
            item => getProductId(item) === Number(product.id)
        );

        if (!exists) {
            wishlistCache = [
                {
                    ...product,
                    productId: product.id,
                },
                ...wishlistCache,
            ];
        }
    }

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

    // 캐시가 이미 있으면 삭제된 상품을 캐시에서도 제거
    if (wishlistCache) {
        wishlistCache = wishlistCache.filter(
            item => getProductId(item) !== Number(productId)
        );
    }

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
            item => getProductId(item) === Number(productId)
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

    return normalizeWishlistData(res.data);
};