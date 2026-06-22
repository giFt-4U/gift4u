package com.gift4u.app.domain.Product.repository;

import com.gift4u.app.domain.Product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 검색
    Page<Product> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    // 관리자 검색: 상품명 또는 브랜드명
    Page<Product> findByNameContainingIgnoreCaseOrBrandNameContainingIgnoreCase(
            String name,
            String brandName,
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

    // 일반 사용자용: 활성 상품만 조회
    @Query("""
            SELECT p
            FROM Product p
            WHERE p.isActive = 1
              AND (
                  :keyword IS NULL
                  OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
              )
              AND (
                  :categoryId IS NULL
                  OR p.categoryId = :categoryId
              )
              AND (
                  :brandName IS NULL
                  OR p.brandName = :brandName
              )
            """)
    Page<Product> findActiveProducts(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("brandName") String brandName,
            Pageable pageable
    );

    // 일반 사용자용: 활성 상품 상세 조회
    Optional<Product> findByIdAndIsActive(
            Long id,
            int isActive
    );
}