package com.gift4u.app.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

//LOCAL 로그인 요청
@Getter
@NoArgsConstructor
public class LoginRequest {

	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	private String password;
}
