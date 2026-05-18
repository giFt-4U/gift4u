package com.gift4u.app.domain.gift.dto;

import java.time.LocalDateTime;

import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.enums.GiftStatus;

import lombok.Builder;
import lombok.Getter;

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

}
