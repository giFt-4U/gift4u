package com.gift4u.app.domain.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.user.dto.SignupRequest;
import com.gift4u.app.domain.user.dto.SignupResponse;
import com.gift4u.app.domain.user.service.UserService;

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
}
