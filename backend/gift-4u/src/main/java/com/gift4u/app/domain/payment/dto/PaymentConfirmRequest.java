package com.gift4u.app.domain.payment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import com.gift4u.app.domain.gift.dto.GiftCreateRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;



/* 결제 확인용
 * 프론트엔드(GiftSuccess.jsx)에서 토스 결과와 함께 보낼 유저 입력 데이터를 한 번에 담는 통합
 * */

@Getter
@NoArgsConstructor
public class PaymentConfirmRequest {
    // 1. 토스 결제 승인 요청용 데이터
    @NotNull private String paymentKey;
    @NotNull private String orderId;
    @NotNull private Long amount;

    // 2. 원래 보내려던 진짜 선물 생성 데이터
    @Valid 
    @NotNull 
    private GiftCreateRequest giftInfo;
}