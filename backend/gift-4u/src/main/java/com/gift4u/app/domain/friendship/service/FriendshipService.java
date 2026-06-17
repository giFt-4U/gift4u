package com.gift4u.app.domain.friendship.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.chat.servicer.ChatService;
import com.gift4u.app.domain.friendship.dto.FriendMemberResponse;
import com.gift4u.app.domain.friendship.entity.Friendship;
import com.gift4u.app.domain.friendship.enums.FriendshipStatus;
import com.gift4u.app.domain.friendship.repository.FriendshipRepository;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.repository.UserRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FriendshipService {

	private final FriendshipRepository friendshipRepository;
	private final UserRepository userRepository;
	private final ChatService chatService;
	
	//친구 코드로 요청
	@Transactional
	public void sendRequest(Long requesterId, String friendCode) {
		User requester = userRepository.findById(requesterId)
				.orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
				
		User addressee = userRepository.findByFriendCode(friendCode)
				.orElseThrow(() -> new GlobalException(ErrorCode.FRIEND_CODE_NOT_FOUND));
		
		if(requester.getId().equals(addressee.getId())) {
			throw new GlobalException(ErrorCode.FRIEND_REQUEST_TO_SELF);
		}
		
		Optional<Friendship> existing = friendshipRepository.findBetweenUsers(requesterId, addressee.getId());
		
		if(existing.isPresent()) {
			Friendship f = existing.get();
			if(f.getStatus() == FriendshipStatus.ACCEPTED || f.getStatus() == FriendshipStatus.PENDING) {
				throw new GlobalException(ErrorCode.FRIEND_REQUEST_ALREADY_EXISTS);
			}
			
			//REJECTED : 내가 requester 였던 관계만 다시 PENDING
			if(f.getRequester().getId().equals(requesterId)) {
				f.reopenPending();
				return;
			}
			throw new GlobalException(ErrorCode.FRIEND_REQUEST_ALREADY_EXISTS);
		}
		
		friendshipRepository.save(Friendship.builder()
				.requester(requester)
				.addressee(addressee)
				.status(FriendshipStatus.PENDING)
				.createdAt(LocalDateTime.now())
				.build());
	}
	
	//수락
	@Transactional
	public void accept(Long currentUserId, Long friendshipId) {
		Friendship friendship = friendshipRepository.findById(friendshipId)
				.orElseThrow(() -> new GlobalException(ErrorCode.FRIENDSHIP_NOT_FOUND));
		if(!friendship.getAddressee().getId().equals(currentUserId)) {
			throw new GlobalException(ErrorCode.FORBIDDEN);
		}
		
		if(friendship.getStatus() != FriendshipStatus.PENDING) {
			throw new GlobalException(ErrorCode.INVALID_FRIENDSHIP_STATUS);
		}
		
		friendship.accept();
		chatService.getOrCreateRoom(
				friendship.getRequester().getId(),
				friendship.getAddressee().getId());
	}
	
	@Transactional
	public void reject(Long currentUserId, Long friendshipId) {
		Friendship friendship = friendshipRepository.findById(friendshipId)
				.orElseThrow(() -> new GlobalException(ErrorCode.FRIENDSHIP_NOT_FOUND));
		
		if(!friendship.getAddressee().getId().equals(currentUserId)) {
			throw new GlobalException(ErrorCode.FORBIDDEN);
		}
		
		if(friendship.getStatus() != FriendshipStatus.PENDING) {
			throw new GlobalException(ErrorCode.INVALID_FRIENDSHIP_STATUS);
		}
		friendship.reject();
	}
	
	public List<FriendMemberResponse> listAcceptedFriends(Long userId) {
		return friendshipRepository.findAllAcceptedByUserId(userId).stream()
				.map(f -> toFriendMember(f, userId))
				.toList();
	}
	
	public List<FriendMemberResponse> listReceivedRequests(Long userId) {
		return friendshipRepository.findAllPendingReceivedByAddresseeId(userId).stream()
				.map(f -> FriendMemberResponse.builder()
						.friendshipId(f.getId())
						.userId(f.getRequester().getId())
						.nickname(f.getRequester().getNickname())
						.friendCode(f.getRequester().getFriendCode())
						.build())
				.toList();
	}
	
	private FriendMemberResponse toFriendMember(Friendship f, Long myId) {
		User friend = f.getRequester().getId().equals(myId) ? f.getAddressee() : f.getRequester();
		
		return FriendMemberResponse.builder()
				.friendshipId(f.getId())
				.userId(friend.getId())
				.nickname(friend.getNickname())
				.friendCode(friend.getFriendCode())
				.build();
	}
}