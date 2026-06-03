// Wishlist.js

const WISHLIST_KEY = "wishlistItems";

// 위시리스트 목록 가져오기
export const getWishlistItems = () => {
    const wishlistItems = localStorage.getItem(WISHLIST_KEY);

    if (!wishlistItems) {
        return [];
    }

    return JSON.parse(wishlistItems);
};

// 위시리스트 저장
const saveWishlistItems = (items) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

// 위시리스트에 상품 추가
export const addToWishlist = (product) => {
    const wishlistItems = getWishlistItems();

    const exists = wishlistItems.find(
        item => item.id === product.id
    );

    if (exists) return;

    saveWishlistItems([
        ...wishlistItems,
        product,
    ]);
};

// 위시리스트에서 상품 삭제
export const removeFromWishlist = (productId) => {
    const wishlistItems = getWishlistItems();

    const updatedItems = wishlistItems.filter(
        item => item.id !== productId
    );

    saveWishlistItems(updatedItems);
};

// 위시리스트에 이미 담겼는지 확인
export const isInWishlist = (productId) => {
    const wishlistItems = getWishlistItems();

    return wishlistItems.some(
        item => item.id === productId
    );
};