package com.gift4u.app.domain.user.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gift4u.app.domain.user.dto.SignupRequest;
import com.gift4u.app.domain.user.dto.SignupResponse;
import com.gift4u.app.domain.user.dto.UserProfileResponse;
import com.gift4u.app.domain.user.dto.UserProfileUpdateRequest;
import com.gift4u.app.domain.user.service.UserService;
import com.gift4u.app.global.security.CustomUserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PostMapping("/api/auth/signup")
	public SignupResponse signup(@Valid @RequestBody SignupRequest request) {
		return userService.signup(request);
	}
	
	@GetMapping("/api/users/me")
	public UserProfileResponse getMe(@AuthenticationPrincipal CustomUserDetails userDetails) {
		return userService.getMyProfile(userDetails.getUser().getId());
	}

	@PatchMapping("/api/users/me")
	public UserProfileResponse updateMe(
			@AuthenticationPrincipal CustomUserDetails userDetails,
			@Valid @RequestBody UserProfileUpdateRequest request) {
		return userService.updateMyProfile(userDetails.getUser().getId(), request);
	}

	@PostMapping(value = "/api/users/me/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public UserProfileResponse uploadProfileImage(
			@AuthenticationPrincipal CustomUserDetails userDetails,
			@RequestParam("file") MultipartFile file) {
		return userService.uploadProfileImage(userDetails.getUser().getId(), file);
	}

	@DeleteMapping("/api/users/me/profile-image")
	public UserProfileResponse deleteProfileImage(
			@AuthenticationPrincipal CustomUserDetails userDetails) {
		return userService.deleteProfileImage(userDetails.getUser().getId());
	}
}
