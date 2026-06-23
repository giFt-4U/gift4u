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

import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.repository.GiftRepository;
import com.gift4u.app.domain.payment.dto.PaymentConfirmRequest;
import com.gift4u.app.domain.payment.entity.Payment;
import com.gift4u.app.domain.payment.enums.PaymentStatus;
import com.gift4u.app.domain.payment.repository.PaymentRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

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
    private final GiftRepository giftRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    

    @Value("${toss.secret-key}")
    private String secretKey;
    
    public void someMethod(String uuid) {
        Gift gift = giftRepository.findByUuid(uuid)
                .orElseThrow(() -> new IllegalArgumentException("선물 없음"));
    }
    
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
    public Payment confirmPayment(PaymentConfirmRequest confirmRequest) {
        
        // 1. 결제 대기 데이터 조회 및 금액 검증
        Payment payment = paymentRepository.findByOrderId(confirmRequest.getOrderId())
                .orElseThrow(() -> new GlobalException(ErrorCode.PAYMENT_NOT_FOUND));
        
        if (!payment.getAmount().equals(confirmRequest.getAmount())) {
            payment.failPayment();
            throw new IllegalStateException("결제 요청 금액이 원본 금액과 다릅니다. (금액 변조 차단)");
        }

        if (payment.getStatus() == PaymentStatus.DONE) {
            throw new IllegalStateException("이미 처리가 완료된 결제 건입니다.");
        }

        // 2. 토스페이먼츠 외부 API 최종 승인 호출
        String url = "https://api.tosspayments.com/v1/payments/confirm"; 
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
                    url, HttpMethod.POST, entity, responseType
            );
            
            Map<String, Object> responseBody = response.getBody();

            // 3. 결제 완료 처리 후 엔티티 리턴
            if (response.getStatusCode() == HttpStatus.OK && responseBody != null) {
                String method = (String) responseBody.get("method");
                String approvedAtStr = (String) responseBody.get("approvedAt");
                LocalDateTime approvedAt = ZonedDateTime.parse(approvedAtStr).toLocalDateTime();

                payment.completePayment(confirmRequest.getPaymentKey(), method, approvedAt);
                
                return payment;
                
            } else {
                payment.failPayment();
                throw new RuntimeException("토스 승인 거절");
            }
        } catch (Exception e) {
            payment.failPayment();
            throw new RuntimeException("결제 처리 도중 예상치 못한 오류가 발생했습니다.", e);
        }
    }
    
    /**
     * [Step3] 환불 API 호출
     */
    public void cancelPayment(String paymentKey, String cancelReason) {
        String url = "https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel";

        // 1. 토스 API는 시크릿 키 뒤에 콜론(:)을 붙여 Base64 인코딩한 값을 Basic Auth로 사용합니다.
        String encodedKey = Base64.getEncoder().encodeToString((secretKey + ":").getBytes(StandardCharsets.UTF_8));
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + encodedKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 2. 토스 취소 API 필수 Request Body 구성
        Map<String, Object> body = new HashMap<>();
        body.put("cancelReason", cancelReason);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            // 3. POST 요청 송신 (테스트 환경이므로 무조건 200 OK와 함께 취소 성공 JSON이 반환됩니다)
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new GlobalException(ErrorCode.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            // 테스트 환경이라도 네트워크 오류 등이 날 수 있으므로 예외 전파
            throw new RuntimeException("Toss Payments 취소 API 호출 실패: " + e.getMessage(), e);
        }
    }
}