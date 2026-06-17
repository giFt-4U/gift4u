package com.gift4u.app.domain.wishlist.dto;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.wishlist.entity.WishlistItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WishlistResponse {

    private Long id;
    private Long productId;

    private Long categoryId;
    private String brandName;
    private String name;
    private String description;
    private int price;
    private int stock;
    private String imageUrl;

    public static WishlistResponse from(WishlistItem item) {
        Product product = item.getProduct();

        return WishlistResponse.builder()
                .id(product.getId())
                .productId(product.getId())
                .categoryId(product.getCategoryId())
                .brandName(product.getBrandName())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .imageUrl(product.getImageUrl())
                .build();
    }
}