package com.gift4u.app.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByEmail(String email);
	Optional<User> findByKakaoId(String kakaoId);
	boolean existsByNickname(String nickname);
	boolean existsByNicknameAndIdNot(String nickname, Long id);
	boolean existsByEmail(String email);
	
	boolean existsByFriendCode(String friendCode);
	
	Optional<User> findByFriendCode(String friendCode);
}//interface
