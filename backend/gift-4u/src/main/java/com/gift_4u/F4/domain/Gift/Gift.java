package com.gift_4u.F4.domain.Gift;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Table(name="gifts")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Gift {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long senderId;
	private Long receiverId;
	private Long productId;
	
	@Column(length = 500)
	private String messageCardContent;
	
	private String address;
	
	@Builder.Default
	@Enumerated(EnumType.STRING)
	private GiftStatus status = GiftStatus.PENDING;
	
	@OneToOne(mappedBy = "gift", cascade = CascadeType.ALL)
	private GiftShipping shipping;
	
	@OneToOne(mappedBy = "gift", cascade = CascadeType.ALL)
	private GiftMessage message;
	
	
	// 주소 입력 시 status 상태 변경
	public void acceptGift(String address) {
		this.shipping.updateAddress(address);
		this.status = GiftStatus.ACCEPTED;
	}
}
