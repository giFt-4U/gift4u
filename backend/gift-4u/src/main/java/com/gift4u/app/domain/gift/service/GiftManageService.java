package com.gift4u.app.domain.gift.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.gift.dto.GiftResponse;
import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.repository.GiftRepository;
import com.gift4u.app.domain.payment.dto.PaymentConfirmRequest;
import com.gift4u.app.domain.payment.entity.Payment;
import com.gift4u.app.domain.payment.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GiftManageService {

    private final PaymentService paymentService;
    private final GiftService giftService;
    private final GiftRepository giftRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processExpirationAndRefund(Long giftId) {
        Gift gift = giftRepository.findById(giftId)
                .orElseThrow(() -> new IllegalArgumentException("선물이 존재하지 않습니다."));
        
        // 1. 선물 만료 처리
        gift.expire();
        
        // 2. 결제 정보 취소 처리
        Payment payment = gift.getPayment(); 
        if (payment != null && payment.getPaymentKey() != null) {
            paymentService.cancelPayment(payment.getPaymentKey(), "선물 기간 만료 자동 환불");
            payment.cancel(); 
        }
    }
    

    @Transactional
    public GiftResponse confirmAndCreate(Long senderId, PaymentConfirmRequest confirmRequest) {
        // 1. 결제 최종 승인 진행 (PaymentService 호출)
        Payment payment = paymentService.confirmPayment(confirmRequest);

        // 2. 승인 완료된 결제 객체를 매핑하여 선물 생성 (GiftService 호출)
        GiftResponse giftResponse = giftService.createGift(senderId, confirmRequest.getGiftInfo(), payment);

        // 3. 채팅 메시지 발송
        Gift gift = giftRepository.findById(giftResponse.getId())
                .orElseThrow(() -> new IllegalArgumentException("선물 저장 오류"));

        return giftResponse;
    }
    
}
