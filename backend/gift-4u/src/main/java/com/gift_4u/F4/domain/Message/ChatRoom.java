package com.gift_4u.F4.domain.Message;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="chat_rooms")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long userAId;
	private Long userBId;
	
	private LocalDateTime createdAt;
	private LocalDateTime lastMessageAt;

	public ChatRoom(Long userAId, Long userBId) {
		this.userAId = userAId;
		this.userBId = userBId;
	}
}
