package com.gift4u.app.domain.gift.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.gift.entity.GiftMessage;

public interface GiftMessageRepository extends JpaRepository <GiftMessage, Long>{
	Optional<GiftMessage> findByGiftId(Long giftId);
}
