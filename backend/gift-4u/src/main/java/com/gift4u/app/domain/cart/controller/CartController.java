package com.gift4u.app.domain.cart.controller;

import com.gift4u.app.domain.cart.dto.CartAddRequest;
import com.gift4u.app.domain.cart.dto.CartItemResponse;
import com.gift4u.app.domain.cart.dto.CartQuantityUpdateRequest;
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

    // 장바구니 상품 추가
    @PostMapping("/{cartId}/items")
    public CartItemResponse addCartItem(
            @PathVariable Long cartId,
            @RequestBody CartAddRequest request
    ) {
        return cartService.addCartItem(cartId, request);
    }

    // 장바구니 상품 수량 변경
    @PatchMapping("/items/{cartItemId}")
    public CartItemResponse updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody CartQuantityUpdateRequest request
    ) {
        return cartService.updateQuantity(cartItemId, request);
    }

    // 장바구니 상품 삭제
    @DeleteMapping("/items/{cartItemId}")
    public void deleteCartItem(
            @PathVariable Long cartItemId
    ) {
        cartService.deleteCartItem(cartItemId);
    }
}