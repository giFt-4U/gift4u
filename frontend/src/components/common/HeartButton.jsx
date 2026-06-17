// HeartButton.jsx

import React, { useEffect, useState } from "react";

import {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
} from "../../utils/Wishlist";

const HeartButton = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        const checkWishlist = async () => {
            const isLogin = localStorage.getItem("token");

            // 비로그인 상태면 무조건 빈 하트
            if (!isLogin || !product?.id) {
                if (mounted) {
                    setLiked(false);
                }
                return;
            }

            try {
                const result = await isInWishlist(product.id);

                if (mounted) {
                    setLiked(result);
                }
            } catch (error) {
                console.error("위시리스트 확인 실패:", error);

                if (mounted) {
                    setLiked(false);
                }
            }
        };

        checkWishlist();

        return () => {
            mounted = false;
        };
    }, [product?.id]);

    const handleClick = async (e) => {
        e.stopPropagation();

        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 위시리스트를 이용할 수 있습니다.");
            setLiked(false);
            return;
        }

        if (!product?.id || loading) {
            return;
        }

        const previousLiked = liked;

        try {
            setLoading(true);

            // 먼저 화면 상태를 바꿔서 반응 속도 개선
            setLiked(!previousLiked);

            if (previousLiked) {
                await removeFromWishlist(product.id);
            } else {
                const success = await addToWishlist(product);

                if (success === false) {
                    setLiked(previousLiked);
                }
            }
        } catch (error) {
            console.error("위시리스트 처리 실패:", error);
            alert("위시리스트 처리에 실패했습니다.");

            // 실패 시 이전 상태로 복구
            setLiked(previousLiked);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            aria-label={liked ? "위시리스트에서 삭제" : "위시리스트에 추가"}
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "36px",
                height: "36px",
                border: "none",
                borderRadius: "50%",
                background: "white",
                cursor: loading ? "not-allowed" : "pointer",
                zIndex: 10,
                opacity: loading ? 0.7 : 1,
            }}
        >
            {liked ? "❤️" : "🤍"}
        </button>
    );
};

export default HeartButton;