// CartStyle.js

import styled from "styled-components";

/*
    장바구니 전체 페이지 영역.
    공통 Nav 아래에 들어가는 실제 장바구니 화면이다.
    피그마처럼 배경은 연한 회색으로 두고,
    각 섹션은 흰색 박스로 나누어 구성한다.
*/
export const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);

  display: flex;
  flex-direction: column;

  background: #f4f4f4;

  padding-bottom: 120px;
`;

/*
    장바구니 제목 영역.
    피그마에서 "장바구니" 텍스트가 있는 흰색 구역.
*/
export const CartTitleSection = styled.section`
  width: 100%;

  background: #ffffff;

  padding: 28px 20px 14px;
`;

export const CartTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;

  color: #111111;
`;

/*
    전체 선택 영역.
    상품 리스트와 별도 흰색 구역처럼 보이게 구성.
*/
export const SelectSection = styled.section`
  width: 100%;

  background: #ffffff;

  padding: 14px 20px;
`;

export const SelectRow = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;

  font-size: 12px;

  color: #333333;
`;

/*
    상품 사이 구분선.
*/
export const Divider = styled.div`
  width: 100%;
  height: 1px;

  background: #eeeeee;
`;

/*
    상품 리스트 전체 영역.
*/
export const CartListSection = styled.section`
  width: 100%;

  background: #ffffff;
`;

/*
    상품 한 개 행.
    피그마처럼 체크박스 / 이미지 / 상품정보 3열 구조로 구성.
*/
export const CartItem = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 16px 90px 1fr;

  gap: 10px;

  align-items: flex-start;

  padding: 14px 20px;
`;

/*
    체크박스.
    accent-color로 체크 색상을 주황색에 맞춤.
*/
export const Checkbox = styled.input`
  width: 14px;
  height: 14px;

  margin-top: 2px;

  accent-color: #ff8d28;

  cursor: pointer;
`;

/*
    상품 이미지.
    피그마의 와이어프레임 이미지처럼 정사각형 고정.
*/
export const ProductImage = styled.img`
  width: 90px;
  height: 90px;

  object-fit: cover;

  border: 1px solid #999999;

  background: #ffffff;
`;

/*
    상품 정보 영역.
    상품명, 배송정보, 가격, 수량 버튼을 세로로 배치.
*/
export const ProductInfo = styled.div`
  position: relative;

  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 6px;

  /*
    오른쪽 상단 X 버튼 공간 확보
  */
  padding-right: 22px;
`;
/*
    상품 오른쪽 상단 삭제 버튼.
    장바구니에서 담아둔 상품을 제거하는 역할.
*/
export const RemoveButton = styled.button`
  position: absolute;

  top: 0;
  right: 0;

  width: 18px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  background: transparent;

  color: #333333;

  font-size: 15px;
  font-weight: 700;

  line-height: 1;

  cursor: pointer;
`;

/*
    상품명과 오른쪽 판매자명 영역.
*/
export const ProductTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 8px;
`;

/*
    상품명.
    두 줄 정도까지 자연스럽게 표시되도록 line-height 조정.
*/
export const ProductName = styled.div`
  flex: 1;

  font-size: 12px;
  font-weight: 700;

  line-height: 1.25;

  color: #111111;

  word-break: keep-all;
`;

/*
    오른쪽 판매자명.
    피그마 이미지의 "수정선" 위치에 해당.
*/
export const SellerName = styled.div`
  width: 38px;

  font-size: 12px;
  font-weight: 700;

  color: #111111;

  text-align: right;

  white-space: nowrap;
`;

/*
    배송 안내 텍스트.
*/
export const DeliveryText = styled.div`
  font-size: 11px;

  color: #555555;
`;

/*
    상품 금액 텍스트.
*/
export const PriceText = styled.div`
  font-size: 12px;
  font-weight: 700;

  color: #111111;
`;

/*
    수량 버튼 영역.
*/
export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 6px;

  margin-top: 4px;
`;

/*
    - / + 버튼.
    피그마처럼 작은 사각형 버튼으로 고정.
*/
export const QtyButton = styled.button`
  width: 22px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #cccccc;

  background: #eeeeee;

  color: #333333;

  font-size: 13px;

  cursor: pointer;
`;

/*
    가운데 수량 표시 영역.
*/
export const QtyInput = styled.input`
  width: 40px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #cccccc;

  background: #ffffff;

  font-size: 11px;
  text-align: center;

  outline: none;

  /*
    number input 오른쪽 화살표를 브라우저별로 최대한 제거
  */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
`;

/*
    기본배송 / 합계 영역.
    상품 리스트 아래 회색 간격 뒤에 나오는 흰색 구역.
*/
export const DeliverySection = styled.section`
  width: 100%;

  /*
    상품 리스트가 적을 때는 기본배송 영역을 아래쪽으로 밀어준다.
    상품 리스트가 많으면 자연스럽게 리스트 아래에 붙는다.
  */
  margin-top: auto;

  padding: 16px 20px 100px;

  background: #ffffff;

  border-top: 10px solid #f4f4f4;

  min-height: 170px;
`;

export const DeliveryTitle = styled.div`
  margin-bottom: 18px;

  font-size: 13px;
  font-weight: 700;

  color: #111111;
`;

export const DeliveryRow = styled.div`
  display: flex;
  align-items: center;

  gap: 6px;

  flex-wrap: wrap;
`;

export const DeliveryTextLine = styled.span`
  font-size: 12px;

  color: #111111;
`;

export const DeliveryTotal = styled.div`
  margin-top: 8px;

  font-size: 13px;
  font-weight: 700;

  color: #111111;
`;

/*
    하단 주문 영역.
    피그마처럼 화면 하단에 고정한다.
    MobileContainer max-width와 동일하게 max-width 500px 적용.
*/
export const BottomOrderBox = styled.div`
  position: fixed;

  left: 50%;
  bottom: 0;

  transform: translateX(-50%);

  width: 100%;
  max-width: 500px;

  padding: 20px;

  background: #ffffff;

  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);

  z-index: 200;
`;

/*
    하단 주문바 상단 텍스트 줄.
    왼쪽은 선택 상품 수, 오른쪽은 결제 예정 금액.
*/
export const BottomTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 12px;

  font-size: 12px;
`;

export const SelectedCount = styled.div`
  color: #111111;

  strong {
    color: #ff8d28;
  }
`;

export const BottomPrice = styled.div`
  font-size: 12px;
  font-weight: 700;

  color: #ff8d28;
`;

/*
    하단 주문 버튼 2개.
*/
export const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 6px;
`;

export const OrderButton = styled.button`
  height: 34px;

  border: 1px solid ${({ $primary }) => ($primary ? "#ff8d28" : "#111111")};

  background: ${({ $primary }) => ($primary ? "#ff8d28" : "#ffffff")};

  color: ${({ $primary }) => ($primary ? "#ffffff" : "#111111")};

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
`;