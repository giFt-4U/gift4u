package com.gift4u.app.domain.payment.enums;

public enum PaymentStatus {
    READY("결제 준비"),
    DONE("결제 완료"),
    CANCELED("결제 취소"),
    FAIL("결제 실패");

    private final String description;

    PaymentStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }
}
