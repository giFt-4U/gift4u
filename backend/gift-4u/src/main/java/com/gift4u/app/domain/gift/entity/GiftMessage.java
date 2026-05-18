package com.gift4u.app.domain.gift.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "gift_messages")
public class GiftMessage {

	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gift_messages_seq") 
	@SequenceGenerator(name = "gift_messages_seq", sequenceName = "GIFT_MESSAGES_ID_SEQ", allocationSize = 1) 
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="gift_id", nullable=false)
	private Gift gift;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String message;
	
	private Integer cardDesignType;
	private LocalDateTime createdAt;

	@Builder
	public GiftMessage(Gift gift, String message, Integer cardDesignType) {
		this.gift = gift;
		this.message = message;
		this.cardDesignType = cardDesignType;
		this.createdAt = LocalDateTime.now();
	}
	
}
