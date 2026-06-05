package com.gift4u.app.domain.gift.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.enums.GiftStatus;
import com.gift4u.app.domain.gift.repository.GiftRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/** 선물 만료 처리 scheduler
 * 목적: 생성 후 7일이 지나도 수령하지 않은 선물을
 * 		매일 새벽 2시에 일괄 EXPIRED 전환
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GiftExpirationScheduler {
	
	private final GiftRepository giftRepository;

	/** 매일 새벽 2시 - 만료 선물 일괄 처리
	 * 
	 * 처리 대상: status = PENDING AND expired_at
	 * 처리 결과: status = EXPIRED
	 * 
	 * 트랜젝션 :
	 * 	한 번의 배치에서 여러 선물을 처리하므로 @Transactional 적용
	 * 	중간에 예외 발생 시 전체 롤백되어 데이터 불일치 방지!!
	 */

	@Scheduled(cron= "0 0 2 * * *")
	@Transactional
	public void expiredOverduGifts() {
		LocalDateTime now = LocalDateTime.now();
		
		// PENDING 상태이면서 만료 시각이 지난 선물 조회
		List<Gift> overdueGifts = giftRepository
				.findAllByStatusAndExpiredAtBefore(GiftStatus.PENDING, now);
		
		if(overdueGifts.isEmpty()) {
			log.info("[GiftScheduler] 만료 처리할 선물 없음");
			return;
		}
		
		// 각 선물의 expire() 호출 > EXPIRED 상태로 전환
		overdueGifts.forEach(Gift::expire);
		
		log.info("[GiftScheduler] 만료 처리 완료 - 대상: {}건, 기준 시각: {}", overdueGifts.size(), now);
				
	}
}
