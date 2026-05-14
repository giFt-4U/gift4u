package com.gift4u.app.domain.gift;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftRepository extends JpaRepository<Gift, Long> {
	Optional<Gift> findByUuid(String uuid);
}
