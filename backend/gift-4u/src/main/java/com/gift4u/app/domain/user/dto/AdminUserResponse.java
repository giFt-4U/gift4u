package com.gift4u.app.domain.user.dto;

import java.time.LocalDateTime;

import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.enums.LoginProvider;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminUserResponse {

    private Long id;
    private String email;
    private String nickname;
    private String phone;
    private String friendCode;
    private String profileImage;
    private LoginProvider loginProvider;
    private Boolean marketingAgreed;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    public static AdminUserResponse from(User user, String resolvedProfileImage) {
        return AdminUserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .phone(user.getPhone())
                .friendCode(user.getFriendCode())
                .profileImage(resolvedProfileImage)
                .loginProvider(user.getLoginProvider())
                .marketingAgreed(user.getMarketingAgreed())
                .createdAt(user.getCreatedAt())
                .deletedAt(user.getDeletedAt())
                .build();
    }
}
