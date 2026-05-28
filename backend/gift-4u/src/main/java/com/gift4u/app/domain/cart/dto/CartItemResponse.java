package com.gift4u.app.domain.cart.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartItemResponse {

    private Long id;
    private Long productId;

    private String name;
    private String imageUrl;

    private int price;
    private int quantity;
}