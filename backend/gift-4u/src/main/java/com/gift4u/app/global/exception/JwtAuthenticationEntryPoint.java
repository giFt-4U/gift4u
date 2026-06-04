package com.gift4u.app.global.exception;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tools.jackson.databind.ObjectMapper;

/** Security Filter 단계에서 인증 실패 시 401 응답을 반환하는 핸들러
 * 
 * @ExceptionHandler는 DispatcherServlet 이후에 동작하므로,
 * 필터 단계 - JWT 검증실패, 토큰없음 등에서 발생한 예외를 놓친다.
 * 때문에 EntryPoint를 SecurityConfig에 등록해야 필터단 401이 정상 포맷으로 내려간다.
 */

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	
	private final ObjectMapper objectMapper;
	
	@Override
	public void commence(HttpServletRequest request,
						 HttpServletResponse response,
						 AuthenticationException authException) throws IOException {
		log.warn("[AuthEntryPoint] 인증 실패 - uri ={}, message={}", request.getRequestURI(), authException.getMessage());
				
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
				
				ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.UNAUTHORIZED);
				response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
	}

}
