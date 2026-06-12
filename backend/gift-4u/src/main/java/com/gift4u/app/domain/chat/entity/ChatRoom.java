package com.gift4u.app.domain.chat.entity;

import java.time.LocalDateTime;


import com.gift4u.app.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "chat_rooms")
public class ChatRoom {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_rooms_seq") 
	@SequenceGenerator(name = "chat_rooms_seq", sequenceName = "CHAT_ROOMS_ID_SEQ", allocationSize = 1) 
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_a_id", nullable = false)
	private User userA;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_b_id", nullable = false)
	private User userB;
	
	private LocalDateTime createdAt;
	private LocalDateTime lastMessageAt;

	@Column(name = "user_a_left", nullable = false)
	private Boolean userALeft = false;
	
	@Column(name = "user_b_left", nullable = false)
	private Boolean userBLeft = false;
	
	@Builder
	public ChatRoom(User userA, User userB) {
		this.userA = userA;
		this.userB = userB;
		this.createdAt = LocalDateTime.now();
		this.lastMessageAt = LocalDateTime.now();
	}
	
	public void updateLastMessageAt() {
		this.lastMessageAt = LocalDateTime.now();
	}
	
	/**
	 * 채팅방 나가기.
	 * 나간 사람의 left 플래그만 true로 변경.
	 * 상대방 채팅방은 유지.
	 */
	public void leave(Long userId) {
	    if (this.userA.getId().equals(userId)) {
	        this.userALeft = true;
	    } else if (this.userB.getId().equals(userId)) {
	        this.userBLeft = true;
	    }
	}
	
	/**
	 * 채팅방 재입장.
	 * 나갔던 사람의 Left 플래그를 false로 되돌려 목록에 다시 표시.
	 * getOrCreateRoom()에서 기존 방 재활성화 시 호출.
	 */
	public void rejoin(Long userId) {
	    if (this.userA.getId().equals(userId)) {
	        this.userALeft = false;
	    } else if (this.userB.getId().equals(userId)) {
	        this.userBLeft = false;
	    }
	}
	
}
