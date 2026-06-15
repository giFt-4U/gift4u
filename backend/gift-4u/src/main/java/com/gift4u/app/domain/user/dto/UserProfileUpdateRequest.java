package com.gift4u.app.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateRequest {

	@NotBlank
	@Size(max = 50)
	private String nickname;

	@Size(max = 20)
	private String phone;
}
