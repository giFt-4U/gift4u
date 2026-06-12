package com.gift4u.app.domain.user.dto;

import com.gift4u.app.domain.user.enums.LoginProvider;
import com.gift4u.app.domain.user.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserProfileResponse {

	private Long id;
	private String email;
	private String nickname;
	private String phone;
	private String friendCode;
	private Boolean marketingAgreed;
	private String profileImage;
	
	private LoginProvider loginProvider;

	private UserRole role;
	
}
