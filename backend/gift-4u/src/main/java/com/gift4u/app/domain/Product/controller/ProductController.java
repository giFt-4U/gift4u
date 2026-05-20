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

    @GetMapping
    public Page<ProductResponse> getProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(defaultValue = "latest")
            String sort
    ) {
    	
        return productService.getProducts(
                page,
                size,
                sort
        );
    }
}