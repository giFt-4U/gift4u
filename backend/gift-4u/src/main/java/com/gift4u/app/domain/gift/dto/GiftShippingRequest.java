package com.gift4u.app.domain.gift.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 선물 수령 시 배송지 입력 요청 DTO (REQ-014)
 * PATCH   /api/gifts/{id}/accept 호출 시 Body로 전달
 */
@Getter
@NoArgsConstructor
public class GiftShippingRequest {

	@NotBlank
	private String recipientName;
	
	@NotBlank
	private String recipientPhone;
	
	@NotBlank
	private String address;
	
	private String addressDetail;
	private String zipCode;
}
