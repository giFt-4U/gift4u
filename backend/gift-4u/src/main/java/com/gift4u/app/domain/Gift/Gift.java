package com.gift4u.app.domain.Gift;

import java.time.LocalDateTime;
import java.util.UUID;

import com.gift4u.app.domain.Gift.exception.GiftException;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

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
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "gifts")
public class Gift {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true, length = 36)
	private String uuid;

	@ManyToOne(fetch = FetchType.LAZY)
	private User senderId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User reciverId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Product productId;
	
	@Enumerated(EnumType.STRING)
	private GiftStatus status;
	
	private LocalDateTime createAt;
	private LocalDateTime expiredAt;
	
	@Builder
	public Gift(User senderId, User receiverId, Product productId) {
		this.uuid = UUID.randomUUID().toString();
		this.senderId = senderId;
		this.reciverId = receiverId;
		this.productId = productId;
		this.status = status;
		this.createAt = LocalDateTime.now();
		this.expiredAt = LocalDateTime.now().plusDays(7); // 7일 후 만료
	}
	
	public void accept() {
		// 선물이 대기 상태가 아니라면 전송된 것
		if(this.status != GiftStatus.PENDING) {
			throw new GlobalException(ErrorCode.GIFT_ALREADY_RECEIVED);
		}
		// 선물 만료
		if(LocalDateTime.now().isAfter(this.expiredAt)) {
			throw new GlobalException(ErrorCode.GIFT_EXPIRED);
		}
		this.status = GiftStatus.ACCEPTED;
	}
	
	
}
