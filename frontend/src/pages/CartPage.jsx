// CartPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    PageWrapper,

    CartTitle,

    SelectRow,
    Divider,

    CartList,
    CartItem,

    Checkbox,

    ProductImage,
    ProductInfo,

    ProductName,
    DeliveryText,
    PriceText,

    QuantityWrapper,
    QtyButton,
    QtyValue,

    SummaryBox,
    SummaryText,
    TotalPrice,

    BottomOrderBox,
    BottomTop,
    BottomPrice,

    ButtonRow,
    OrderButton,
} from "../styles/CartStyle";

import {
    getCartItems,
    updateQuantity,
} from "../utils/Cart";

const CartPage = () => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {

        const items = getCartItems();

        setCartItems(items);

        setSelectedItems(items.map(item => item.id));

    }, []);

    // 전체선택
    const toggleAll = () => {

        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(
                cartItems.map(item => item.id)
            );
        }
    };

    // 개별선택
    const toggleItem = (id) => {

        if (selectedItems.includes(id)) {

            setSelectedItems(
                selectedItems.filter(itemId => itemId !== id)
            );

        } else {

            setSelectedItems([
                ...selectedItems,
                id
            ]);
        }
    };

    // 수량변경
    const changeQuantity = (id, type) => {

        const updated = cartItems.map(item => {

            if (item.id !== id) return item;

            let qty = item.quantity || 1;

            if (type === "plus") {
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

        setCartItems(updated);
    };

    // 선택 상품
    const selectedProducts = cartItems.filter(item =>
        selectedItems.includes(item.id)
    );

    // 총 금액
    const totalPrice = selectedProducts.reduce((acc, cur) => {

        return acc + (
            cur.price * (cur.quantity || 1)
        );

    }, 0);

    return (

        <PageWrapper>



            {/* 제목 */}
            <CartTitle>
                장바구니
            </CartTitle>

            {/* 전체선택 */}
            <SelectRow>

                <Checkbox
                    type="checkbox"
                    checked={
                        selectedItems.length === cartItems.length &&
                        cartItems.length > 0
                    }
                    onChange={toggleAll}
                />

                <span>전체선택</span>

            </SelectRow>

            <Divider />

            {/* 상품목록 */}
            <CartList>

                {cartItems.map(item => (

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

                            <ProductInfo>

                                <ProductName>
                                    {item.name}
                                </ProductName>

                                <DeliveryText>
                                    무료배송
                                </DeliveryText>

                                <PriceText>
                                    {(
                                        item.price *
                                        (item.quantity || 1)
                                    ).toLocaleString()}원
                                </PriceText>

                                <QuantityWrapper>

                                    <QtyButton
                                        onClick={() =>
                                            changeQuantity(item.id, "minus")
                                        }
                                    >
                                        -
                                    </QtyButton>

                                    <QtyValue>
                                        {item.quantity || 1}
                                    </QtyValue>

                                    <QtyButton
                                        onClick={() =>
                                            changeQuantity(item.id, "plus")
                                        }
                                    >
                                        +
                                    </QtyButton>

                                </QuantityWrapper>

                            </ProductInfo>

                        </CartItem>

                        <Divider />

                    </React.Fragment>
                ))}

            </CartList>

            {/* 금액 박스 */}
            <SummaryBox>

                <SummaryText>
                    상품금액 :
                    {totalPrice.toLocaleString()}원
                    + 배송비 : 무료
                </SummaryText>

                <TotalPrice>
                    총 결제금액 :
                    {totalPrice.toLocaleString()}원
                </TotalPrice>

            </SummaryBox>

            {/* 하단 주문 */}
            <BottomOrderBox>

                <BottomTop>

                    <span>
                        {selectedItems.length}개 상품선택
                    </span>

                    <BottomPrice>
                        결제예정금액 :
                        {totalPrice.toLocaleString()}원
                    </BottomPrice>

                </BottomTop>

                <ButtonRow>

                    <OrderButton>
                        선택주문
                    </OrderButton>

                    <OrderButton $primary>
                        전체주문
                    </OrderButton>

                </ButtonRow>

            </BottomOrderBox>

        </PageWrapper>
    );
};

export default CartPage;