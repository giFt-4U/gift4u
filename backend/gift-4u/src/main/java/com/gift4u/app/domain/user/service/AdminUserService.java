package com.gift4u.app.domain.user.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.user.dto.AdminUserResponse;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.repository.UserRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @Transactional(readOnly = true)
    public Page<AdminUserResponse> getUsers(String search, String status, Pageable pageable) {
        Page<User> users;

        if (search != null && !search.isBlank()) {
            users = userRepository.findByNicknameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    search.trim(), search.trim(), pageable);
        } else if ("active".equals(status)) {
            users = userRepository.findByDeletedAtIsNull(pageable);
        } else if ("deleted".equals(status)) {
            users = userRepository.findByDeletedAtIsNotNull(pageable);
        } else {
            users = userRepository.findAll(pageable);
        }

        return users.map(u -> AdminUserResponse.from(u, resolveImageUrl(u.getProfileImage())));
    }

    @Transactional(readOnly = true)
    public AdminUserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
        return AdminUserResponse.from(user, resolveImageUrl(user.getProfileImage()));
    }

    private String resolveImageUrl(String profileImage) {
        if (profileImage == null || profileImage.isBlank()) return null;
        if (profileImage.startsWith("http://") || profileImage.startsWith("https://")) return profileImage;
        return baseUrl + profileImage;
    }
}
