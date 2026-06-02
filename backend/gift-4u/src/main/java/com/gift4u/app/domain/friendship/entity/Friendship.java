package com.gift4u.app.domain.friendship.entity;

import java.time.LocalDateTime;

import com.gift4u.app.domain.friendship.enums.FriendshipStatus;
import com.gift4u.app.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "friendships", uniqueConstraints = @UniqueConstraint(
		name = "uk_friendships_requester_addressee",
		columnNames = { "requester_id", "addressee_id" }
))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Friendship {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "friendships_seq")
	@SequenceGenerator(name = "friendships_seq", sequenceName = "FRIENDSHIPS_ID_SEQ", allocationSize = 1)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "requester_id", nullable = false)
	private User requester;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "addressee_id", nullable = false)
	private User addressee;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false, length = 20)
	private FriendshipStatus status;
	
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "accepted_at")
	private LocalDateTime acceptedAt;
	
	@Builder
	public Friendship(User requester, User addressee, FriendshipStatus status,
			LocalDateTime createdAt, LocalDateTime acceptedAt) {
		this.requester = requester;
		this.addressee = addressee;
		this.status = status;
		this.createdAt = createdAt;
		this.acceptedAt = acceptedAt;
	}
	
	public void accept() {
		this.status = FriendshipStatus.ACCEPTED;
		this.acceptedAt = LocalDateTime.now();
	}
	
	public void reject() {
		this.status = FriendshipStatus.REJECTED;
		this.acceptedAt = null;
	}
	
	public void reopenPending() {
		this.status = FriendshipStatus.PENDING;
		this.acceptedAt = null;
	}
}
