package com.gift4u.app.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
    	
        http.csrf(csrf -> csrf.disable())
        	.sessionManagement(session -> session
        			.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
            		.requestMatchers("/api/auth/login", "/api/auth/signup").permitAll()
            		.requestMatchers("/").permitAll()
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
    
}