package com.gift4u.app.domain.chat.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository <ChatMessage, Long>{
	/** 채팅방 메시지 페이징 조회 - 최신순 (REQ-019) **/
	Page<ChatMessage> findByRoomIdOrderByCreatedAtDesc(Long roomId, Pageable pageable);
	Optional<ChatMessage> findTopByRoomIdOrderByCreatedAtDesc(Long roomId);
}
