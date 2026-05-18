package com.gift4u.app.domain.chat.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.chat.dto.ChatMessageResponse;
import com.gift4u.app.domain.chat.dto.ChatRoomCreateRequest;
import com.gift4u.app.domain.chat.dto.ChatRoomResponse;
import com.gift4u.app.domain.chat.servicer.ChatService;
import com.gift4u.app.global.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

/** 채팅방 REST API
 * [채팅방]
 * GET	/api/chat/rooms		- 내 채팅방 목록 (REQ-C001)
 * POST	/api/chat/rooms		- 채팅방 조회 or 생성 (REQ-C02)
 * 
 * [메시지]
 * GET	/api/chat/rooms/{roomid}/message	- 과거 메시지 페이징 조회 (REQ-C03)
 * 
 * 실시간 메시지 송수신은 REST가 아닌 WebSocket(STOMP) 처리
 */
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
	
	private final ChatService chatService;
	
	
	/** 내 채팅방 목록 (REQ-C01)
	 * lastMessageAt 최신순 정렬은 서비스/Repository에서 처리
	 */
	@GetMapping("/rooms")
	public ResponseEntity<List<ChatRoomResponse>> getRooms(@AuthenticationPrincipal CustomUserDetails userDetails){
	    Long currentUserId = userDetails.getUser().getId();
		return ResponseEntity.ok(chatService.getRooms(currentUserId));
	}
	
	
	/** 채팅방 조회 또는 생성 (REQ-C02)
	 * 이미 채팅방이 있으면 기존 방 반환, 없으면 새로 만들기
	 * POST 사용이유 : 채팅방이 없을 때 서버 상태(DB)를 변경
	 * body:{"opponentId" : 2}
	 */
	@PostMapping("/rooms")
	public ResponseEntity<ChatRoomResponse> getOrCreateRoom(@AuthenticationPrincipal CustomUserDetails userDetails,
															@RequestBody ChatRoomCreateRequest request){
	    Long currentUserId = userDetails.getUser().getId();
		return ResponseEntity.ok(chatService.getOrCreateRoom(currentUserId, request.getOpponentId()));
	}
	
	
	/** 과거 메시지 페이징 조회 (REQ-C03)
	 * 기본값: 최신순 30개씩, FE에서 ?page=0&size=30 으로 제어
	 * @PageableDefault : Pageable 파라미터의 기본값 설정 어노테이션
	 */
	@GetMapping("/rooms/{roomId}/messages")
	public ResponseEntity<Page<ChatMessageResponse>> getMessages(@AuthenticationPrincipal CustomUserDetails userDetails,
													@PathVariable Long roomId,
													@PageableDefault(size=30, sort="createAt", direction =Sort.Direction.DESC)
													Pageable pageable){
	    Long currentUserId = userDetails.getUser().getId();
		return ResponseEntity.ok(chatService.getMessage(currentUserId, roomId, pageable));
	}

}
