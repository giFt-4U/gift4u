package com.gift4u.app.global.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gift4u.app.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

//이메일로 DB 유저를 조회해 UserDetails로 감싼다
//JWT 필터에서 토큰의 email 클레임으로 호출된다
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//username = 로그인 이메일 (JwtAuthenticationFilter와 동일해야 한다)
		var user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException(username));
		if(user.getDeletedAt() != null) {
			throw new UsernameNotFoundException(username);
		}
		return new CustomUserDetails(user);
	}
	
}//class
