package com.gift4u.app.domain.user.dto.client;


import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

@Component
public class KakaoOAuthClient {

	private static final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";
	private static final String USER_ME_URL = "https://kapi.kakao.com/v2/user/me";
	
	private final RestClient restClient;
	private final String restApiKey;
	private final String clientSecret;
	private final String redirectUri;
	
	public KakaoOAuthClient(
			@Value("${kakao.rest-api-key}") String restApiKey,
			@Value("${kakao.client-secret}") String clientSecret,
			@Value("${kakao.redirect-uri}") String redirectUri) {
		this.restClient = RestClient.create();
		this.restApiKey = restApiKey;
		this.clientSecret = clientSecret;
		this.redirectUri = redirectUri;
	}
	
	//code -> access_token -> 유저 정보
	public KakaoUserProfile getUserProfile(String code) {
		String accessToken = requestAccessToken(code);
		return requestUserProfile(accessToken);
	}
	
	private String requestAccessToken(String code) {
		MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
		form.add("grant_type", "authorization_code");
		form.add("client_id", restApiKey);
		form.add("redirect_uri", redirectUri);
		form.add("code", code);
		form.add("client_secret", clientSecret);
		
		try {
			Map<?, ?> body = restClient.post()
					.uri(TOKEN_URL)
					.contentType(MediaType.APPLICATION_FORM_URLENCODED)
					.body(form)
					.retrieve()
					.body(Map.class);
			
			if(body == null || body.get("access_token") == null) {
				throw new GlobalException(ErrorCode.KAKAO_AUTH_FAILED);
			}
			return body.get("access_token").toString();
		} catch (RestClientException e) {
			throw new GlobalException(ErrorCode.KAKAO_AUTH_FAILED);
		}
	}
	
	@SuppressWarnings("unchecked")
	private KakaoUserProfile requestUserProfile(String accessToken) {
		try {
			Map<String, Object> body = restClient.get()
					.uri(USER_ME_URL)
					.header("Authorization", "Bearer " + accessToken)
					.retrieve()
					.body(Map.class);
			
			if(body == null || body.get("id") == null) {
				throw new GlobalException(ErrorCode.KAKAO_AUTH_FAILED);
			}
			
			Long kakaoId = Long.valueOf(body.get("id").toString());
			
			String nickname = null;
			String profileImageUrl = null;
			String email = null;
			
			Object kakaoAccountObj = body.get("kakao_account");
			if(kakaoAccountObj instanceof Map<?, ?> kakaoAccount) {
				Object emailObj = kakaoAccount.get("email");
				if(emailObj != null) {
					email = emailObj.toString();
				}
				
				Object profileObj = kakaoAccount.get("profile");
				if(profileObj instanceof Map<?, ?> profile) {
					Object nicknameObj = profile.get("nickname");
					if(nicknameObj != null) {
						nickname = nicknameObj.toString();
					}
					Object imageObj = profile.get("profile_image_url");
					if(imageObj != null) {
						profileImageUrl = imageObj.toString();
					}
				}
			}
			
			if(nickname == null || nickname.isBlank()) {
				nickname = "kakao_" + kakaoId;
			}
			
			return new KakaoUserProfile(kakaoId, nickname, profileImageUrl, email);
		} catch (RestClientException e) {
			throw new GlobalException(ErrorCode.KAKAO_AUTH_FAILED);
		}
	}
}
