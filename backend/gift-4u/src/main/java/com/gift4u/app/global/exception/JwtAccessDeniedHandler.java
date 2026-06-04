package com.gift4u.app.global.exception;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tools.jackson.databind.ObjectMapper;

/** Security Filter 단게에서 권한 없음(403) 발생 시 응답 핸들러
 * JwtAuthenticaltiuonEntryPoint와 동일한 이유로 별도 구현
 */

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
	
	private final ObjectMapper objectMapper;
	
	@Override
	public void handle (HttpServletRequest request,
			 			HttpServletResponse response,
			 			AccessDeniedException accessDeniedException) throws IOException {
		log.warn("[AccessDeniedHandler] 권한 없음 - uri={}", request.getRequestURI());
		
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
		
		ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.FORBIDDEN);
		response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
	}
}
