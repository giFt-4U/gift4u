package com.gift4u.app.domain.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartAddRequest {

    private Long productId;

    private int quantity;
}