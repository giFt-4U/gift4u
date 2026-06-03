// HeartButton.jsx

import React, { useEffect, useState } from "react";

import {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
} from "../../utils/Wishlist";

const HeartButton = ({ product }) => {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const isLogin = localStorage.getItem("token");

        // 비로그인 상태면 기존 wishlistItems가 있어도 하트는 비활성화
        if (!isLogin) {
            setLiked(false);
            return;
        }

        setLiked(isInWishlist(product.id));
    }, [product.id]);

    const handleClick = (e) => {
        e.stopPropagation();

        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 위시리스트를 이용할 수 있습니다.");
            return;
        }

        if (liked) {
            removeFromWishlist(product.id);
            setLiked(false);
        } else {
            addToWishlist(product);
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