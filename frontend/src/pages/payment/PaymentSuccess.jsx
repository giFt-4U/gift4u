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

        let myUserId = null;
        if (token) {
            try {
                const payload = token.split('.')[1];
                const decoded = JSON.parse(atob(payload));
                console.log("디코딩된 토큰 정보:", decoded);

                myUserId = decoded.sub;
            } catch (e) {
                console.error("토큰 파싱 에러:", e);
            }
        }

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
                giftInfo: giftData,
                giftInfo: {
                    ...giftData,
                    senderId: Number(myUserId)
                }
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("PAYMENT_FAILED");
                return res.json();
            })
            .then((data) => {
                setStatus("🎉 결제 완료! 채팅방으로 이동합니다.");
                localStorage.removeItem("pending_gift_data");

                // 핵심: 백엔드가 응답으로 준 데이터에서 roomId를 추출합니다.
                const targetRoomId = data.roomId;

                // 딜레이 없이 즉시 해당 채팅방으로 이동시킵니다.
                // 채팅방에 진입(Mount)하면서 useEffect가 백엔드 DB의 최신 선물 메시지를 긁어옵니다!
                if (targetRoomId) {
                    navigate(`/chat/${targetRoomId}`);
                } else {
                    navigate(`/chat/`); // 폴백
                }
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