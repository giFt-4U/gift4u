package com.gift4u.app.domain.chat.dto;

import com.gift4u.app.domain.chat.enums.MessageType;

import lombok.Getter;
import lombok.NoArgsConstructor;

  /**  WebSocket 수신용 (REQ-018)
   * REST API가 아닌 STOMP 메시지의 payload(본문)으로 전달
   * JSON 형태
   * */

@Getter
@NoArgsConstructor
public class ChatMessageRequest {
	private Long roomId;
	private String content;
	private MessageType messageType;	// TEXT or GIFT
	private Long giftId;				// GIFT 타입일 때만 사용
}
