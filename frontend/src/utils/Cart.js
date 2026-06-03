// Cart.js

const CART_KEY = "cartItems";

// 장바구니 목록 가져오기
export const getCartItems = () => {
    const cartItems = localStorage.getItem(CART_KEY);

    if (!cartItems) {
        return [];
    }

    return JSON.parse(cartItems);
};

// 장바구니 저장
const saveCartItems = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// 장바구니에 상품 추가
export const addToCart = (product) => {
    const cartItems = getCartItems();

    const existingItem = cartItems.find(
        item => item.id === product.id
    );

    if (existingItem) {
        const updatedItems = cartItems.map(item => {
            if (item.id !== product.id) return item;

            const currentQuantity = item.quantity || 1;
            const newQuantity = Math.min(currentQuantity + 1, 99);

            return {
                ...item,
                quantity: newQuantity,
            };
        });

        saveCartItems(updatedItems);
        return;
    }

    const newItem = {
        ...product,
        quantity: 1,
    };

    saveCartItems([...cartItems, newItem]);
};

// 장바구니에서 상품 삭제
export const removeFromCart = (productId) => {
    const cartItems = getCartItems();

    const updatedItems = cartItems.filter(
        item => item.id !== productId
    );

    saveCartItems(updatedItems);
};

// 장바구니에 이미 담겨있는지 확인
export const isInCart = (productId) => {
    const cartItems = getCartItems();

    return cartItems.some(
        item => item.id === productId
    );
};

// 수량 변경
export const updateQuantity = (productId, quantity) => {
    const cartItems = getCartItems();

    let newQuantity = Number(quantity);

    if (!newQuantity || newQuantity < 1) {
        newQuantity = 1;
    }

    if (newQuantity > 99) {
        newQuantity = 99;
    }

    const updatedItems = cartItems.map(item => {
        if (item.id !== productId) return item;

        return {
            ...item,
            quantity: newQuantity,
        };
    });

    saveCartItems(updatedItems);
};