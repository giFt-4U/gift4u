package com.gift4u.app.domain.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gift4u.app.domain.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository <ChatRoom, Long>{
	/** 두 유저 간 기존 채팅방 조회
	 * 채팅방 생성 전 중복 확인	(REQ-C02)
	 */
	@Query("SELECT r FROM ChatRoom r WHERE (r.userA.id = :userAId AND r.userB.id = :userBId)"
			+ "OR (r.userA.id = :userBId AND r.userB.id = :userBId)")
	Optional<ChatRoom> findRoomByTwoUsers(@Param("userAId")Long userAId, @Param("userBId") Long userBId);
	
	/** 내 채팅방 목록 - 마지막 메시지 최신순 정렬 (REQ-C01)
	 * @EntityGraph: userA, userB를 즉시 로딩해 N+1 문제 방지
	 * ChatRoomResponse.of()에서 userA/userB.getNickname() 접근 필요
	 */
	@EntityGraph(attributePaths = {"userA","userB"})
	List<ChatRoom> findByUserAIdOrUserBIdOrderByLastMessageAtDesc(Long userAId, Long userBId);
}
