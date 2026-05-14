package com.gift4u.app.domain.chat;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftChatLinkRepository extends JpaRepository<GiftChatLink, Long>{
	Optional<GiftChatLink> findByGiftId(Long giftId);
}
