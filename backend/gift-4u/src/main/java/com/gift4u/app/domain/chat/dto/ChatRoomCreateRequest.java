package com.gift4u.app.domain.chat.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 채팅방 생성/조회 요청 DTO (REQ-C02)
 * POST	/api/chat/romms 의 RequestBody 
 */
@Getter
@NoArgsConstructor
public class ChatRoomCreateRequest {
	
	@NotNull(message ="상대방 ID는 필수입니다.")
	private Long opponentId;

}
