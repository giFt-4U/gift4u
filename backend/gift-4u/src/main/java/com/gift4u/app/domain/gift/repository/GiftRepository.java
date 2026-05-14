package com.gift4u.app.domain.gift.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.gift.entity.Gift;

public interface GiftRepository extends JpaRepository<Gift, Long> {
	Optional<Gift> findByUuid(String uuid);
}
