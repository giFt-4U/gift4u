package com.gift4u.app.domain.gift.scheduler;

import java.time.LocalDateTime;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.enums.GiftStatus;
import com.gift4u.app.domain.gift.repository.GiftRepository;
import com.gift4u.app.domain.gift.service.GiftManageService;

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
    private final GiftManageService giftManageService;

	/** 매일 새벽 2시 - 만료 선물 일괄 처리
	 * 
	 * 처리 대상: status = PENDING AND expired_at
	 * 처리 결과: status = EXPIRED
	 * 
	 * 트랜젝션 :
	 * 	한 번의 배치에서 여러 선물을 처리하므로 @Transactional 적용
	 * 	중간에 예외 발생 시 전체 롤백되어 데이터 불일치 방지!!
	 */

    @Scheduled(cron = "0 0 2 * * *")
    public void expiredOverdueGifts() {
        LocalDateTime now = LocalDateTime.now();
        
        List<Gift> overdueGifts = giftRepository
                .findAllByStatusAndExpiredAtBefore(GiftStatus.PENDING, now);
        
        if (overdueGifts.isEmpty()) {
            log.info("[GiftScheduler] 만료 처리할 선물 없음");
            return;
        }

        int successCount = 0;
        for (Gift gift : overdueGifts) {
            try {
                // 개별 건마다 독립된 트랜잭션으로 처리
                giftManageService.processExpirationAndRefund(gift.getId());
                successCount++;
            } catch (Exception e) {
                log.error("[GiftScheduler] 선물 ID {} 만료/환불 처리 중 오류 발생: {}", gift.getId(), e.getMessage());
            }
        }
        
        log.info("[GiftScheduler] 만료 처리 완료 - 성공: {}/{}건, 기준 시각: {}", 
                successCount, overdueGifts.size(), now);
    }

}
