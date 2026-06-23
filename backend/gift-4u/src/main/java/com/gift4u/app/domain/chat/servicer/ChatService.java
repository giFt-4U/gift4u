package com.gift4u.app.domain.chat.servicer;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.gift4u.app.domain.chat.dto.ChatMessageRequest;
import com.gift4u.app.domain.chat.dto.ChatMessageResponse;
import com.gift4u.app.domain.chat.dto.ChatRoomResponse;
import com.gift4u.app.domain.chat.entity.ChatMessage;
import com.gift4u.app.domain.chat.entity.ChatRoom;
import com.gift4u.app.domain.chat.entity.GiftChatLink;
import com.gift4u.app.domain.chat.enums.MessageType;
import com.gift4u.app.domain.chat.repository.ChatMessageRepository;
import com.gift4u.app.domain.chat.repository.ChatRoomRepository;
import com.gift4u.app.domain.chat.repository.GiftChatLinkRepository;
import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.repository.UserRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

import lombok.RequiredArgsConstructor;

/** 채팅 비즈니스 로직
 * 흐름
 * 1. getOrCreateRoom()	- 채팅방 조회 or 신규 생성
 * 2. getRooms()		- 내 채팅방 목록 조회
 * 3. getMwssage()		- 과거 메시지 페이징 조회
 * 4. sendMessage()		- STOMP 메시지 수신 > 저장 > 브로드 캐스트
 * 5. sendGiftMessage()	- 선물 생성 시 자동 전송되는 GIFT 타입 메시지
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {
	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final GiftChatLinkRepository giftChatLinkRepository;
	private final UserRepository userRepository;
	
	// WebSocket 메시지 브로드캐스트 도구
	private final SimpMessagingTemplate messagingTemplate;
	
	/** 채팅방 참여자 검증 공통메서드
	 * userA 또는 userB가 아닌 경우 403
	 */
	private void validateRoomMember(ChatRoom room, Long userId) {
		boolean isMember = room.getUserA().getId().equals(userId)
						|| room.getUserB().getId().equals(userId);
		if (!isMember) {
			throw new GlobalException(ErrorCode.CHAT_ROOM_ACCESS_DENIED);
		}
	}
	
	/** 채팅방 조회 또는 생성 (REQ-C02)
	 * 동일한 두 유저 간 채팅방은 하나만 존재해야 함.
	 * 이미 존재 시 기존 방을 반환하고 없으면 새로 생성
	 * (findRoomByTwoUsers로 A<->B 순서 무관하게 단일 쿼리 조회)
	 */
	@Transactional
	public ChatRoomResponse getOrCreateRoom(Long currentUserId, Long opponentId) {
		
		// 본인과의 채팅 방지
		if(currentUserId.equals(opponentId)) {
			throw new GlobalException(ErrorCode.FRIEND_REQUEST_TO_SELF);
		}
		
		User currentUser = userRepository.findById(currentUserId)
				.orElseThrow(()-> new GlobalException(ErrorCode.USER_NOT_FOUND));
		User oppenent = userRepository.findById(opponentId)
				.orElseThrow(()-> new GlobalException(ErrorCode.USER_NOT_FOUND));
		
		
		// 기존 채팅방 있으면 그대로 반환 (중복 생성 방지)
		// 기존 채팅방 조회 (나간 방 포함 — 전체 조회)
	    return chatRoomRepository.findRoomByTwoUsers(currentUserId, opponentId)
	            .map(room -> {
	                // 기존 방이 있으면 — 나간 상태(Left=true)면 재활성화
	                boolean isUserA = room.getUserA().getId().equals(currentUserId);

	                if (isUserA && room.getUserALeft()) {
	                    room.rejoin(currentUserId); // Left → false 로 복구
	                } else if (!isUserA && room.getUserBLeft()) {
	                    room.rejoin(currentUserId);
	                }

	                String lastMessage = chatMessageRepository
	                        .findTopByRoomIdOrderByCreatedAtDesc(room.getId())
	                        .map(ChatMessage::getContent)
	                        .orElse(null);

	                return ChatRoomResponse.of(room, currentUserId, lastMessage);
	            })
	            .orElseGet(() -> {
	                // 기존 방 없으면 신규 생성
	                ChatRoom newRoom = ChatRoom.builder()
	                        .userA(currentUser)
	                        .userB(oppenent)
	                        .build();
	                chatRoomRepository.save(newRoom);
	                return ChatRoomResponse.of(newRoom, currentUserId, null);
	            });
	}
	
	
	/** 내 채팅방 목록 조회 (REQ-C01)
	 * lastMessageAt 최신순 정렬
	 * @EntityGraph userA/userB 즉시 로딩 > N+1 없음
	 */
	public List<ChatRoomResponse> getRooms(Long currentUserId) {
	    return chatRoomRepository
	            .findActiveRoomsByUserId(currentUserId)
	            .stream()
                .map(room -> {
                    String lastMessage = chatMessageRepository
                            .findTopByRoomIdOrderByCreatedAtDesc(room.getId())
                            .map(ChatMessage::getContent)
                            .orElse("");
                    return ChatRoomResponse.of(room, currentUserId, lastMessage);
                })
                .toList();
	}
	
	
	/** 채팅방 과거 메시지 페이징 조회 (REQ-C03)
	 * 최신 메시지부터 내려오도록 createdAte DESC 정렬
	 * Pageable로 페이지 크기/번호 제어
	 */
	public Page<ChatMessageResponse> getMessage(Long currentUserId, Long roomId, Pageable pageable){
		ChatRoom room = chatRoomRepository.findById(roomId)
				.orElseThrow(() -> new GlobalException(ErrorCode.CHAT_ROOM_NOT_FOUND));
		
		
		// 채팅방 참여자가 아니면 403
		validateRoomMember(room,currentUserId);
		
		return chatMessageRepository
				.findByRoomIdOrderByCreatedAtDesc(roomId, pageable)
				.map(ChatMessageResponse::from);
	}
	
	
	/** STOMP 메시지 수신 > 저장 > 브로드 캐스트 (REQ-C04)
	 * websocketcontroller에서 @MessageMapping으로 수신 뒤 메서드 호출
	 */
	@Transactional
	public ChatMessageResponse sendMessage(Long senderId, ChatMessageRequest request) {
		ChatRoom room = chatRoomRepository.findById(request.getRoomId())
				.orElseThrow(()-> new GlobalException(ErrorCode.CHAT_ROOM_NOT_FOUND));
		
		// 참여자 검증 - 채팅방 밖 사용자의 메시지 전송 방지 (REQ-C04 보안)
		validateRoomMember(room, senderId);
		
		// 빈 메시지 방지 (@Valid가 STOMP에선 동작 안 하므로 서비스에서 직접 검증)
		if(request.getContent() == null || request.getContent().isBlank()) {
			throw new GlobalException(ErrorCode.CHAT_MESSAGE_BLANK);
		}
		
		ChatMessage message = ChatMessage.builder()
				.room(room)
				.senderId(senderId)
				.content(request.getContent())
				.messageType(request.getMessageType() != null ? request.getMessageType() : MessageType.TEXT)
				.build();
		chatMessageRepository.save(message);
		
		// 마지막 메시지 시각 갱신 > 채팅방 목록 정렬에 반영
		room.updateLastMessageAt();
		
		ChatMessageResponse response = ChatMessageResponse.from(message);
		
		// /topic/chat/{roomId} 실시간 브로드 캐스트
		messagingTemplate.convertAndSend("/topic/chat/" + room.getId(), response);
		
		return response;
	}
	
	/** 선물 생성 시 채팅방에 자동 전달되는 GIFT 타입 시스템 메시지 (REQ-C05)
	 * GiftSevice.createGift() 완료 후 호출된다.
	 * 1. 보낸사람 <> 받는 사람 채팅방 조회 or 생성
	 * 2. GIFT 타입 메시지 저장
	 * 3. GiftChatLink로 선물 - 채팅방 연결 저장
	 * 4. 브로드캐스트
	 */
	@Transactional
	public Long sendGiftMessage(Gift gift) {
		User sender = gift.getSender();
		User receiver = gift.getReceiver();
		
		ChatRoom room = chatRoomRepository
                .findRoomListByTwoUsers(sender.getId(), receiver.getId())
                .stream()
                .findFirst() // 데이터가 2개 이상 튀어나와도 예외 없이 첫 번째 방을 유연하게 선택합니다.
                .orElseGet(() -> {
                    // 방이 전혀 없을 때만 새 방 생성
                    ChatRoom newRoom = ChatRoom.builder()
                            .userA(sender)   // 보낸 사람
                            .userB(receiver) // 받는 사람
                            .build();
                    return chatRoomRepository.save(newRoom);
                });
		
		// GIFT 타입 메시지 - 내용은 프론트가 uuid로 선물 카드 렌더링
		String giftContent = "선물이 도착했어요 ! 🎁 "+gift.getUuid();
		
		ChatMessage message = ChatMessage.builder()
				.room(room)
				.senderId(sender.getId())
				.content(giftContent)
				.messageType(MessageType.GIFT)
				.build();
		chatMessageRepository.save(message);
		
		room.updateLastMessageAt();
		
		// 선물 - 채팅방 연결 저장 (중복 방지)
		boolean alreadyLinked = giftChatLinkRepository.findByGiftId(gift.getId()).isPresent();
		if(!alreadyLinked) {
			GiftChatLink link = GiftChatLink.builder()
					.gift(gift)
					.room(room)
					.systemMessageId(message.getId())
					.build();
			giftChatLinkRepository.save(link);
		}
		
		// 실시간 브로드캐스트
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    messagingTemplate.convertAndSend(
                        "/topic/chat/" + room.getId(), 
                        ChatMessageResponse.from(message)
                    );
                }
            });
        } else {
            messagingTemplate.convertAndSend("/topic/chat/" + room.getId(), ChatMessageResponse.from(message));
        }
        return room.getId();
	}
	
	/**
	 * 채팅방 나가기 (REQ-C06).
	 * 내 목록에서만 숨김. 상대방 채팅방은 유지.
	 * 상대방이 다시 메시지 보내면 내 목록에 다시 표시되도록
	 * left 플래그를 false로 되돌리는 것은 sendMessage()에서 처리.
	 */
	@Transactional
	public void leaveRoom(Long currentUserId, Long roomId) {
	    ChatRoom room = chatRoomRepository.findById(roomId)
	            .orElseThrow(() -> new GlobalException(ErrorCode.CHAT_ROOM_NOT_FOUND));

	    validateRoomMember(room, currentUserId);
	    room.leave(currentUserId);
	}
	
	/**
	 * 선물 수령 완료 시 채팅방에 시스템 메시지 전송.
	 * GiftService.acceptGift() 성공 후 호출.
	 * "닉네임님이 선물을 받았습니다!" 메시지를 GIFT 타입으로 발송.
	 */
	@Transactional
	public void sendAcceptMessage(Gift gift, String receiverNickname) {
	    ChatRoom room = chatRoomRepository
	            .findRoomByTwoUsers(gift.getSender().getId(), gift.getReceiver().getId())
	            .orElse(null);

	    if (room == null) return; // 채팅방 없으면 스킵

	    String content = receiverNickname + "님이 선물을 받았습니다! 🎉";

	    ChatMessage message = ChatMessage.builder()
	            .room(room)
	            .senderId(gift.getReceiver().getId())
	            .content(content)
	            .messageType(MessageType.TEXT) // 일반 텍스트로 표시
	            .build();
	    chatMessageRepository.save(message);
	    room.updateLastMessageAt();

	    messagingTemplate.convertAndSend(
	            "/topic/chat/" + room.getId(),
	            ChatMessageResponse.from(message)
	    );
	}
	
}
