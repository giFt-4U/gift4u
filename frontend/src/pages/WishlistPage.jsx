// WishlistPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getWishlistItems,
    removeFromWishlist,
} from "../utils/Wishlist";

import {
    addToCart,
} from "../utils/Cart";

const WishlistPage = () => {
    const navigate = useNavigate();

    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            setWishlistItems([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const items = await getWishlistItems();
            setWishlistItems(items);
        } catch (error) {
            console.error("위시리스트 조회 실패:", error);
            setWishlistItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (id) => {
        try {
            await removeFromWishlist(id);

            setWishlistItems(prev =>
                prev.filter(item => Number(item.id) !== Number(id))
            );
        } catch (error) {
            console.error("위시리스트 삭제 실패:", error);
            alert("위시리스트 삭제에 실패했습니다.");
        }
    };

    const handleAddCart = (product) => {
        const isLogin = localStorage.getItem("token");

        if (!isLogin) {
            alert("로그인 후 장바구니를 이용할 수 있습니다.");
            return;
        }

        addToCart(product);
        alert("장바구니에 담겼습니다.");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2
                style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "20px",
                }}
            >
                위시리스트
            </h2>

            {loading ? (
                <p
                    style={{
                        textAlign: "center",
                        color: "#777",
                        padding: "60px 0",
                        fontSize: "14px",
                    }}
                >
                    불러오는 중입니다.
                </p>
            ) : wishlistItems.length === 0 ? (
                <p
                    style={{
                        textAlign: "center",
                        color: "#777",
                        padding: "60px 0",
                        fontSize: "14px",
                    }}
                >
                    찜한 상품이 없습니다.
                </p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                        alignItems: "stretch",
                    }}
                >
                    {wishlistItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                position: "relative",
                                cursor: "pointer",

                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                            }}
                            onClick={() => navigate(`/products/${item.id}`)}
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item.id);
                                }}
                                style={{
                                    position: "absolute",
                                    top: "8px",
                                    right: "8px",
                                    zIndex: 10,

                                    width: "30px",
                                    height: "30px",

                                    border: "none",
                                    borderRadius: "50%",

                                    background: "white",

                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                }}
                            >
                                ×
                            </button>

                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = "/images/default.png";
                                }}
                                style={{
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    backgroundColor: "#f5f5f5",
                                }}
                            />

                            <h4
                                style={{
                                    marginTop: "8px",
                                    marginBottom: 0,

                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    fontWeight: 500,

                                    minHeight: "40px",

                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {item.name}
                            </h4>

                            <p
                                style={{
                                    marginTop: "4px",
                                    marginBottom: "8px",

                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}
                            >
                                {Number(item.price || 0).toLocaleString()}원
                            </p>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(item);
                                }}
                                style={{
                                    marginTop: "auto",

                                    width: "100%",
                                    height: "36px",

                                    border: "1px solid #ff8d28",
                                    borderRadius: "6px",

                                    background: "#ff8d28",
                                    color: "white",

                                    cursor: "pointer",

                                    fontSize: "13px",
                                    fontWeight: 600,
                                }}
                            >
                                장바구니 담기
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;