package com.gift4u.app.domain.friendship.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.friendship.dto.FriendCodeRequest;
import com.gift4u.app.domain.friendship.dto.FriendMemberResponse;
import com.gift4u.app.domain.friendship.service.FriendshipService;
import com.gift4u.app.global.security.CustomUserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/friendships")
@RequiredArgsConstructor
public class FriendshipController {

	private final FriendshipService friendshipService;
	
	//친구 코드로 요청(REQ-027)
	@PostMapping("/request")
	public ResponseEntity<Void> requst(
			@AuthenticationPrincipal CustomUserDetails userDetails, 
			@Valid @RequestBody FriendCodeRequest request) {
		friendshipService.sendRequest(userDetails.getUser().getId(), request.getFriendCode());
		return ResponseEntity.ok().build();
	}
	
	//수락(REQ-034)
	@PatchMapping("/{id}/accept")
	public ResponseEntity<Void> accept(
			@AuthenticationPrincipal CustomUserDetails userDetails,
			@PathVariable Long id) {
		friendshipService.accept(userDetails.getUser().getId(), id);
		return ResponseEntity.ok().build();
	}
	
	//거절(REQ-034)
	@PatchMapping("/{id}/reject")
	public ResponseEntity<Void> reject(
			@AuthenticationPrincipal CustomUserDetails userDetails,
			@PathVariable Long id) {
		friendshipService.reject(userDetails.getUser().getId(), id);
		return ResponseEntity.ok().build();
	}
	
	//수락된 친구 목록(REQ-028)
	@GetMapping
	public ResponseEntity<List<FriendMemberResponse>> listFriends(
			@AuthenticationPrincipal CustomUserDetails userDetails) {
				return ResponseEntity.ok(friendshipService.listAcceptedFriends(userDetails.getUser().getId()));	
	}
	
}//class