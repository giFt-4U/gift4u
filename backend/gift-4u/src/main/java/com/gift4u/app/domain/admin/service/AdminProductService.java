package com.gift4u.app.domain.admin.service;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.admin.dto.request.AdminProductRequest;
import com.gift4u.app.domain.admin.dto.response.AdminProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminProductService {

    private final ProductRepository productRepository;

    public Page<AdminProductResponse> getProducts(
            String keyword,
            int page,
            int size
    ) {
        int safePage = Math.max(page, 0);
        int safeSize = size <= 0 ? 10 : size;

        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                Sort.by(Sort.Order.desc("id"))
        );

        Page<Product> products;

        if (keyword != null && !keyword.trim().isEmpty()) {
            String searchKeyword = keyword.trim();

            products = productRepository
                    .findByNameContainingIgnoreCaseOrBrandNameContainingIgnoreCase(
                            searchKeyword,
                            searchKeyword,
                            pageable
                    );
        } else {
            products = productRepository.findAll(pageable);
        }

        return products.map(AdminProductResponse::from);
    }

    public AdminProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        return AdminProductResponse.from(product);
    }

    @Transactional
    public AdminProductResponse createProduct(AdminProductRequest request) {
        Product product = new Product();

        applyRequest(product, request);

        if (product.getCreatedAt() == null) {
            product.setCreatedAt(LocalDateTime.now());
        }

        Product savedProduct = productRepository.save(product);

        return AdminProductResponse.from(savedProduct);
    }

    @Transactional
    public AdminProductResponse updateProduct(
            Long id,
            AdminProductRequest request
    ) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        applyRequest(product, request);

        Product savedProduct = productRepository.save(product);

        return AdminProductResponse.from(savedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        product.setIsActive(0);
        product.setDeletedAt(LocalDateTime.now());
    }

    private void applyRequest(
            Product product,
            AdminProductRequest request
    ) {
        product.setCategoryId(request.getCategoryId());
        product.setBrandName(request.getBrandName());
        product.setName(request.getName());
        product.setDescription(request.getDescription());

        product.setPrice(request.getPrice() == null ? 0 : request.getPrice());
        product.setStock(request.getStock() == null ? 0 : request.getStock());
        product.setSalesCount(request.getSalesCount() == null ? 0 : request.getSalesCount());

        product.setImageUrl(request.getImageUrl());

        if (request.getActive() == null || request.getActive()) {
            product.setIsActive(1);
            product.setDeletedAt(null);
        } else {
            product.setIsActive(0);

            if (product.getDeletedAt() == null) {
                product.setDeletedAt(LocalDateTime.now());
            }
        }
    }
}