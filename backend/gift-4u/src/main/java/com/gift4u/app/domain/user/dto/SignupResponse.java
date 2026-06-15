package com.gift4u.app.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SignupResponse {

	private Long id;
	private String email;
	private String nickname;
	private String friendCode;
	private String loginProvider;
	
}
