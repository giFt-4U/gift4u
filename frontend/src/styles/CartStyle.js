// CartStyle.js

import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 500px;

  margin: 0 auto;

  background: white;

  min-height: 100vh;

  padding-bottom: 140px;
`;

export const CartHeader = styled.div`
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  background: white;

  position: sticky;
  top: 0;

  z-index: 100;
`;

export const HeaderSide = styled.div`
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;

  cursor: pointer;
`;

export const HeaderLogo = styled.div`
  font-size: 24px;
  font-weight: bold;

  color: #FF8D28;
`;

export const CartTitle = styled.h2`
  padding: 20px;
`;

export const SelectRow = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 0 20px 20px;
`;

export const Divider = styled.div`
  height: 1px;
  background: #EAEAEA;
`;

export const CartList = styled.div``;

export const CartItem = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;

  padding: 16px 20px;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

export const ProductImage = styled.img`
  width: 90px;
  height: 90px;

  object-fit: cover;

  border-radius: 12px;

  background: #f5f5f5;
`;

export const ProductInfo = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const ProductName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const DeliveryText = styled.div`
  font-size: 14px;
  color: #777;
`;

export const PriceText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export const QtyButton = styled.button`
  width: 32px;
  height: 32px;

  border: 1px solid #ddd;

  background: #f5f5f5;

  cursor: pointer;
`;

export const QtyValue = styled.div`
  width: 30px;
  text-align: center;
`;

export const SummaryBox = styled.div`
  margin: 20px;

  padding: 20px;

  border: 1px solid #EAEAEA;
  border-radius: 12px;
`;

export const SummaryText = styled.div`
  margin-bottom: 15px;
`;

export const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const BottomOrderBox = styled.div`
  position: fixed;

  bottom: 0;
  left: 50%;

  transform: translateX(-50%);

  width: 100%;
  max-width: 500px;

  background: white;

  padding: 20px;

  box-shadow: 0 -4px 10px rgba(0,0,0,0.1);
`;

export const BottomTop = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
`;

export const BottomPrice = styled.div`
  color: #FF8D28;
  font-weight: bold;
`;

export const ButtonRow = styled.div`
  display: flex;

  gap: 10px;
`;

export const OrderButton = styled.button`
  flex: 1;

  height: 50px;

  border-radius: 8px;

  border: 1px solid #ddd;

  background: ${(props) =>
        props.$primary ? "#FF8D28" : "white"};

  color: ${(props) =>
        props.$primary ? "white" : "black"};

  font-weight: bold;

  cursor: pointer;
`;