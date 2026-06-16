package com.gift4u.app.domain.friendship.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FriendMemberResponse {
	private Long friendshipId;
	private Long userId;
	private String nickname;
	private String friendCode;
}
