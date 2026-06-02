package com.gift4u.app.domain.order.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "orders_seq_generator"
    )
    @SequenceGenerator(
            name = "orders_seq_generator",
            sequenceName = "orders_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    private String address;

    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "delivery_memo")
    private String deliveryMemo;

    @Column(name = "total_product_price")
    private int totalProductPrice;

    @Column(name = "delivery_fee")
    private int deliveryFee;

    @Column(name = "final_price")
    private int finalPrice;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    public static Order create(
            Long userId,
            String receiverName,
            String receiverPhone,
            String address,
            String addressDetail,
            String zipCode,
            String deliveryMemo,
            int totalProductPrice,
            int deliveryFee,
            int finalPrice
    ) {
        Order order = new Order();

        order.userId = userId;
        order.receiverName = receiverName;
        order.receiverPhone = receiverPhone;
        order.address = address;
        order.addressDetail = addressDetail;
        order.zipCode = zipCode;
        order.deliveryMemo = deliveryMemo;
        order.totalProductPrice = totalProductPrice;
        order.deliveryFee = deliveryFee;
        order.finalPrice = finalPrice;
        order.orderStatus = "ORDERED";
        order.paymentStatus = "READY";
        order.createdAt = LocalDateTime.now();

        return order;
    }
}