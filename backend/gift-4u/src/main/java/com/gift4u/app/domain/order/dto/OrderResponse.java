package com.gift4u.app.domain.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderResponse {

    private Long id;

    private Long userId;

    private String receiverName;

    private String receiverPhone;

    private String address;

    private String addressDetail;

    private String zipCode;

    private String deliveryMemo;

    private int totalProductPrice;

    private int deliveryFee;

    private int finalPrice;

    private String orderStatus;

    private String paymentStatus;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;
}