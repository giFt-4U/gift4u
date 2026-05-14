package com.gift4u.app.domain.gift;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "gift_shipping")
public class GiftShipping {
	
	@Id @GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "gift_id", nullable = false)
	private Gift gift;
	
	private String recipientName;
	private String recipientPhone;
	private String address;
	private String addressDetail;
	private String zipCode;
	private String trackingNumber;
	private String carrier;
	private LocalDateTime shippedAt;
	private LocalDateTime createAt;
	
	@Builder
	public GiftShipping(Gift gift, String recipientName, String recipientPhone,
						String address, String addressDetail, String zipCode) {
		this.gift = gift;
		this.recipientName = recipientName;
		this.recipientPhone = recipientPhone;
		this.address = address;
		this.addressDetail = addressDetail;
		this.zipCode = zipCode;
		this.createAt = LocalDateTime.now();
	}

}
