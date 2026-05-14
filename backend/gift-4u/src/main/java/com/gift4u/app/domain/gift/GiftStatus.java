package com.gift4u.app.domain.gift;

public enum GiftStatus {
	PENDING,	// 전송 후 수령 대기
	ACCEPTED,	// 수령완료
	EXPIRED,	// 만료
	// REJECTED		// 추후 개발 거절
}
