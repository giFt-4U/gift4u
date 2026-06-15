package com.gift4u.app.domain.wishlist.service;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.wishlist.dto.WishlistResponse;
import com.gift4u.app.domain.wishlist.entity.WishlistItem;
import com.gift4u.app.domain.wishlist.repository.WishlistItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<WishlistResponse> getUserWishlist(Long userId) {
        return wishlistItemRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(WishlistResponse::from)
                .toList();
    }

    @Transactional
    public void addWishlist(Long userId, Long productId) {
        boolean exists = wishlistItemRepository.existsByUserIdAndProduct_Id(userId, productId);

        if (exists) {
            return;
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        WishlistItem wishlistItem = WishlistItem.builder()
                .userId(userId)
                .product(product)
                .build();

        wishlistItemRepository.save(wishlistItem);
    }

    @Transactional
    public void removeWishlist(Long userId, Long productId) {
        wishlistItemRepository.findByUserIdAndProduct_Id(userId, productId)
                .ifPresent(wishlistItemRepository::delete);
    }
}