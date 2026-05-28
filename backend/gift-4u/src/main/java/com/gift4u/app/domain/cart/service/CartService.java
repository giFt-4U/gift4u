package com.gift4u.app.domain.cart.service;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.cart.dto.CartItemResponse;
import com.gift4u.app.domain.cart.entity.Cart;
import com.gift4u.app.domain.cart.entity.CartItem;
import com.gift4u.app.domain.cart.repository.CartItemRepository;
import com.gift4u.app.domain.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    // 장바구니 조회
    public List<CartItemResponse> getCartItems(Long cartId) {

        List<CartItem> items =
                cartItemRepository.findByCartId(cartId);

        return items.stream()
                .map(item -> CartItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .name(item.getProduct().getName())
                        .imageUrl(item.getProduct().getImageUrl())
                        .price(item.getProduct().getPrice())
                        .quantity(item.getQuantity())
                        .build())
                .toList();
    }
}