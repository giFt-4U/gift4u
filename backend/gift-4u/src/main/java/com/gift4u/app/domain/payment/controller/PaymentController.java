package com.gift4u.app.domain.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.gift.dto.GiftResponse;
import com.gift4u.app.domain.payment.dto.PaymentConfirmRequest;
import com.gift4u.app.domain.payment.dto.PaymentReadyRequest;
import com.gift4u.app.domain.payment.service.PaymentService;
import com.gift4u.app.global.security.CustomUserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * 1. 결제창 띄우기 전 임시 저장 (F12 금액 변조 원천 차단용)
     */
    @PostMapping("/ready")
    public ResponseEntity<Void> readyPayment(@Valid @RequestBody PaymentReadyRequest request) {
        paymentService.createReadyPayment(request.getOrderId(), request.getAmount());
        return ResponseEntity.ok().build();
    }

    /**
     * 2. 토스 승인 요청 + 결제 완료 + 선물 생성 원스톱 연동 API
     */
    @PostMapping("/confirm")
    public ResponseEntity<GiftResponse> confirmPayment(
            @AuthenticationPrincipal CustomUserDetails userDetails, 
            @Valid @RequestBody PaymentConfirmRequest confirmRequest) {

        Long currentUserId = userDetails.getUser().getId();

        // 1. DB 트랜잭션 종료 및 결과 응답 객체 수신
        GiftResponse response = paymentService.confirmPaymentAndCreateGift(currentUserId, confirmRequest);
        
        // 2. 실시간 채팅 메시지 발송
        return ResponseEntity.ok(response);
    }
}