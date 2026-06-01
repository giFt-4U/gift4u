//Cart.js
const CART_KEY = "cartItems";

export const getCartItems = () => {

    return JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
    );
};

export const addToCart = (product) => {

    const items = getCartItems();

    const exists = items.find(
        item => item.id === product.id
    );

    if (exists) return;

    items.push({
        ...product,
        quantity: 1,
    });

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(items)
    );
};

export const removeFromCart = (id) => {

    const updated = getCartItems().filter(
        item => item.id !== id
    );

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(updated)
    );
};

export const isInCart = (id) => {

    return getCartItems().some(
        item => item.id === id
    );
};

export const updateQuantity = (id, quantity) => {

    const updated = getCartItems().map(item =>

        item.id === id
            ? { ...item, quantity }
            : item
    );

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(updated)
    );
};