package com.gift4u.app.domain.user.dto.client;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KakaoUserProfile {

	private Long kakaoId;
	private String nickname;
	private String profileImageUrl;
	private String email;
}
