package com.gift4u.app.domain.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import com.gift4u.app.domain.chat.dto.ChatMessageRequest;
import com.gift4u.app.domain.chat.servicer.ChatService;
import com.gift4u.app.global.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

/** WebSocket(STOMP) 메시지 수신 컨트롤러 (REQ-C04)
 * 
 * 클라이언트 > 서버 송신 경로 : /app/chat/send
 * 
 * 흐름
 * 1. 클라이언트가 STOMP로 /app/chat/send 메시지 전송
 * 2. @MessageMapping("/chat/send") 수신
 * 3. ChatService.sendMessage() 저장 + 브로드캐스트
 */

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
	private final ChatService chatService;
	
	@MessageMapping("/chat/send")
	public void sendMessage(@AuthenticationPrincipal CustomUserDetails userDetails,
							@Payload ChatMessageRequest request) {
	    Long currentUserId = userDetails.getUser().getId();
		chatService.sendMessage(currentUserId, request);
	}
}
