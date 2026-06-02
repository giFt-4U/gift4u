package com.gift4u.app.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

	@NotBlank
	@Email
	@Size(max = 100)
	private String email;
	
	@NotBlank
	@Size(min = 8, max =100)
	private String password;
	
	@NotBlank
	@Size(max = 50)
	private String nickname;
	
	@Size(max = 20)
	private String phone;
	
	@NotNull
	private Boolean marketingAgreed = false;
	
	@NotNull
	private Boolean termsAgreed;
}
