package com.gift4u.app.domain.cart.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "carts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cart {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "carts_seq_generator"
    )
    @SequenceGenerator(
            name = "carts_seq_generator",
            sequenceName = "carts_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public static Cart create(Long userId) {

        Cart cart = new Cart();

        cart.userId = userId;
        cart.createdAt = LocalDateTime.now();

        return cart;
    }
}