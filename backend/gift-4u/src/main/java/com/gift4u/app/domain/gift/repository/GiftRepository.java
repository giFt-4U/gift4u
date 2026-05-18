package com.gift4u.app.domain.gift.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.gift.entity.Gift;

public interface GiftRepository extends JpaRepository<Gift, Long> {
	Optional<Gift> findByUuid(String uuid);
	
	// 내가 보낸 선물 목록 (REQ-012)
	List<Gift> findAllBySenderId(Long senderId);
	
	// 내가 받은 선물 목록 (REQ-013)
	List<Gift> findAllByReceiverId(Long receiverId);
}
