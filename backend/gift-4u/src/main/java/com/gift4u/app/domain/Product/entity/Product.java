package com.gift4u.app.domain.Product.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "products_seq_generator"
    )
    @SequenceGenerator(
            name = "products_seq_generator",
            sequenceName = "products_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "category_id")
    private Long categoryId;

    private String name;

    private String description;

    private int price;

    private int stock;

    @Column(name = "sales_count")
    private int salesCount;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_active")
    private int isActive;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}