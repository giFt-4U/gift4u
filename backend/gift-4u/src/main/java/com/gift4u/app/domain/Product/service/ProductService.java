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

    private final ProductRepository productRepository;

    // 📌 리스트 + 검색 통합 (Home + ProductPage + Search)
    public Page<ProductResponse> getProducts(
            String keyword,
            int page,
            int size,
            String sort
    ) {

        Pageable pageable;

        if ("popular".equals(sort)) {
            pageable = PageRequest.of(page, size,
                    Sort.by("salesCount").descending());
        } else {
            pageable = PageRequest.of(page, size,
                    Sort.by("id").descending());
        }

        Page<Product> result;

        // 🔥 검색 여부 분기
        if (keyword != null && !keyword.trim().isEmpty()) {
            result = productRepository
                    .findByNameContainingIgnoreCase(keyword, pageable);
        } else {
            result = productRepository.findAll(pageable);
        }

        return result.map(ProductResponse::from);
    }

    // 📌 상세
    public ProductResponse getProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품 없음"));

        return ProductResponse.from(product);
    }
}