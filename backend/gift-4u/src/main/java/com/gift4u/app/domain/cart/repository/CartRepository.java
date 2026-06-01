package com.gift4u.app.domain.cart.repository;

import com.gift4u.app.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}