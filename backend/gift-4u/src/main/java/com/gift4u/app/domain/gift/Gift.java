package com.gift4u.app.domain.gift;

import java.time.LocalDateTime;
import java.util.UUID;

import com.gift4u.app.domain.user.entity.User;
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

/** 선물 엔티티
 * 생명주기 : PENDING -> ACCEPTED(수령) / EXPIRED(만료)
 * uuid : 외부에 노출되는 식별자. DB PK(id)는 내부용으로만 사용
 * expiredAt: 생성 후 7일 이후 accept() 호출 시 GIFT_EXPIRED 예외.
 */
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
	@JoinColumn(name="sender_id")
	private User sender;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="receiver_id")
	private User receiver;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="product_id")
	private Product product;
	
	@Enumerated(EnumType.STRING)
	private GiftStatus status;
	
	private LocalDateTime createAt;
	private LocalDateTime expiredAt;
	
	@Builder
	public Gift(User sender, User receiver, Product product) {
		this.uuid = UUID.randomUUID().toString();
		this.sender = sender;
		this.receiver = receiver;
		this.product = product;
		this.status = GiftStatus.PENDING;
		this.createAt = LocalDateTime.now();
		this.expiredAt = LocalDateTime.now().plusDays(7); // 7일 후 만료
	}
	
	// 수락처리.
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
	
	// 만료처리. 스케쥴러 또는 조회 시점에 호출
	public void expired() {
		if(this.status == GiftStatus.PENDING) {
			this.status = GiftStatus.EXPIRED;
		}
	}
	
	
}
