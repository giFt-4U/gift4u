package com.gift_4u.F4.domain.User.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift_4u.F4.domain.User.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByEmail(String email);
	Optional<User> findByKakaoId(String kakaoId);
	boolean existsByNickname(String nickname);
	boolean existsByEmail(String email);
	
}//interface
