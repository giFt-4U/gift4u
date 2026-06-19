package com.gift4u.app.domain.gift.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.entity.GiftMessage;
import com.gift4u.app.domain.gift.enums.GiftStatus;

import lombok.Builder;
import lombok.Getter;

/** 선물 응답
 * 1. from(Gift)			 - 선물 기본 정보(목록 조회용)
 * 2. from(Gfit, GiftMessage)- 선물 + 메시지 카드 정보 (상세조회/ 수령)
 */
@Getter
@Builder
public class GiftResponse {

    private Long id;
    private String uuid;

    private Long sender;
    private Long receiver;

    // 기존 호환용
    private Long product;

    // 프론트 호환용
    private Long productId;

    private String productName;

    // 상품 썸네일 이미지
    private String imageUrl;

    private GiftStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;

    // 메시지 카드 정보
    private String message;
    private Integer cardDesignType;

    // 사용자가 카드에 업로드한 이미지
    private String uploadedImgUrl;

    // 기존 호환용
    private List<String> bundleProductNames;

    // 프론트에서 상품 상세 API 재조회할 때 사용 가능
    private List<Long> bundleProductIds;

    // 권장: 프론트가 바로 렌더링할 수 있는 상품 묶음
    private List<BundleProductResponse> bundleProducts;

    @Getter
    @Builder
    public static class BundleProductResponse {
        private Long productId;
        private String name;
        private String imageUrl;

        public static BundleProductResponse from(Product product) {
            return BundleProductResponse.builder()
                    .productId(product.getId())
                    .name(product.getName())
                    .imageUrl(product.getImageUrl())
                    .build();
        }
    }

    public static GiftResponse from(Gift gift) {
        Product productEntity = gift.getProduct();

        return GiftResponse.builder()
                .id(gift.getId())
                .uuid(gift.getUuid())
                .sender(gift.getSender().getId())
                .receiver(gift.getReceiver().getId())

                .product(productEntity.getId())
                .productId(productEntity.getId())
                .productName(productEntity.getName())
                .imageUrl(productEntity.getImageUrl())

                .status(gift.getStatus())
                .createdAt(gift.getCreatedAt())
                .expiredAt(gift.getExpiredAt())
                .build();
    }

    public static GiftResponse from(Gift gift, GiftMessage giftMessage) {
        Product productEntity = gift.getProduct();

        return GiftResponse.builder()
                .id(gift.getId())
                .uuid(gift.getUuid())
                .sender(gift.getSender().getId())
                .receiver(gift.getReceiver().getId())

                .product(productEntity.getId())
                .productId(productEntity.getId())
                .productName(productEntity.getName())
                .imageUrl(productEntity.getImageUrl())

                .status(gift.getStatus())
                .createdAt(gift.getCreatedAt())
                .expiredAt(gift.getExpiredAt())

                .message(giftMessage != null ? giftMessage.getMessage() : "선물이 도착했습니다.")
                .cardDesignType(giftMessage != null ? giftMessage.getCardDesignType() : 1)
                .uploadedImgUrl(giftMessage != null ? giftMessage.getUploadedImgUrl() : null)

                .build();
    }

    public static GiftResponse from(
            Gift gift,
            GiftMessage giftMessage,
            List<BundleProductResponse> bundleProducts
    ) {
        Product productEntity = gift.getProduct();

        return GiftResponse.builder()
                .id(gift.getId())
                .uuid(gift.getUuid())
                .sender(gift.getSender().getId())
                .receiver(gift.getReceiver().getId())

                .product(productEntity.getId())
                .productId(productEntity.getId())
                .productName(productEntity.getName())
                .imageUrl(productEntity.getImageUrl())

                .status(gift.getStatus())
                .createdAt(gift.getCreatedAt())
                .expiredAt(gift.getExpiredAt())

                .message(giftMessage != null ? giftMessage.getMessage() : "선물이 도착했습니다.")
                .cardDesignType(giftMessage != null ? giftMessage.getCardDesignType() : 1)
                .uploadedImgUrl(giftMessage != null ? giftMessage.getUploadedImgUrl() : null)

                .bundleProductNames(
                        bundleProducts.stream()
                                .map(BundleProductResponse::getName)
                                .toList()
                )
                .bundleProductIds(
                        bundleProducts.stream()
                                .map(BundleProductResponse::getProductId)
                                .toList()
                )
                .bundleProducts(bundleProducts)

                .build();
    }
}
