package com.gift4u.app.domain.admin.dto.response;

import com.gift4u.app.domain.Product.entity.Product;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AdminProductResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private String brandName;

    private String name;

    private String description;

    private int price;

    private int stock;

    private int salesCount;

    private String imageUrl;

    private boolean active;

    private int isActive;

    private LocalDateTime createdAt;

    private LocalDateTime deletedAt;

    public static AdminProductResponse from(Product product) {
        return AdminProductResponse.builder()
                .id(product.getId())
                .categoryId(product.getCategoryId())
                .categoryName(getCategoryName(product.getCategoryId()))
                .brandName(product.getBrandName())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .salesCount(product.getSalesCount())
                .imageUrl(product.getImageUrl())
                .active(product.getIsActive() == 1)
                .isActive(product.getIsActive())
                .createdAt(product.getCreatedAt())
                .deletedAt(product.getDeletedAt())
                .build();
    }

    private static String getCategoryName(Long categoryId) {
        if (categoryId == null) {
            return "미분류";
        }

        if (categoryId == 1) return "브랜드";
        if (categoryId == 2) return "위생";
        if (categoryId == 3) return "수유";
        if (categoryId == 4) return "라이프";
        if (categoryId == 5) return "세탁/세척";
        if (categoryId == 6) return "맘케어";
        if (categoryId == 7) return "베이비케어";

        return "미분류";
    }
}