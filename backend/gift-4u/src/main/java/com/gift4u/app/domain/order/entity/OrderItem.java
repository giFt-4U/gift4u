package com.gift4u.app.domain.order.entity;

import com.gift4u.app.domain.Product.entity.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_items")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_items_seq_generator"
    )
    @SequenceGenerator(
            name = "order_items_seq_generator",
            sequenceName = "order_items_seq",
            allocationSize = 1
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_image_url")
    private String productImageUrl;

    private int quantity;

    @Column(name = "order_price")
    private int orderPrice;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public static OrderItem create(
            Order order,
            Product product,
            int quantity
    ) {
        OrderItem orderItem = new OrderItem();

        orderItem.order = order;
        orderItem.product = product;
        orderItem.productName = product.getName();
        orderItem.productImageUrl = product.getImageUrl();
        orderItem.quantity = quantity;
        orderItem.orderPrice = product.getPrice();
        orderItem.createdAt = LocalDateTime.now();

        return orderItem;
    }

    public int getTotalPrice() {
        return orderPrice * quantity;
    }
}