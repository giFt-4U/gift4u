package com.gift4u.app.domain.Product.repository;

import com.gift4u.app.domain.Product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 🔥 검색 (LIKE)
    Page<Product> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );
}