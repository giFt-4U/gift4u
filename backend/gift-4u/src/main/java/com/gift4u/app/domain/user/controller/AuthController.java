package com.gift4u.app.domain.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.user.dto.LoginRequest;
import com.gift4u.app.domain.user.dto.LoginResponse;
import com.gift4u.app.domain.user.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

//LOCAL 로그인 API
@RestController
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	
	@PostMapping("/api/auth/login")
	public LoginResponse login(@Valid @RequestBody LoginRequest request) {
		
		return authService.login(request);
	}
}
