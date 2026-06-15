package com.gift4u.app.domain.gift.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GiftCreateRequest {

	@NotNull
	private Long receiverId;
	
	@NotNull
	private Long productId;
	
	// REQ-010
	@NotBlank
	@Size(max = 200, message = "메시지는 200자를 초과할 수 없습니다.")
	private String message;
	
	@NotNull
	@Min(1) @Max(3)
	private Integer cardDesignType;
}
