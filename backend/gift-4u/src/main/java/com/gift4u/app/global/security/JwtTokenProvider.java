package com.gift4u.app.global.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.gift4u.app.domain.user.enums.UserRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

//JWT 엑세스 토큰 생성 및 검증(HS256)
//설정 : jwt.secret, jwt.access-token-validity-ms
@Component
public class JwtTokenProvider {

	private final SecretKey secretKey;
	private final long accessTokenValidityMs;
	
	public JwtTokenProvider(
			@Value("${jwt.secret}") String secret,
			@Value("${jwt.access-token-validity-ms}") long accessTokenValidityMs) {
	
		byte[] keyBytes = decodeSecretBytes(secret);
		this.secretKey = Keys.hmacShaKeyFor(keyBytes);
		this.accessTokenValidityMs = accessTokenValidityMs;
	}
	
	//시크릿 문자열을 바이트 배열로 만든다.
	//Base64면 디코딩하고, 아니면 UTF-8 바이트로 사용한다.
	private static byte[] decodeSecretBytes(String secret) {
		String trimmed = secret.trim();
		try {
			return Decoders.BASE64.decode(trimmed);
		} catch (Exception e) {
			return trimmed.getBytes(StandardCharsets.UTF_8);
		}
	}
	
	//로그인 성공 후 발급하는 엑세스 토큰.
	//subject : userId, 클레임 : email, role(필터에서 재조회 시 사용)
	public String createAccessToken(Long userId, String email, UserRole role) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + accessTokenValidityMs);
		
		return Jwts.builder()
				.subject(String.valueOf(userId))
				.claim("email", email)
				.claim("role", role.name())
				.issuedAt(now)
				.expiration(expiry)
				.signWith(secretKey)
				.compact();
	}
	
	//Authorization Bearer 토큰 문자열을 파싱한다.
	//만료 시 ExpiredJwtException - 필터에서 분기 처리 가능
	public Claims parseClaims(String token) throws ExpiredJwtException {
		return Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	//로그인 응답 등에서 만료 시간(ms)을 클라이언트에 알려줄 때 사용
	public long getAccessTokenValidityMs() {
		return accessTokenValidityMs;
	}
	
}//class