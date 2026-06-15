package com.gift4u.app.domain.gift.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.enums.GiftStatus;

public interface GiftRepository extends JpaRepository<Gift, Long> {
	Optional<Gift> findByUuid(String uuid);
	
	// 내가 보낸 선물 목록 (REQ-012)
	@EntityGraph(attributePaths = {"giftMessage"})
	List<Gift> findAllBySenderId(Long senderId);
	
	// 내가 받은 선물 목록 (REQ-013)
	List<Gift> findAllByReceiverId(Long receiverId);
	
	/** 스케쥴러 전용 **/
	List<Gift> findAllByStatusAndExpiredAtBefore(GiftStatus staus, LocalDateTime expiredAt);

    // 같은 송신자가 특정 시간대(결제 동시 인서트 시간)에 보낸 선물 목록 조회
    List<Gift> findAllBySenderIdAndCreatedAtBetween(Long senderId, LocalDateTime start, LocalDateTime end);
}
