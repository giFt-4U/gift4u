package com.gift4u.app.domain.admin.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdminProductRequest {

    private Long categoryId;

    private String brandName;

    private String name;

    private String description;

    private Integer price;

    private Integer stock;

    private Integer salesCount;

    private String imageUrl;

    private Boolean active;
}