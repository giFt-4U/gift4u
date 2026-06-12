package com.gift4u.app.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.payment.entity.Payment;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(String orderId);
}