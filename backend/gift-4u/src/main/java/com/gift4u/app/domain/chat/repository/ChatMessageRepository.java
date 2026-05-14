package com.gift4u.app.domain.chat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gift4u.app.domain.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository <ChatMessage, Long>{
	Page<ChatMessage> findByRoomIdOrderByCreatedAtDesc(Long roomId, Pageable pageable);
}
