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
        const isLogin = localStorage.getItem("token");

        // 비로그인 상태면 기존에 담긴 데이터가 있어도 하트는 비활성화
        if (!isLogin) {
            setLiked(false);
            return;
        }

        setLiked(isInCart(product.id));
    }, [product.id]);

    const handleClick = (e) => {
        e.stopPropagation();

        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 찜하기를 이용할 수 있습니다.");
            return;
        }

        if (liked) {
            removeFromCart(product.id);
            setLiked(false);
        } else {
            addToCart(product);
            setLiked(true);
        }
    };

    // 로그아웃 시 찜하기 초기화
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");

        window.location.reload();
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