package com.gift4u.app.domain.user.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.user.dto.AdminUserResponse;
import com.gift4u.app.domain.user.service.AdminUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    // 회원 목록 조회 (검색, 상태 필터, 페이징)
    @GetMapping
    public Page<AdminUserResponse> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return adminUserService.getUsers(search, status, pageable);
    }

    // 회원 상세 조회
    @GetMapping("/{userId}")
    public AdminUserResponse getUser(@PathVariable Long userId) {
        return adminUserService.getUser(userId);
    }
}
