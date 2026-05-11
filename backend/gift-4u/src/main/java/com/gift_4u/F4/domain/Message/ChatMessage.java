package com.gift_4u.F4.domain.Message;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="chat_messages")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long senderId;
	private Long roomId;
	

	@Enumerated(EnumType.STRING)
	private MessageType type;
	
	private String content;
	private Long giftId;
	
	private LocalDateTime createdAt;
	
	public ChatMessage(Long roomId, Long senderId, MessageType type,
							String content, Long giftId, LocalDateTime createdAt) {
		this.roomId = roomId;
		this.senderId = senderId;
		this.type = type;
		this.content = content;
		this.giftId = giftId;
		this.createdAt = createdAt;
	}
}
