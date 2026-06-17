// OrderPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
    PageWrapper,

    OrderHeader,
    BackButton,
    LogoText,
    HeaderRightSpace,

    Divider,

    OrderListSection,
    OrderItem,
    ProductImage,
    ProductInfo,
    ProductName,
    QuantityText,
    PriceText,

    DeliverySection,
    DeliveryTitle,
    DeliveryLine,

    BottomOrderBox,
    BottomTop,
    SelectedCount,
    BottomPrice,
    MessageButton,
} from "../styles/OrderStyle";

const OrderPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        try {
            const savedItems = JSON.parse(
                localStorage.getItem("orderItems") || "[]"
            );

            setOrderItems(
                Array.isArray(savedItems) ? savedItems : []
            );
        } catch (error) {
            console.error("주문 상품 불러오기 실패:", error);

            localStorage.removeItem("orderItems");
            setOrderItems([]);
        }
    }, []);

    const totalProductPrice = orderItems.reduce((acc, cur) => {
        const price = Number(cur.price || 0);
        const quantity = cur.quantity || 1;

        return acc + price * quantity;
    }, 0);

    const deliveryFee = 0;
    const finalPrice = totalProductPrice + deliveryFee;

    // 친구 위시리스트에서 온 경우 친구 코드 유지
    const receiverFriendCode =
        location.state?.receiverFriendCode ||
        orderItems[0]?.receiverFriendCode ||
        "";

    const fromFriendWishlist =
        location.state?.fromFriendWishlist ||
        orderItems[0]?.fromFriendWishlist ||
        false;

    const handleSelectFriend = (productId, productName) => {
        navigate('/friends/select', {
            state: {
                productId,
                productName,
                productPrice: finalPrice
            },
        });
    };

    // 선물할 친구 선택하기 버튼 클릭
    const handleMessageButtonClick = () => {
        if (orderItems.length === 0) {
            alert('주문할 상품이 없습니다.');
            return;
        }

        const item = orderItems[0];

        // 이미 친구 위시리스트에서 넘어온 경우 친구 재선택 없이 친구 코드 전달
        if (receiverFriendCode) {
            navigate('/friends/select', {
                state: {
                    productId: item.id,
                    productName: item.name,
                    productPrice: finalPrice,
                    receiverFriendCode,
                    fromFriendWishlist,
                    skipSelect: true,
                },
            });

            return;
        }

        // 일반 상품 상세페이지에서 온 경우 기존처럼 친구 선택
        handleSelectFriend(item.id, item.name);
    };

    return (
        <PageWrapper>

            <OrderHeader>
                <BackButton
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="뒤로가기"
                >
                    <img
                        src="/assets/icons/back.png"
                        alt="뒤로가기"
                    />
                </BackButton>

                <LogoText
                    onClick={() => navigate("/")}
                >
                    따숨품
                </LogoText>

                <HeaderRightSpace />
            </OrderHeader>

            <Divider />

            <OrderListSection>

                {orderItems.length === 0 ? (
                    <div
                        style={{
                            padding: "40px 0",
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#777",
                        }}
                    >
                        주문할 상품이 없습니다.
                    </div>
                ) : (
                    orderItems.map(item => {
                        const imageSrc = item.imageUrl || item.image_url || "/images/default.png";

                        return (
                            <OrderItem key={item.id}>

                                <ProductImage
                                    src={imageSrc}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.src = "/images/default.png";
                                    }}
                                />

                                <ProductInfo>
                                    <ProductName>
                                        [선물 상품] {item.name}
                                    </ProductName>

                                    <QuantityText>
                                        수량 {item.quantity || 1}개
                                    </QuantityText>

                                    <PriceText>
                                        상품구매금액:
                                        {" "}
                                        <strong>
                                            {(
                                                Number(item.price || 0) *
                                                (item.quantity || 1)
                                            ).toLocaleString()}
                                        </strong>
                                        원
                                    </PriceText>
                                </ProductInfo>

                            </OrderItem>
                        );
                    })
                )}

            </OrderListSection>

            <DeliverySection>
                <DeliveryTitle>
                    기본배송
                </DeliveryTitle>

                <DeliveryLine>
                    상품구매금액&nbsp;&nbsp;
                    {totalProductPrice.toLocaleString()}
                    &nbsp;+ 배송비 {deliveryFee} (무료) =
                </DeliveryLine>

                <DeliveryLine>
                    합계 :
                    {" "}
                    <strong>
                        {finalPrice.toLocaleString()}
                    </strong>
                    원
                </DeliveryLine>
            </DeliverySection>

            <BottomOrderBox>
                <BottomTop>
                    <SelectedCount>
                        <strong>{orderItems.length}개</strong> 상품선택
                    </SelectedCount>

                    <BottomPrice>
                        결제예정금액:
                        {" "}
                        <strong>
                            {finalPrice.toLocaleString()}
                        </strong>
                        원
                    </BottomPrice>
                </BottomTop>

                <MessageButton
                    type="button"
                    onClick={handleMessageButtonClick}
                >
                    {receiverFriendCode
                        ? "선물 메시지 작성하기"
                        : "선물할 친구 선택하기"}
                </MessageButton>
            </BottomOrderBox>

        </PageWrapper>
    );
};

export default OrderPage;