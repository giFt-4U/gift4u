package com.gift4u.app.domain.chat.dto;

import java.time.LocalDateTime;

import com.gift4u.app.domain.chat.entity.ChatRoom;
import com.gift4u.app.domain.user.entity.User;

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

	// 친구 위시리스트 이동을 위한 상대방 친구 코드
	private String opponentFriendCode;

	private LocalDateTime lastMessageAt;
	private String lastMessage;
	
	/** ChatRoom은 userA, userB를 가지고 있음
	 * 현재 로그인한 유저가 userA인지 userB인지에 따라
	 * "상대방"이 달라지므로 currentUserId를 받아서 판단 필요
	 */
	public static ChatRoomResponse of(ChatRoom room, Long currentUserId, String lastMessage) {
		// 내가 userA면 상대방은 userB, 내가 userB면 상대방은 userA
		boolean isUserA = room.getUserA().getId().equals(currentUserId);

		User opponent = isUserA ? room.getUserB() : room.getUserA();
		
		return ChatRoomResponse.builder()
				.roomId(room.getId())
				.opponentId(opponent.getId())
				.opponentNickname(opponent.getNickname())
				.opponentFriendCode(opponent.getFriendCode())
				.lastMessageAt(room.getLastMessageAt())
	            .lastMessage(lastMessage)
				.build();
	}
}
