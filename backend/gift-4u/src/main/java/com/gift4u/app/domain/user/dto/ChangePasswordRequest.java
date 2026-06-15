package com.gift4u.app.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangePasswordRequest {

	@NotBlank
	private String currentPassword;

	@NotBlank
	@Size(min = 8, max = 100)
	private String newPassword;
}
