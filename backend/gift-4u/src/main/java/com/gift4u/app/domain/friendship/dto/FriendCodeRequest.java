package com.gift4u.app.domain.friendship.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FriendCodeRequest {

	@NotBlank
	private String friendCode;
}
