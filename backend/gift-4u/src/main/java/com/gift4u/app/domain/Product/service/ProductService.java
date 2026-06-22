package com.gift4u.app.domain.Product.service;

import com.gift4u.app.domain.Product.dto.response.ProductResponse;
import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final int ACTIVE = 1;

    private final ProductRepository productRepository;

    public Page<ProductResponse> getProducts(
            String keyword,
            Long categoryId,
            String brandName,
            int page,
            int size,
            String sort
    ) {

        int safePage = Math.max(page, 0);
        int safeSize = size <= 0
                ? 10
                : Math.min(size, 100);
                
        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                getSort(sort)
        );

        String normalizedKeyword =
                keyword != null && !keyword.trim().isEmpty()
                        ? keyword.trim()
                        : null;

        Long normalizedCategoryId =
                categoryId != null && categoryId != 0
                        ? categoryId
                        : null;

        String normalizedBrandName =
                brandName != null && !brandName.trim().isEmpty()
                        ? brandName.trim()
                        : null;

        // 일반 사용자 화면에서는 활성 상품만 조회
        Page<Product> result = productRepository.findActiveProducts(
                normalizedKeyword,
                normalizedCategoryId,
                normalizedBrandName,
                pageable
        );

        return result.map(ProductResponse::from);
    }

    public ProductResponse getProduct(Long id) {

        // 일반 사용자 상세 화면에서도 비활성 상품 제외
        Product product = productRepository
                .findByIdAndIsActive(id, ACTIVE)
                .orElseThrow(() ->
                        new RuntimeException("상품 없음")
                );

        return ProductResponse.from(product);
    }

    private Sort getSort(String sort) {

        if ("popular".equals(sort)) {
            return Sort.by(
                    Sort.Order.desc("salesCount"),
                    Sort.Order.desc("id")
            );
        }

        if ("latest".equals(sort)) {
            return Sort.by(
                    Sort.Order.desc("id")
            );
        }

        if ("priceAsc".equals(sort)) {
            return Sort.by(
                    Sort.Order.asc("price"),
                    Sort.Order.desc("id")
            );
        }

        if ("priceDesc".equals(sort)) {
            return Sort.by(
                    Sort.Order.desc("price"),
                    Sort.Order.desc("id")
            );
        }

        return Sort.by(
                Sort.Order.desc("salesCount"),
                Sort.Order.desc("id")
        );
    }
}