package com.gift4u.app.domain.gift.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.gift.entity.GiftShipping;

public interface GiftShippingRepository extends JpaRepository<GiftShipping, Long>{
	boolean existsByGiftId(Long giftId);
}
