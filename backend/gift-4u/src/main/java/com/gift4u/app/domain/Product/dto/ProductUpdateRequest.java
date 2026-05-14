package com.gift4u.app.domain.Product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductUpdateRequest {

    private String name;
    private String description;
    private Long price;
    private Long stock;
    private String imageUrl;
}