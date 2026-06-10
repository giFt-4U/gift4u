package com.gift4u.app.global.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.gift4u.app.global.exception.JwtAccessDeniedHandler;
import com.gift4u.app.global.exception.JwtAuthenticationEntryPoint;
import com.gift4u.app.global.security.JwtAuthenticationFilter;

//JWT 기반 API 보안 설정
//세션을 쓰지 않고(Stateless), 공개 URL만 permiatAll로 두고 나머지는 인증 필요
//인증, 권한 오류는 JwtAuthenticationEntryPoint / JwtAccessDeniedHandler로 JSON 응답한다
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
    		HttpSecurity http,
    		JwtAuthenticationFilter jwtAuthenticationFilter,
    		JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
    		JwtAccessDeniedHandler jwtAccessDeniedHandler) throws Exception {
    	
        http
	    	// 1. CSRF 비활성화 ------------------
	    	.csrf(csrf -> csrf.disable())
	    	
	        // 2. CORS 설정 	 ------------------
	    	.cors(cors ->cors.configurationSource(corsConfigurationSource()))
	    	
	    	// 3. 보안 응답 헤더 ------------------
	        .headers(headers -> headers
	                .xssProtection(xss -> xss
	                    .headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
	                .frameOptions(frame -> frame.deny())
	                .contentTypeOptions(contentType -> {})
	        		)
	        // 4. JWT 인가	 ------------------
        	.sessionManagement(session -> session
        			.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
            		.requestMatchers("/api/auth/login", "/api/auth/signup", "/api/auth/kakao").permitAll()
            	    .requestMatchers("/ws/**").permitAll()
            		.requestMatchers("/").permitAll()
            		.requestMatchers(HttpMethod.GET, "/api/gifts/**").permitAll()
            		.requestMatchers(HttpMethod.GET, "/api/products", "/api/products/**")
            			.permitAll()
            		.anyRequest().authenticated())
            .addFilterBefore(jwtAuthenticationFilter, 
            		UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(ex -> ex
            		.authenticationEntryPoint(jwtAuthenticationEntryPoint)
            		.accessDeniedHandler(jwtAccessDeniedHandler));
            		
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

    
    /** CORS 설정 **/
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
      		// 프론트 로컬 (배포 시 실제 도메인 추가)
            "http://localhost:5173"
        ));
        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // 모든 경로 적용
        return source;
    }

    
}