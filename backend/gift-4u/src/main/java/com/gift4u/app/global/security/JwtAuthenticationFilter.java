package com.gift4u.app.global.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//HTTP 요청의 Authorization : Bearer 토큰을 검증하고,
//유효하면 {@Link SecurityContextHolder}에 {@Link UserDetails} 기반 인증을 넣는다.
//공개 URL(permitAll)은 토큰이 없어도 이 필터를 그냥 통과한다.
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String BEARER_PREFIX = "Bearer ";
	
	private final JwtTokenProvider jwtTokenProvider;
	private final UserDetailsService userDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//보호 API는 이후 authorize 단계에서 401 처리
		String header = request.getHeader(AUTHORIZATION_HEADER);
		if(header == null || !header.startsWith(BEARER_PREFIX)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String token = header.substring(BEARER_PREFIX.length()).trim();
		if(token.isEmpty()) {
			filterChain.doFilter(request, response);
			return;
		}
		
		try {
			Claims claims = jwtTokenProvider.parseClaims(token);
			String email = claims.get("email", String.class);
			
			if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(email);
				UsernamePasswordAuthenticationToken authentication = 
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (ExpiredJwtException e) {
			log.debug("JWT 만료 : {}", e.getMessage());
		} catch (JwtException e) {
			log.debug("JWT 검증 실패 : {}", e.getMessage());
		} catch (Exception e) {
			log.debug("JWT 처리 중 오류 : {}", e.getMessage());
		}
		
		filterChain.doFilter(request, response);
	}
}//class
