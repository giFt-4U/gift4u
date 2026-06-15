package com.gift4u.app.domain.wishlist.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gift4u.app.domain.wishlist.dto.WishlistResponse;
import com.gift4u.app.domain.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 내 위시리스트 조회
    @GetMapping("/me")
    public List<WishlistResponse> getMyWishlist(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        Long userId = getUserIdFromToken(authorization);

        return wishlistService.getUserWishlist(userId);
    }

    // 내 위시리스트에 상품 추가
    @PostMapping("/products/{productId}")
    public void addWishlist(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long productId
    ) {
        Long userId = getUserIdFromToken(authorization);

        wishlistService.addWishlist(userId, productId);
    }

    // 내 위시리스트에서 상품 삭제
    @DeleteMapping("/products/{productId}")
    public void removeWishlist(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long productId
    ) {
        Long userId = getUserIdFromToken(authorization);

        wishlistService.removeWishlist(userId, productId);
    }

    private Long getUserIdFromToken(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }

        try {
            String token = authorization.replace("Bearer ", "");
            String[] parts = token.split("\\.");

            if (parts.length < 2) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다.");
            }

            String payloadJson = new String(
                    Base64.getUrlDecoder().decode(parts[1]),
                    StandardCharsets.UTF_8
            );

            JsonNode payload = objectMapper.readTree(payloadJson);
            String userId = payload.get("sub").asText();

            return Long.valueOf(userId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰에서 사용자 정보를 읽을 수 없습니다.");
        }
    }
}