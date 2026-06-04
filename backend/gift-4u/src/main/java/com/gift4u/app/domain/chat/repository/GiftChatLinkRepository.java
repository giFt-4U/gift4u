package com.gift4u.app.domain.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.chat.entity.GiftChatLink;

public interface GiftChatLinkRepository extends JpaRepository<GiftChatLink, Long>{
	Optional<GiftChatLink> findByGiftId(Long giftId);
}
