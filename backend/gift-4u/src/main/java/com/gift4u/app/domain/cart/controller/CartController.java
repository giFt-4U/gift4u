package com.gift4u.app.domain.cart.controller;

import com.gift4u.app.domain.cart.dto.CartItemResponse;
import com.gift4u.app.domain.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // 장바구니 목록 조회
    @GetMapping("/{cartId}")
    public List<CartItemResponse> getCartItems(
            @PathVariable Long cartId
    ) {
        return cartService.getCartItems(cartId);
    }
}