package com.gift4u.app.domain.chat;

import com.gift4u.app.domain.gift.Gift;

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
@Table(name = "gift_chat_link")
public class GiftChatLink {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gift_id", nullable = false)
	private Gift gift;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id", nullable = false)
	private ChatRoom room;
	
	// system_message_id는 nullable (자동 발송 전 null 가능)
	private Long systemMessageId;
	
	@Builder
	public GiftChatLink(Gift gift, ChatRoom room, Long systemMessageId) {
		this.gift = gift;
		this.room = room;
		this.systemMessageId = systemMessageId;
	}

}
