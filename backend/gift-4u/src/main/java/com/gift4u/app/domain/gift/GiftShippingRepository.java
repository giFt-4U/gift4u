package com.gift4u.app.domain.gift;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftShippingRepository extends JpaRepository<GiftShipping, Long>{
	boolean existsByGiftId(Long giftId);
}
