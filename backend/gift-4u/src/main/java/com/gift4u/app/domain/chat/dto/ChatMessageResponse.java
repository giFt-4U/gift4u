package com.gift4u.app.domain.chat.dto;

import java.time.LocalDateTime;

import com.gift4u.app.domain.chat.ChatMessage;
import com.gift4u.app.domain.chat.MessageType;

import lombok.Builder;
import lombok.Getter;

/** 메시지 조회 및 실시간 수신 시 반환 DTO (REQ-018 / 019)
 * 1. GET	/api/chat/rooms/{roomId}/message	// 과거 메시지 페이징 조회 응답
 * 2. Websocket broadcast -> 실시간 메시지 수신 시 구독자에게 전달
 */

@Getter
@Builder
public class ChatMessageResponse {
	private Long id;
	private Long roomId;
	private Long senderId;
	private String content;
	private MessageType messageType;
	private LocalDateTime createdAt;
	
	public static ChatMessageResponse from(ChatMessage message) {
		return ChatMessageResponse.builder()
				.id(message.getId())
				.roomId(message.getRoom().getId())
				.senderId(message.getSenderId())
				.content(message.getContent())
				.messageType(message.getMessageType())
				.createdAt(message.getCreatedAt())
				.build();
	}
}
