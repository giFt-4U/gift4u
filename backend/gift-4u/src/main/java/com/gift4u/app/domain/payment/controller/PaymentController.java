package com.gift4u.app.domain.payment.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.gift.service.GiftService;
import com.gift4u.app.domain.payment.dto.PaymentConfirmRequest;
import com.gift4u.app.domain.payment.dto.PaymentReadyRequest;
import com.gift4u.app.domain.payment.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final GiftService giftService;

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
    public ResponseEntity<?> confirmPayment(@Valid @RequestBody PaymentConfirmRequest request) {
        Map<String, Object> result = giftService.createGiftFlow(request.getGiftInfo());

        return ResponseEntity.ok(result);
    }
}