package com.gift4u.app.domain.chat.dto;

import java.time.LocalDateTime;

import com.gift4u.app.domain.chat.ChatRoom;

import lombok.Builder;
import lombok.Getter;

/** 채팅방 목록 조회 시 반환하는 DTO (REQ-015)
 * 내 채팅방 목록에서 상대방 정보 + 마지막 메시지 시각을 보여주는 구조
 */
@Getter
@Builder
public class ChatRoomResponse {
	private Long roomId;
	private Long opponentId;
	private String opponentNickname;
	private LocalDateTime lastMessageAt;
	
	/** ChatRoom은 userA, userB를 가지고 있음
	 * 현재 로그인한 유저가 userA인지 userB인지에 따라
	 * "상대방"이 달라지므로 currentUserId를 받아서 판단 필요
	 */
	public static ChatRoomResponse of(ChatRoom room, Long currentUserId) {
		// 내가 userA면 상대방은 userB, 내가 userB면 상대방은 userA
		boolean isUserA = room.getUserA().getId().equals(currentUserId);
		
		return ChatRoomResponse.builder()
				.roomId(room.getId())
				.opponentId(isUserA ? room.getUserB().getId() : room.getUserA().getId())
				.opponentNickname(isUserA ? room.getUserB().getNickname() : room.getUserA().getNickname())
				.lastMessageAt(room.getLastMessageAt())
				.build();
	}
}
