package com.gift4u.app.domain.gift.dto;

import java.time.LocalDateTime;

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
	private Long product;
	private String productName;
	private GiftStatus status;
	private LocalDateTime createdAt;
	private LocalDateTime expiredAt;
	
	// 메시지 정보
	private String message;
	private Integer cardDesignType;
	
	// 선물 기본 정보 목록조회에 이용 (REQ-012, 013)
	public static GiftResponse from(Gift gift) {
		return GiftResponse.builder()
				.id(gift.getId())
				.uuid(gift.getUuid())
				.sender(gift.getSender().getId())
				.receiver(gift.getReceiver().getId())
				.product(gift.getProduct().getId())
				.productName(gift.getProduct().getName())
				.status(gift.getStatus())
				.createdAt(gift.getCreatedAt())
				.expiredAt(gift.getExpiredAt())
				.build();
	}
	
	// 선물 + 메시지 카드 정보 (REQ-013,014)
	public static GiftResponse from(Gift gift, GiftMessage giftMessage) {
		return GiftResponse.builder()
				.id(gift.getId())
				.uuid(gift.getUuid())
				.sender(gift.getSender().getId())
				.receiver(gift.getReceiver().getId())
				.product(gift.getProduct().getId())
				.productName(gift.getProduct().getName())
				.status(gift.getStatus())
				.createdAt(gift.getCreatedAt())
				.expiredAt(gift.getExpiredAt())
				.message(giftMessage.getMessage())
				.cardDesignType(giftMessage.getCardDesignType())
				.build();
	}

}
