package com.gift4u.app.domain.payment.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.gift4u.app.domain.chat.servicer.ChatService;
import com.gift4u.app.domain.gift.dto.GiftResponse;
import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.repository.GiftRepository;
import com.gift4u.app.domain.gift.service.GiftService;
import com.gift4u.app.domain.payment.dto.PaymentConfirmRequest;
import com.gift4u.app.domain.payment.entity.Payment;
import com.gift4u.app.domain.payment.enums.PaymentStatus;
import com.gift4u.app.domain.payment.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final GiftService giftService;
    private final GiftRepository giftRepository;
    private final ChatService chatService;

    @Value("${toss.secret-key}")
    private String secretKey;
    
    /**
     * [Step 1] 결제창 열기 전 임시 결제 내역 저장 (금액 변조 원천 차단용)
     */
    @Transactional
    public void createReadyPayment(String orderId, Long amount) {
        Payment payment = new Payment(orderId, amount);
        paymentRepository.save(payment);
    }

    /**
     * [Step 2] 토스 결제 승인 + 기존 선물 생성 및 채팅 발송 전체 통합 로직
     */
    @Transactional
    public GiftResponse confirmPaymentAndCreateGift(Long senderId, PaymentConfirmRequest confirmRequest) {
        
        // 1. 오라클 DB에서 결제 대기 데이터 조회 및 금액 검증
        Payment payment = paymentRepository.findByOrderId(confirmRequest.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 주문 번호입니다."));

        if (!payment.getAmount().equals(confirmRequest.getAmount())) {
            payment.failPayment();
            throw new IllegalStateException("결제 요청 금액이 원본 금액과 다릅니다. (금액 변조 차단)");
        }

        if (payment.getStatus() == PaymentStatus.DONE) {
            throw new IllegalStateException("이미 처리가 완료된 결제 건입니다.");
        }

        // 2. 토스페이먼츠 외부 API 최종 승인 호출 주소 정확히 매핑
        String url = "https://api.tosspayments.com/v1/payments/confirm"; 
        RestTemplate restTemplate = new RestTemplate();

        String pair = secretKey + ":";
        String encryptedKey = Base64.getEncoder().encodeToString(pair.getBytes(StandardCharsets.UTF_8));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic " + encryptedKey);

        Map<String, Object> body = new HashMap<>();
        body.put("paymentKey", confirmRequest.getPaymentKey());
        body.put("orderId", confirmRequest.getOrderId());
        body.put("amount", confirmRequest.getAmount());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            org.springframework.core.ParameterizedTypeReference<Map<String, Object>> responseType = 
                    new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {};

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url, 
                    HttpMethod.POST, 
                    entity, 
                    responseType
            );
            
            Map<String, Object> responseBody = response.getBody();


            // 3. 결제 완료 및 선물 생성 (트랜잭션 내부)
            if (response.getStatusCode() == HttpStatus.OK && responseBody != null) {
                String method = (String) responseBody.get("method");
                String approvedAtStr = (String) responseBody.get("approvedAt");
                LocalDateTime approvedAt = ZonedDateTime.parse(approvedAtStr).toLocalDateTime();

                payment.completePayment(confirmRequest.getPaymentKey(), method, approvedAt);

                GiftResponse giftResponse = giftService.createGift(senderId, confirmRequest.getGiftInfo());
                
                Gift gift = giftRepository.findById(giftResponse.getId())
                        .orElseThrow(() -> new IllegalArgumentException("선물 저장 오류"));

                chatService.sendGiftMessage(gift);
                
                return giftResponse;
                
            } else {
                payment.failPayment();
                throw new RuntimeException("토스 승인 거절");
            }
        }catch (Exception e) {
            payment.failPayment();
            throw new RuntimeException("결제 처리 도중 예상치 못한 오류가 발생했습니다.", e);
        }
    }
}