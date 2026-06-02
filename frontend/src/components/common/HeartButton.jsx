// HeartButton.jsx

import React, { useEffect, useState } from "react";

import {
    addToCart,
    removeFromCart,
    isInCart,
} from "../../utils/Cart";

const HeartButton = ({ product }) => {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(isInCart(product.id));
    }, [product.id]);

    const handleClick = (e) => {
        e.stopPropagation();

        if (liked) {
            removeFromCart(product.id);
            setLiked(false);
        } else {
            addToCart(product);
            setLiked(true);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",

                width: "36px",
                height: "36px",

                border: "none",
                borderRadius: "50%",

                background: "white",

                cursor: "pointer",

                zIndex: 10,
            }}
        >
            {liked ? "❤️" : "🤍"}
        </button>
    );
};

export default HeartButton;