package com.gift4u.app.domain.friendship.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gift4u.app.domain.friendship.entity.Friendship;
import com.gift4u.app.domain.friendship.enums.FriendshipStatus;

public interface FriendshipRepository extends JpaRepository<Friendship, Long>{

	Optional<Friendship> findByRequesterIdAndAddresseeId(Long requesterId, Long addresseeId);
	
	@Query("""
			SELECT f FROM Friendship f
			WHERE (f.requester.id = :u1 AND f.addressee.id = :u2) 
			OR (f.requester.id = :u2 AND f.addressee.id = :u1)			
			""")
	
	Optional<Friendship> findBetweenUsers(@Param("u1") Long userId1, @Param("u2") Long UserId2);
	
	@Query("""
			SELECT f FROM Friendship f
			WHERE f.status = 'ACCEPTED'
			 AND (f.requester.id = :userId OR f.addressee.id = :userId)
			""")
	
	List<Friendship> findAllAcceptedByUserId(@Param("userId") Long userId);
	
	@Query("""
			SELECT f FROM Friendship f
			WHERE f.status = 'PENDING'
			 AND f.addressee.id = :userId
			ORDER BY f.createdAt DESC
			""")
	List<Friendship> findAllPendingReceivedByAddresseeId(@Param("userId") Long userId);
	
	boolean existsByRequesterIdAndAddresseeIdAndStatus(Long requesterId, Long addresseeId, FriendshipStatus status);
}//interface
