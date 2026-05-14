package com.gift4u.app.domain.Product.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id

    @SequenceGenerator(
            name = "products_seq_generator",
            sequenceName = "products_seq",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "products_seq_generator"
    )

    private Long id;

    private String name;

    private String description;

    private Long price;

    private Long originalPrice;

    private Long stock;

    private Long salesCount;

    private String imageUrl;

    private Integer isActive;

    private Date createdAt;

    private Date deletedAt;
}