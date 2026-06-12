package com.gift4u.app.domain.user.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gift4u.app.domain.user.dto.SignupRequest;
import com.gift4u.app.domain.user.dto.SignupResponse;
import com.gift4u.app.domain.user.dto.UserProfileResponse;
import com.gift4u.app.domain.user.dto.UserProfileUpdateRequest;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.enums.LoginProvider;
import com.gift4u.app.domain.user.enums.UserRole;
import com.gift4u.app.domain.user.repository.UserRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private static final String FRIEND_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	private static final int FRIEND_CODE_LENGTH = 8;
	private static final int FRIEND_CODE_MAX_ATTEMPTS = 10;

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final ProfileImageStorageService profileImageStorageService;
	private final SecureRandom secureRandom = new SecureRandom();

	@Value("${app.base-url:http://localhost:8080}")
	private String baseUrl;

	@Transactional
	public SignupResponse signup(SignupRequest request) {
		if (!Boolean.TRUE.equals(request.getTermsAgreed())) {
		    throw new GlobalException(ErrorCode.TERMS_AGREEMENT_REQUIRED);
		}
		if (userRepository.existsByEmail(request.getEmail())) {
		    throw new GlobalException(ErrorCode.DUPLICATE_EMAIL);
		}
		if (userRepository.existsByNickname(request.getNickname())) {
		    throw new GlobalException(ErrorCode.DUPLICATE_NICKNAME);
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
	
	@Transactional(readOnly = true)
	public UserProfileResponse getMyProfile(Long userId) {
		User user = findActiveUser(userId);
		return toProfileResponse(user);
	}

	@Transactional
	public UserProfileResponse updateMyProfile(Long userId, UserProfileUpdateRequest request) {
		User user = findActiveUser(userId);

		if (userRepository.existsByNicknameAndIdNot(request.getNickname(), userId)) {
			throw new GlobalException(ErrorCode.DUPLICATE_NICKNAME);
		}

		String phone = request.getPhone();
		if (phone != null && phone.isBlank()) {
			phone = null;
		}

		user.updateProfile(request.getNickname(), phone);
		return toProfileResponse(user);
	}

	@Transactional
	public UserProfileResponse uploadProfileImage(Long userId, MultipartFile file) {
		User user = findActiveUser(userId);

		profileImageStorageService.deleteIfLocal(user.getProfileImage());

		String savedPath = profileImageStorageService.save(userId, file);
		user.updateProfileImage(savedPath);

		return toProfileResponse(user);
	}

	@Transactional
	public UserProfileResponse deleteProfileImage(Long userId) {
		User user = findActiveUser(userId);

		profileImageStorageService.deleteIfLocal(user.getProfileImage());
		user.clearProfileImage();

		return toProfileResponse(user);
	}

	private User findActiveUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
		if (user.getDeletedAt() != null) {
			throw new GlobalException(ErrorCode.USER_NOT_FOUND);
		}
		return user;
	}

	private UserProfileResponse toProfileResponse(User user) {
		return UserProfileResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.nickname(user.getNickname())
				.phone(user.getPhone())
				.friendCode(user.getFriendCode())
				.loginProvider(user.getLoginProvider())
				.marketingAgreed(user.getMarketingAgreed())
				.profileImage(resolveProfileImageUrl(user.getProfileImage()))
				.build();
	}

	private String resolveProfileImageUrl(String profileImage) {
		if (profileImage == null || profileImage.isBlank()) {
			return null;
		}
		if (profileImage.startsWith("http://") || profileImage.startsWith("https://")) {
			return profileImage;
		}
		return baseUrl + profileImage;
	}
	public String generateUniqueFriendCode() {
		for(int attempt = 0; attempt < FRIEND_CODE_MAX_ATTEMPTS; attempt++) {
			String code = randomFriendCode();
			if(!userRepository.existsByFriendCode(code)) {
				return code;
			}
		}
		throw new GlobalException(ErrorCode.FRIEND_CODE_GENERATION_FAILED);
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
