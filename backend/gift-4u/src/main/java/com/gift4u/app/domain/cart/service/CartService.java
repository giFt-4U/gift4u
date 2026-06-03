package com.gift4u.app.domain.cart.service;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.cart.dto.CartAddRequest;
import com.gift4u.app.domain.cart.dto.CartItemResponse;
import com.gift4u.app.domain.cart.dto.CartQuantityUpdateRequest;
import com.gift4u.app.domain.cart.entity.Cart;
import com.gift4u.app.domain.cart.entity.CartItem;
import com.gift4u.app.domain.cart.repository.CartItemRepository;
import com.gift4u.app.domain.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

    private static final int MIN_QUANTITY = 1;
    private static final int MAX_QUANTITY = 99;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    // 장바구니 목록 조회
    public List<CartItemResponse> getCartItems(Long cartId) {

        List<CartItem> items =
                cartItemRepository.findByCart_Id(cartId);

        return items.stream()
                .map(this::toResponse)
                .toList();
    }

    // 장바구니 상품 추가
    @Transactional
    public CartItemResponse addCartItem(
            Long cartId,
            CartAddRequest request
    ) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException("장바구니가 없습니다.")
                );

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("상품이 없습니다.")
                );

        int quantity = clampQuantity(request.getQuantity());

        CartItem cartItem = cartItemRepository
                .findByCart_IdAndProduct_Id(
                        cartId,
                        request.getProductId()
                )
                .map(existingItem -> {

                    int newQuantity = clampQuantity(
                            existingItem.getQuantity() + quantity
                    );

                    existingItem.updateQuantity(newQuantity);

                    return existingItem;
                })
                .orElseGet(() -> {

                    CartItem newItem = CartItem.create(
                            cart,
                            product,
                            quantity
                    );

                    return cartItemRepository.save(newItem);
                });

        return toResponse(cartItem);
    }

    // 장바구니 상품 수량 변경
    @Transactional
    public CartItemResponse updateQuantity(
            Long cartItemId,
            CartQuantityUpdateRequest request
    ) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("장바구니 상품이 없습니다.")
                );

        int quantity = clampQuantity(request.getQuantity());

        cartItem.updateQuantity(quantity);

        return toResponse(cartItem);
    }

    // 장바구니 상품 삭제
    @Transactional
    public void deleteCartItem(Long cartItemId) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("장바구니 상품이 없습니다.")
                );

        cartItemRepository.delete(cartItem);
    }

    // 수량 최소 1개, 최대 99개 제한
    private int clampQuantity(int quantity) {

        if (quantity < MIN_QUANTITY) {
            return MIN_QUANTITY;
        }

        if (quantity > MAX_QUANTITY) {
            return MAX_QUANTITY;
        }

        return quantity;
    }

    // Entity -> DTO 변환
    private CartItemResponse toResponse(CartItem item) {

        Product product = item.getProduct();

        return CartItemResponse.builder()
                .id(item.getId())
                .productId(product.getId())
                .name(product.getName())
                .imageUrl(product.getImageUrl())
                .price(product.getPrice())
                .quantity(item.getQuantity())
                .build();
    }
}