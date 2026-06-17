package com.gift4u.app.domain.payment.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String paymentKey;
    private String orderId;
    private Long amount;
}