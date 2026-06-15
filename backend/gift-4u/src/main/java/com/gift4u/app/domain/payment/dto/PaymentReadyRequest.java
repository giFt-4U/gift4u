package com.gift4u.app.domain.payment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;


/* 결제 준비용
 * 유저가 결제창을 열기 직전, 금액 조작을 차단하기 위해 DB에 임시 주문번호와 진짜 금액을 저장
 * */
@Getter
@NoArgsConstructor
public class PaymentReadyRequest {
    @NotNull private String orderId;
    @NotNull private Long amount;
}