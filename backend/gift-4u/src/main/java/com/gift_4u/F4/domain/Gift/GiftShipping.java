package com.gift_4u.F4.domain.Gift;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Table(name="gift_shipping")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GiftShipping {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String receiverName;
	private String receiverPhone;
	
	private String address;
	private String addressDetail;
	private String zipCode;
	
	private LocalDateTime created_at;
	
	@OneToOne
	@JoinColumn(name="gift_id")
	private Gift gift;
	
	public void updateShippingInfo(String receiverName, String receiverPhone,
					String address, String addressDetail, String zipCode) {
		this.receiverName = receiverName;
		this.receiverPhone = receiverPhone;
		this.address = address;
		this.addressDetail = addressDetail;
		this.zipCode = zipCode;
	}
	
}
