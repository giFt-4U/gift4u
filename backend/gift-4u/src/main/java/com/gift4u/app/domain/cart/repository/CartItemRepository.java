package com.gift4u.app.domain.cart.repository;

import com.gift4u.app.domain.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // 특정 장바구니의 상품 목록 조회
    List<CartItem> findByCart_Id(Long cartId);

    // 같은 상품이 이미 장바구니에 담겨있는지 확인
    Optional<CartItem> findByCart_IdAndProduct_Id(
            Long cartId,
            Long productId
    );
}