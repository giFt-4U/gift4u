package com.gift4u.app.domain.Product.controller;

import com.gift4u.app.domain.Product.dto.response.ProductResponse;
import com.gift4u.app.domain.Product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 📌 리스트 + 검색 + 카테고리
    @GetMapping
    public Page<ProductResponse> getProducts(

            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "popular") String sort
    ) {

        return productService.getProducts(
                keyword,
                categoryId,
                page,
                size,
                sort
        );
    }

    // 📌 상품 상세
    @GetMapping("/{id}")
    public ProductResponse getProduct(
            @PathVariable Long id
    ) {
        return productService.getProduct(id);
    }
}