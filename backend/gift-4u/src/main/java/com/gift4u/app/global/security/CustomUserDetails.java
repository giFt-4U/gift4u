package com.gift4u.app.global.security;

import java.util.Collection;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.gift4u.app.domain.user.entity.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

//Spring Security가 인증 주체로 쓰는 UserDetails 구현체
//JWT 필터에서 토큰 검증 후 SecurityContext에 올릴 때 사용한다
@Getter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	private final User user;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// 예 : ROLE_USER, ROLE_ADMIN (@PreAuthorize 등과 연동)
		return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
	}

	@Override
	public @Nullable String getPassword() {
		//LOCAL : 해시, KAKAO 등 : null 가능
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		//UserDetailsService에서 이메일로 조회하는 값과 동일해야 함
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		//탈퇴(소프트 삭제) 계정은 비활성
		return user.getDeletedAt() == null;
	}
	
	
}
