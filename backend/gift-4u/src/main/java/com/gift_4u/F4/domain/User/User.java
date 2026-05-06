package com.gift_4u.F4.domain.User;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 유저 엔티티: 사용자 기본 정보 및 권한 관리
 * - 가입 시 기본값(LOCAL, USER) 설정을 위해 빌더 패턴 사용
 * - 객체 생성 안전성을 위해 기본 생성자는 PROTECTED로 제한
 */
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {
	
	public enum LoginProvider {
		LOCAL,
		KAKAO
	}
	
	public enum UserRole {
		USER,
		ADMIN
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
	@SequenceGenerator(name = "users_seq", sequenceName = "USERS_ID_SEQ", allocationSize = 1)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "kakao_id", length = 100, unique = true)
	private String kakaoId;
	
	@Column(name = "nickname", nullable = false, length = 50)
	private String nickname;
	
	@Column(name = "email", length = 100)
	private String email;
	
	@Column(name = "phone", length = 20)
	private String phone;
	
	@Column(name = "password", length = 255)
	private String password;
	
	@Column(name = "profile_image", length = 255)
	private String profileImage;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "login_provider", length = 20, nullable = false)
	@Builder.Default
	private LoginProvider loginProvider = LoginProvider.LOCAL; // DB에는 LOCAL/KAKAO 문자열 저장
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 10, nullable = false)
	@Builder.Default
	private UserRole role = UserRole.USER;
	
	@Column(name = "marketing_agreed", nullable = false)
    @Builder.Default
    private Boolean marketingAgreed = false; // 서비스 로직 편의를 위해 Boolean 사용
	
	@Column(name = "terms_agreed_at")
	private LocalDateTime termsAgreedAt;
	
	@CreatedDate
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
	
}//class
