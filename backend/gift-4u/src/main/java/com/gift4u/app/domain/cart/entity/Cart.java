package com.gift4u.app.domain.cart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "carts")
@Getter
@NoArgsConstructor
public class Cart {

    @Id
    private Long id;

    private Long userId;

    private LocalDateTime createdAt;
}