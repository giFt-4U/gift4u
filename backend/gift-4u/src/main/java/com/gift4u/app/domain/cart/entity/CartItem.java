package com.gift4u.app.domain.cart.entity;

import com.gift4u.app.domain.Product.entity.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CartItem {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cart_items_seq_generator"
    )
    @SequenceGenerator(
            name = "cart_items_seq_generator",
            sequenceName = "cart_items_seq",
            allocationSize = 1
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public static CartItem create(
            Cart cart,
            Product product,
            int quantity
    ) {

        CartItem cartItem = new CartItem();

        cartItem.cart = cart;
        cartItem.product = product;
        cartItem.quantity = quantity;
        cartItem.createdAt = LocalDateTime.now();

        return cartItem;
    }

    public void updateQuantity(int quantity) {
        this.quantity = quantity;
    }
}