package com.gift4u.app.domain.user.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.user.dto.SignupRequest;
import com.gift4u.app.domain.user.dto.SignupResponse;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.enums.LoginProvider;
import com.gift4u.app.domain.user.enums.UserRole;
import com.gift4u.app.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private static final String FRIEND_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	private static final int FRIEND_CODE_LENGTH = 8;
	private static final int FRIEND_CODE_MAX_ATTEMPTS = 10;

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final SecureRandom secureRandom = new SecureRandom();

	@Transactional
	public SignupResponse signup(SignupRequest request) {
		if(!Boolean.TRUE.equals(request.getTermsAgreed())) {
			throw new IllegalArgumentException("약관에 동의해야 가입할 수 있습니다.");
		}
		
		if(userRepository.existsByEmail(request.getEmail())) {
			throw new IllegalStateException("이미 가입된 이메일입니다.");
		}
		
		if(userRepository.existsByNickname(request.getNickname())) {
			throw new IllegalStateException("이미 사용 중인 닉네임입니다.");
		}
		
		String friendCode = generateUniqueFriendCode();
		
		User user = User.builder()
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.nickname(request.getNickname())
				.phone(request.getPhone())
				.marketingAgreed(Boolean.TRUE.equals(request.getMarketingAgreed()))
				.termsAgreedAt(LocalDateTime.now())
				.loginProvider(LoginProvider.LOCAL)
				.role(UserRole.USER)
				.friendCode(friendCode)
				.build();
		
		User saved = userRepository.save(user);
		return SignupResponse.builder()
				.id(saved.getId())
				.email(saved.getEmail())
				.nickname(saved.getNickname())
				.friendCode(saved.getFriendCode())
				.loginProvider(saved.getLoginProvider().name())
				.build();	
	}
	
	private String generateUniqueFriendCode() {
		for(int attempt = 0; attempt < FRIEND_CODE_MAX_ATTEMPTS; attempt++) {
			String code = randomFriendCode();
			if(!userRepository.existsByFriendCode(code)) {
				return code;
			}
		}
		throw new IllegalStateException("친구 코드 생성에 실패했습니다. 다시 시도해 주세요.");
	}
	
	private String randomFriendCode() {
		StringBuilder sb = new StringBuilder(FRIEND_CODE_LENGTH);
		for(int i = 0; i < FRIEND_CODE_LENGTH; i++) {
			int idx = secureRandom.nextInt(FRIEND_CODE_CHARS.length());
			sb.append(FRIEND_CODE_CHARS.charAt(idx));		
		}
		return sb.toString();
	}
	
	
}//class
