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

    public Page<ProductResponse> getProducts(
            String keyword,
            Long categoryId,
            String brandName,
            int page,
            int size,
            String sort
    ) {

        int safePage = Math.max(page, 0);
        int safeSize = size <= 0 ? 10 : size;

        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                getSort(sort)
        );

        Page<Product> result;

        boolean hasKeyword =
                keyword != null && !keyword.trim().isEmpty();

        boolean hasCategory =
                categoryId != null && categoryId != 0;

        boolean hasBrand =
                brandName != null && !brandName.trim().isEmpty();

        if (hasKeyword && hasCategory && hasBrand) {

            result = productRepository
                    .findByNameContainingIgnoreCaseAndCategoryIdAndBrandName(
                            keyword.trim(),
                            categoryId,
                            brandName.trim(),
                            pageable
                    );

        } else if (hasKeyword && hasCategory) {

            result = productRepository
                    .findByNameContainingIgnoreCaseAndCategoryId(
                            keyword.trim(),
                            categoryId,
                            pageable
                    );

        } else if (hasKeyword && hasBrand) {

            result = productRepository
                    .findByNameContainingIgnoreCaseAndBrandName(
                            keyword.trim(),
                            brandName.trim(),
                            pageable
                    );

        } else if (hasCategory && hasBrand) {

            result = productRepository
                    .findByCategoryIdAndBrandName(
                            categoryId,
                            brandName.trim(),
                            pageable
                    );

        } else if (hasKeyword) {

            result = productRepository
                    .findByNameContainingIgnoreCase(
                            keyword.trim(),
                            pageable
                    );

        } else if (hasCategory) {

            result = productRepository
                    .findByCategoryId(
                            categoryId,
                            pageable
                    );

        } else if (hasBrand) {

            result = productRepository
                    .findByBrandName(
                            brandName.trim(),
                            pageable
                    );

        } else {

            result = productRepository.findAll(pageable);
        }

        return result.map(ProductResponse::from);
    }

    public ProductResponse getProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("상품 없음")
                );

        return ProductResponse.from(product);
    }

    private Sort getSort(String sort) {

        if ("popular".equals(sort)) {
            return Sort.by("salesCount").descending();
        }

        if ("latest".equals(sort)) {
            return Sort.by("id").descending();
        }

        return Sort.by("id").descending();
    }
}