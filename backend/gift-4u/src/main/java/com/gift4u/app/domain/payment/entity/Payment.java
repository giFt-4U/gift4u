package com.gift4u.app.domain.payment.entity;

import java.time.LocalDateTime;

import com.gift4u.app.domain.payment.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PAYMENT")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ORDER_ID", nullable = false, unique = true)
    private String orderId;

    @Column(name = "PAYMENT_KEY")
    private String paymentKey;

    @Column(name = "AMOUNT", nullable = false)
    private Long amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private PaymentStatus status = PaymentStatus.READY;

    @Column(name = "METHOD")
    private String method;

    @Column(name = "APPROVED_AT")
    private LocalDateTime approvedAt;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    protected Payment() {
    }

    // 임시 결제 등록을 위한 생성자
    public Payment(String orderId, Long amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.status = PaymentStatus.READY;
    }

    // 결제 최종 완료 처리 메서드
    public void completePayment(String paymentKey, String method, LocalDateTime approvedAt) {
        this.paymentKey = paymentKey;
        this.method = method;
        this.approvedAt = approvedAt;
        this.status = PaymentStatus.DONE;
        this.updatedAt = LocalDateTime.now();
    }

    // 결제 실패 처리 메서드
    public void failPayment() {
        this.status = PaymentStatus.FAIL;
        this.updatedAt = LocalDateTime.now();
    }
	
	public PaymentStatus getStatus() {
	    return this.status;
	}
	
	public Long getAmount() {
	    return this.amount;
	}
	
}