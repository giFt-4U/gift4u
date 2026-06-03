// OrderStyle.js

import styled from "styled-components";

export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #fff;

    /* 하단 고정 영역이 상품 목록을 가리지 않도록 여백 확보 */
    padding-bottom: 300px;
`;

/* 주문 페이지 전용 상단바 */
export const OrderHeader = styled.header`
    position: relative;

    width: 100%;
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #fff;
    border-bottom: 1px solid #eee;
`;

export const BackButton = styled.button`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);

    width: 24px;
    height: 24px;

    border: none;
    background: transparent;
    padding: 0;

    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
        display: block;
    }
`;

export const LogoText = styled.div`
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 1.5px;

    color: #f5c542;

    cursor: pointer;
`;

export const HeaderRightSpace = styled.div`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    width: 24px;
    height: 24px;
`;

export const Divider = styled.div`
    width: 100%;
    height: 18px;
    background-color: #f4f4f4;
`;

export const OrderListSection = styled.section`
    padding: 24px 20px;
`;

export const OrderItem = styled.div`
    display: flex;
    gap: 14px;
    align-items: center;

    & + & {
        margin-top: 22px;
    }
`;

export const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;

    border: 1px solid #999999;
    background-color: #f7f7f7;
`;

export const ProductInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const ProductName = styled.div`
    margin-bottom: 10px;

    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0.5px;

    color: #111;

    word-break: keep-all;
`;

export const QuantityText = styled.div`
    margin-bottom: 8px;

    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.3px;

    color: #666;
`;

export const PriceText = styled.div`
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0.3px;

    color: #111;

    strong {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.3px;
    }
`;

/* 기본배송 영역 하단 고정 */
export const DeliverySection = styled.section`
    position: fixed;
    left: 50%;
    bottom: 104px;
    transform: translateX(-50%);

    width: 100%;
    max-width: 500px;

    padding: 16px 20px;

    background-color: #fff;
    border-top: 10px solid #f4f4f4;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);

    z-index: 90;
`;

export const DeliveryTitle = styled.h3`
    margin: 0 0 14px;

    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0.5px;

    color: #111;
`;

export const DeliveryLine = styled.div`
    margin-bottom: 6px;

    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.3px;

    color: #111;

    strong {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.3px;
    }
`;

/* 결제예정금액 + 버튼 영역 */
export const BottomOrderBox = styled.div`
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);

    width: 100%;
    max-width: 500px;

    padding: 16px 20px 20px;

    background-color: #fff;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);

    z-index: 100;
`;

export const BottomTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 12px;

    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.3px;
`;

export const SelectedCount = styled.div`
    color: #111;

    strong {
        color: #ff8d28;
        font-size: 13px;
        font-weight: 700;
    }
`;

export const BottomPrice = styled.div`
    color: #ff8d28;
    text-align: right;

    font-size: 12px;
    font-weight: 700;

    strong {
        color: #ff8d28;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.3px;
    }
`;

export const MessageButton = styled.button`
    width: 100%;
    height: 40px;

    border: none;
    border-radius: 4px;

    background-color: #ff8d28;
    color: #fff;

    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;

    cursor: pointer;
`;