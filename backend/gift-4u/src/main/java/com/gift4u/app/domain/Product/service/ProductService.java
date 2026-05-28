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

    // 📌 상품 리스트 + 검색 + 카테고리 통합
    // HomePage / ProductPage / SearchPage 공통 사용
    public Page<ProductResponse> getProducts(
            String keyword,
            Long categoryId,
            int page,
            int size,
            String sort
    ) {

        // 📌 정렬 조건
        Pageable pageable;

        // 인기순
        if ("popular".equals(sort)) {

            pageable = PageRequest.of(
                    page,
                    size,
                    Sort.by("salesCount").descending()
            );

        }
        // 최신순
        else {

            pageable = PageRequest.of(
                    page,
                    size,
                    Sort.by("id").descending()
            );
        }

        Page<Product> result;

        // ==================================================
        // 📌 검색 + 카테고리 같이 사용하는 경우
        // ex) 기저귀 검색 + 위생 카테고리
        // ==================================================
        if (
                keyword != null
                && !keyword.trim().isEmpty()
                && categoryId != null
                && categoryId != 0
        ) {

            result = productRepository
                    .findByNameContainingIgnoreCaseAndCategoryId(
                            keyword,
                            categoryId,
                            pageable
                    );
        }

        // ==================================================
        // 📌 검색만 사용하는 경우
        // ex) 기저귀 검색
        // ==================================================
        else if (
                keyword != null
                && !keyword.trim().isEmpty()
        ) {

            result = productRepository
                    .findByNameContainingIgnoreCase(
                            keyword,
                            pageable
                    );
        }

        // ==================================================
        // 📌 카테고리만 사용하는 경우
        // ex) 위생 카테고리 클릭
        // ==================================================
        else if (
                categoryId != null
                && categoryId != 0
        ) {

            result = productRepository
                    .findByCategoryId(
                            categoryId,
                            pageable
                    );
        }

        // ==================================================
        // 📌 전체 상품 조회
        // ex) 메인페이지 전체 상품
        // ==================================================
        else {

            result = productRepository.findAll(pageable);
        }

        // 📌 Entity → Response DTO 변환
        return result.map(ProductResponse::from);
    }

    // 📌 상품 상세 조회
    public ProductResponse getProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("상품 없음")
                );

        return ProductResponse.from(product);
    }
}