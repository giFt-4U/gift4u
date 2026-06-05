package com.gift4u.app.domain.Product.repository;

import com.gift4u.app.domain.Product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    // 검색
    Page<Product> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    // 카테고리
    Page<Product> findByCategoryId(
            Long categoryId,
            Pageable pageable
    );

    // 브랜드
    Page<Product> findByBrandName(
            String brandName,
            Pageable pageable
    );

    // 검색 + 카테고리
    Page<Product> findByNameContainingIgnoreCaseAndCategoryId(
            String keyword,
            Long categoryId,
            Pageable pageable
    );

    // 검색 + 브랜드
    Page<Product> findByNameContainingIgnoreCaseAndBrandName(
            String keyword,
            String brandName,
            Pageable pageable
    );

    // 카테고리 + 브랜드
    Page<Product> findByCategoryIdAndBrandName(
            Long categoryId,
            String brandName,
            Pageable pageable
    );

    // 검색 + 카테고리 + 브랜드
    Page<Product> findByNameContainingIgnoreCaseAndCategoryIdAndBrandName(
            String keyword,
            Long categoryId,
            String brandName,
            Pageable pageable
    );
}