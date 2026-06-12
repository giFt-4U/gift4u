package com.gift4u.app.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

//로그인 성공 시 JWT를 내려준다
@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {

	private String accessToken;
	private String tokenType;
	private long expiresIn;
	
	public static LoginResponse of(String accessToken, long expiresInMs) {
		return LoginResponse.builder()
				.accessToken(accessToken)
				.tokenType("Bearer")
				.expiresIn(expiresInMs)
				.build();
	}

}
