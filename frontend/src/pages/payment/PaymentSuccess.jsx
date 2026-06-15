import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("결제를 검증하는 중입니다...");

    useEffect(() => {
        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        const giftData = JSON.parse(localStorage.getItem("pending_gift_data"));

        if (!paymentKey || !orderId || !giftData) {
            setStatus("결제 데이터가 만료되었습니다. 다시 시도해주세요.");
            return;
        }

        const token = localStorage.getItem("token");

        // 1단계: 내 스프링 백엔드로 토스 결제 승인 + 선물 생성 요청 통합 통신
        fetch(`${API_URL}/api/v1/payments/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount: Number(amount),
                giftInfo: giftData
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("PAYMENT_FAILED");
                return res.json();
            })
            .then((data) => {
                setStatus("🎉 결제 완료! 선물이 성공적으로 전송되었습니다.");
                localStorage.removeItem("pending_gift_data");

                setTimeout(() => {
                    navigate(`/chat/`);
                }, 1500);
            })
            .catch((err) => {
                console.error(err);
                setStatus("결제 승인 도중 오류가 발생했습니다. 다시 시도해 주세요.");
            });
    }, [searchParams, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "150px", lineHeight: "30px" }}>
            <h2>{status}</h2>
        </div>
    );
}