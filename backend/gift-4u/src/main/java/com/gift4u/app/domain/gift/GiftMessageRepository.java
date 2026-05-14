package com.gift4u.app.domain.gift;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftMessageRepository extends JpaRepository <GiftMessage, Long>{
	Optional<GiftMessage> findByGiftId(Long giftId);
}
