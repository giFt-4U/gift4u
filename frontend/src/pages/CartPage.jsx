// CartPage.jsx

import React, { useEffect, useState } from "react";

import {
    PageWrapper,

    CartTitleSection,
    CartTitle,

    SelectSection,
    SelectRow,

    CartListSection,
    CartItem,
    Checkbox,
    ProductImage,
    ProductInfo,
    ProductTop,
    ProductName,
    DeliveryText,
    PriceText,

    QuantityWrapper,
    QtyButton,
    QtyInput,

    Divider,

    DeliverySection,
    DeliveryTitle,
    DeliveryRow,
    DeliveryTextLine,
    DeliveryTotal,

    BottomOrderBox,
    BottomTop,
    SelectedCount,
    BottomPrice,
    ButtonRow,
    OrderButton,
} from "../styles/CartStyle";

import {
    getCartItems,
    removeFromCart,
    updateQuantity,
} from "../utils/Cart";

const CartPage = () => {

    const MAX_QUANTITY = 99;

    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const items = getCartItems();

        setCartItems(items);
        setSelectedItems(items.map(item => item.id));
    }, []);

    // 전체 선택 / 전체 해제
    const toggleAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.id));
        }
    };

    // 개별 선택 / 해제
    const toggleItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(
                selectedItems.filter(itemId => itemId !== id)
            );
        } else {
            setSelectedItems([
                ...selectedItems,
                id,
            ]);
        }
    };

    // 상품 삭제
    const handleRemove = (id) => {
        removeFromCart(id);

        const updatedItems = cartItems.filter(
            item => item.id !== id
        );

        setCartItems(updatedItems);

        setSelectedItems(prev =>
            prev.filter(itemId => itemId !== id)
        );
    };

    // 수량 + / - 변경
    const changeQuantity = (id, type) => {
        const updatedItems = cartItems.map(item => {
            if (item.id !== id) return item;

            let qty = item.quantity || 1;

            if (type === "plus" && qty < MAX_QUANTITY) {
                qty += 1;
            }

            if (type === "minus" && qty > 1) {
                qty -= 1;
            }

            updateQuantity(id, qty);

            return {
                ...item,
                quantity: qty,
            };
        });

        setCartItems(updatedItems);
    };

    // 수량 직접 입력
    const changeQuantityInput = (id, value) => {
        let qty = Number(value);

        if (!qty || qty < 1) {
            qty = 1;
        }

        if (qty > MAX_QUANTITY) {
            qty = MAX_QUANTITY;
        }

        const updatedItems = cartItems.map(item => {
            if (item.id !== id) return item;

            updateQuantity(id, qty);

            return {
                ...item,
                quantity: qty,
            };
        });

        setCartItems(updatedItems);
    };

    // 선택된 상품만 계산
    const selectedProducts = cartItems.filter(item =>
        selectedItems.includes(item.id)
    );

    // 상품 총액
    const totalPrice = selectedProducts.reduce((acc, cur) => {
        const price = Number(cur.price || 0);
        const quantity = cur.quantity || 1;

        return acc + price * quantity;
    }, 0);

    const deliveryPrice = 0;
    const finalPrice = totalPrice + deliveryPrice;

    return (
        <PageWrapper>

            <CartTitleSection>
                <CartTitle>
                    장바구니
                </CartTitle>
            </CartTitleSection>

            <SelectSection>
                <SelectRow>
                    <Checkbox
                        type="checkbox"
                        checked={
                            selectedItems.length === cartItems.length &&
                            cartItems.length > 0
                        }
                        onChange={toggleAll}
                    />

                    <span>전체 선택</span>
                </SelectRow>
            </SelectSection>

            <CartListSection>

                {cartItems.length === 0 ? (
                    <div
                        style={{
                            padding: "40px 20px",
                            textAlign: "center",
                            fontSize: "13px",
                            color: "#777",
                        }}
                    >
                        장바구니에 담긴 상품이 없습니다.
                    </div>
                ) : (
                    cartItems.map(item => (
                        <React.Fragment key={item.id}>

                            <CartItem>

                                <Checkbox
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleItem(item.id)}
                                />

                                <ProductImage
                                    src={item.imageUrl}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.src = "/images/default.png";
                                    }}
                                />

                                <ProductInfo
                                    style={{
                                        position: "relative",
                                        paddingRight: "24px",
                                    }}
                                >

                                    <button
                                        type="button"
                                        aria-label="장바구니 상품 삭제"
                                        onClick={() => handleRemove(item.id)}
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",

                                            width: "20px",
                                            height: "20px",

                                            border: "none",
                                            background: "transparent",

                                            fontSize: "16px",
                                            fontWeight: "700",

                                            cursor: "pointer",
                                        }}
                                    >
                                        ×
                                    </button>

                                    <ProductTop>
                                        <ProductName>
                                            [선물 상점] {item.name}
                                        </ProductName>
                                    </ProductTop>

                                    <DeliveryText>
                                        배송: 무료 / 기본 배송
                                    </DeliveryText>

                                    <PriceText>
                                        상품구매금액: {(Number(item.price || 0) * (item.quantity || 1)).toLocaleString()}원
                                    </PriceText>

                                    <QuantityWrapper>

                                        <QtyButton
                                            type="button"
                                            onClick={() => changeQuantity(item.id, "minus")}
                                        >
                                            -
                                        </QtyButton>

                                        <QtyInput
                                            type="number"
                                            min="1"
                                            max="99"
                                            value={item.quantity || 1}
                                            onChange={(e) =>
                                                changeQuantityInput(item.id, e.target.value)
                                            }
                                        />

                                        <QtyButton
                                            type="button"
                                            onClick={() => changeQuantity(item.id, "plus")}
                                        >
                                            +
                                        </QtyButton>

                                    </QuantityWrapper>

                                </ProductInfo>

                            </CartItem>

                            <Divider />

                        </React.Fragment>
                    ))
                )}

            </CartListSection>

            <DeliverySection>

                <DeliveryTitle>
                    기본배송
                </DeliveryTitle>

                <DeliveryRow>

                    <DeliveryTextLine>
                        상품구매금액
                    </DeliveryTextLine>

                    <DeliveryTextLine>
                        {totalPrice.toLocaleString()}원
                    </DeliveryTextLine>

                    <DeliveryTextLine>
                        + 배송비 0 무료
                    </DeliveryTextLine>

                    <DeliveryTextLine>
                        =
                    </DeliveryTextLine>

                </DeliveryRow>

                <DeliveryTotal>
                    합계 : {finalPrice.toLocaleString()}원
                </DeliveryTotal>

            </DeliverySection>

            <BottomOrderBox>

                <BottomTop>

                    <SelectedCount>
                        <strong>{selectedItems.length}개</strong> 상품선택
                    </SelectedCount>

                    <BottomPrice>
                        결제예정금액: {finalPrice.toLocaleString()}원
                    </BottomPrice>

                </BottomTop>

                <ButtonRow>

                    <OrderButton type="button">
                        선택상품주문
                    </OrderButton>

                    <OrderButton type="button" $primary>
                        전체상품
                    </OrderButton>

                </ButtonRow>

            </BottomOrderBox>

        </PageWrapper>
    );
};

export default CartPage;