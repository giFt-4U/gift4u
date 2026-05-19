package com.gift4u.app.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.user.dto.LoginRequest;
import com.gift4u.app.domain.user.dto.LoginResponse;
import com.gift4u.app.domain.user.enums.LoginProvider;
import com.gift4u.app.domain.user.repository.UserRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;
import com.gift4u.app.global.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

//LOCAL 로그인 : 비밀번호 검증 후 JWT 발급
@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	
	public LoginResponse login(LoginRequest request) {
		var user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new GlobalException(ErrorCode.INVALID_LOGIN_CREDENTIALS));
		
		//소프트 삭제된 계정은 로그인 불가
		if(user.getDeletedAt() != null) {
			throw new GlobalException(ErrorCode.INVALID_LOGIN_CREDENTIALS);
		}
		
		//카카오 등 소셜 전용 계정은 이 API로 로그인하지 않음
		if(user.getLoginProvider() != LoginProvider.LOCAL) {
			throw new GlobalException(ErrorCode.INVALID_LOGIN_CREDENTIALS);
		}
		
		//저장된 해시와 평문 비밀번호 비교 (BCrypt)
		if(user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new GlobalException(ErrorCode.INVALID_LOGIN_CREDENTIALS);
		}
		
		String token = jwtTokenProvider.createAccessToken(user.getId(), user.getEmail(), user.getRole());
		return LoginResponse.of(token, jwtTokenProvider.getAccessTokenValidityMs());
	}
}//class
