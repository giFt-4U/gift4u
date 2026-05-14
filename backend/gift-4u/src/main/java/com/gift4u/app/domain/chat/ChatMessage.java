package com.gift4u.app.domain.chat;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "chat_messages")
public class ChatMessage {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="room_id", nullable=false)
	private ChatRoom room;
	
	@Column(nullable = false)
	private Long senderId;
	
	@Column(nullable=false, columnDefinition = "TEXT")
	private String content;
	
	@Enumerated(EnumType.STRING)
	private MessageType messageType;
	
	private LocalDateTime createdAt;
	
	@Builder
	public ChatMessage(ChatRoom room, Long senderId, String content, MessageType messageType) {
		this.room = room;
		this.senderId = senderId;
		this.content = content;
		this.messageType = messageType;
		this.createdAt = LocalDateTime.now();
	}

}
