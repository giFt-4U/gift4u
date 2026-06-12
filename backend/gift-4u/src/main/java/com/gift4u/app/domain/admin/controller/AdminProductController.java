package com.gift4u.app.domain.admin.controller;

import com.gift4u.app.domain.admin.dto.request.AdminProductRequest;
import com.gift4u.app.domain.admin.dto.response.AdminProductResponse;
import com.gift4u.app.domain.admin.service.AdminProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;

    @GetMapping
    public Page<AdminProductResponse> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return adminProductService.getProducts(
                keyword,
                page,
                size
        );
    }

    @GetMapping("/{id}")
    public AdminProductResponse getProduct(
            @PathVariable Long id
    ) {
        return adminProductService.getProduct(id);
    }

    @PostMapping
    public AdminProductResponse createProduct(
            @RequestBody AdminProductRequest request
    ) {
        return adminProductService.createProduct(request);
    }

    @PutMapping("/{id}")
    public AdminProductResponse updateProduct(
            @PathVariable Long id,
            @RequestBody AdminProductRequest request
    ) {
        return adminProductService.updateProduct(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(
            @PathVariable Long id
    ) {
        adminProductService.deleteProduct(id);
    }
}