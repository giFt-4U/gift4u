// FriendWishlistPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFriendWishlistItems } from "../../utils/Wishlist";

const FriendWishlistPage = () => {
    const navigate = useNavigate();
    const { friendCode } = useParams();

    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriendWishlist = async () => {
            try {
                setLoading(true);

                const items = await getFriendWishlistItems(friendCode);
                setWishlistItems(items);
            } catch (error) {
                console.error("친구 위시리스트 조회 실패:", error);
                setWishlistItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFriendWishlist();
    }, [friendCode]);

    // 선물하기
    const handleGift = (productId) => {
        navigate(`/products/${productId}`, {
            state: {
                fromFriendWishlist: true,
                receiverFriendCode: friendCode,
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
                친구 위시리스트
            </h2>

            <p style={{ fontSize: "13px", color: "#777", marginBottom: "20px" }}>
                친구가 찜한 상품을 확인하고 선물할 상품을 선택해보세요.
            </p>

            {loading ? (
                <p style={{ textAlign: "center", color: "#777", padding: "60px 0", fontSize: "14px" }}>
                    불러오는 중입니다.
                </p>
            ) : wishlistItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <p style={{ color: "#777", fontSize: "14px", marginBottom: "16px" }}>
                        친구가 아직 찜한 상품이 없습니다.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        style={{
                            height: "40px",
                            padding: "0 18px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#ff8d28",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: 600,
                        }}
                    >
                        전체 상품 보러가기
                    </button>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                        alignItems: "stretch",
                    }}
                >
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                            }}
                            onClick={() => navigate(`/products/${item.id}`)}
                        >
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
                                    handleGift(item.id);
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
                                상품 확인하기
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FriendWishlistPage;