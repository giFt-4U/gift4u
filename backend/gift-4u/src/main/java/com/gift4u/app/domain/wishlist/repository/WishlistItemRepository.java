package com.gift4u.app.domain.wishlist.repository;

import com.gift4u.app.domain.wishlist.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<WishlistItem> findByUserIdAndProduct_Id(Long userId, Long productId);

    boolean existsByUserIdAndProduct_Id(Long userId, Long productId);
}