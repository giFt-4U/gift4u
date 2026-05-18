package com.gift4u.app.domain.chat.entity;

import java.time.LocalDateTime;


import com.gift4u.app.domain.user.entity.User;

import jakarta.persistence.Entity;
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
@Table(name = "chat_rooms")
public class ChatRoom {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_a_id", nullable = false)
	private User userA;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_b_id", nullable = false)
	private User userB;
	
	private LocalDateTime createdAt;
	private LocalDateTime lastMessageAt;
	
	@Builder
	public ChatRoom(User userA, User userB) {
		this.userA = userA;
		this.userB = userB;
		this.createdAt = LocalDateTime.now();
	}
	
	public void updateLastMessageAt() {
		this.lastMessageAt = LocalDateTime.now();
	}
	
}
