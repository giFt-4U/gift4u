package com.gift4u.app.domain.user.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.user.dto.SignupRequest;
import com.gift4u.app.domain.user.dto.SignupResponse;
import com.gift4u.app.domain.user.dto.UserProfileResponse;
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
}
