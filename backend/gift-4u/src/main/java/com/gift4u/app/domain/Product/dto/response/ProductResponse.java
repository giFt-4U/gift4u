package com.gift4u.app.domain.Product.dto.response;

import com.gift4u.app.domain.Product.entity.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductResponse {

    private Long id;

    private String prdImg;

    private String brandName;

    private String prdName;

    private Long prdPrice;

    public static ProductResponse from(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .prdImg(product.getImageUrl())
                .brandName("gift4u")
                .prdName(product.getName())
                .prdPrice(product.getPrice())
                .build();
    }
}