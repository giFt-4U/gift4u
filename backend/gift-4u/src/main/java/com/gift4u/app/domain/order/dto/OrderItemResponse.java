package com.gift4u.app.domain.order.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemResponse {

    private Long id;

    private Long productId;

    private String productName;

    private String productImageUrl;

    private int quantity;

    private int orderPrice;

    private int totalPrice;
}