import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("결제를 검증하는 중입니다...");

    const isProcessing = useRef(false);

    useEffect(() => {
        if (isProcessing.current) return;

        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        const giftData = JSON.parse(localStorage.getItem("pending_gift_data"));

        if (!paymentKey || !orderId || !giftData) {
            setStatus("결제 데이터가 만료되었습니다. 다시 시도해주세요.");
            return;
        }

        // 유효성 검사를 통과하면 즉시 true로 변경하여 락(Lock)
        isProcessing.current = true;

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

        // BE 토스 결제 승인 + 선물 생성 요청 통합 통신
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

                const targetRoomId = data.roomId;

                if (targetRoomId) {
                    navigate(`/chat/${targetRoomId}`);
                } else {
                    navigate(`/chat/`);
                }
            })
            .catch((err) => {
                console.error(err);
                setStatus("결제 승인 도중 오류가 발생했습니다. 다시 시도해 주세요.");
                // 실패 시 사용자가 새로고침 or 재시도할 수 있도록 다시 false로 변경
                isProcessing.current = false;
            });
    }, [searchParams, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "150px", lineHeight: "30px" }}>
            <h2>{status}</h2>
        </div>
    );
}