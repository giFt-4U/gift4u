package com.gift_4u.F4.domain.Gift;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Table(name="gift_messages")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GiftMessage {
	

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int cardDesignType;
	
	@Column(columnDefinition = "TEXT")
	private String message;

	private LocalDateTime created_at;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gift_id")
	private Gift gift;
}