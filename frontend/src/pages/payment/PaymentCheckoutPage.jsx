import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export default function PaymentCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [widgets, setWidgets] = useState(null);

  // 앞 페이지에서 보낸 진짜 데이터 구조 분해 할당
  const { amount, giftData } = location.state || { amount: 0, giftData: null };

  useEffect(() => {
    if (!amount || !giftData) {
      alert("결제 정보가 유효하지 않습니다.");
      navigate("/gifts/card");
      return;
    }

    async function initToss() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgetsInstance = tossPayments.widgets({ customerKey: "ANONYMOUS" });

      await widgetsInstance.setAmount({ currency: "KRW", value: amount });
      await widgetsInstance.renderPaymentMethods({ selector: "#payment-method" });
      await widgetsInstance.renderAgreement({ selector: "#agreement" });

      setWidgets(widgetsInstance);
    }
    initToss();
  }, [amount, giftData, navigate]);

  const handlePayment = async () => {
    if (!widgets) return;

    // 1. 이번 주문에 사용할 고유 주문번호(orderId)를 미리 생성
    const uniqueOrderId = "GIFT_" + new Date().getTime();

    // 결제창 갔다 와도 데이터 안 날아가게 임시 저장 (기존 유지)
    localStorage.setItem("pending_gift_data", JSON.stringify(giftData));

    try {
      const token = localStorage.getItem("token");

      // 2. 토스창 띄우기 전, 백엔드 DB에 임시 결제 데이터를 먼저 인서트(READY)
      const readyResponse = await fetch(`${API_URL}/api/v1/payments/ready`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" // 인증 필터 통과용
        },
        body: JSON.stringify({
          orderId: uniqueOrderId,
          amount: Number(amount)
        })
      });

      if (!readyResponse.ok) {
        throw new Error("임시 주문 생성 실패");
      }

      // 3. 백엔드 DB 저장 성공 확인 후 토스 결제창을 호출
      await widgets.requestPayment({
        orderId: uniqueOrderId,
        orderName: giftData.productName || "선물하기 상품 결제",
        successUrl: window.location.origin + "/gifts/success",
        failUrl: window.location.origin + "/gifts/card",
      });
    } catch (error) {
      console.error("결제 요청 실패", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>선물 결제하기</h2>
      <p style={{ fontSize: '18px', paddingTop: '20px' }}>결제 금액: {amount.toLocaleString()}원</p>
      <div id="payment-method" />
      <div id="agreement" />
      <button onClick={handlePayment} style={{ width: "100%", padding: "15px", backgroundColor: "#3182f6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
        {amount.toLocaleString()}원 결제하기
      </button>
    </div>
  );
}
