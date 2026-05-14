package com.gift4u.app.domain.gift;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift4u.app.domain.gift.dto.GiftCreateRequest;
import com.gift4u.app.domain.gift.dto.GiftResponse;
import com.gift4u.app.domain.gift.dto.GiftShippingRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** 선물 관령 API 엔드포인트
 * 
 * [인증 필요]
 * 	POST	/api/gifts					- 선물 생성 (REQ-011)
 * 	PATHCH	/api/gifts/{uuid}/accept	- 선물수령 + 배송지 입력 (REQ-014)
 * 
 * [인증 불필요]
 * 	GET		/api/gifts/{uuid}			- 선물 상세 조회 (REQ-013, 링크 수신자 접근)
 * 
 * currentUserId: JWT 필터가 SecurityContext에 저장한 userId를
 * 	@AuthenticationPrincipal 꺼낸다. (String -> Long 변환)
 */
@RestController
@RequestMapping("/api/gifts")
@RequiredArgsConstructor
public class GiftController {

	private final GiftService giftService;
	
	/** 선물 생성 (REQ-011/010)
	 * @Valid - GiftCreateRequest의 @NotNull, @Size(max=200) 등 자동 검증
	 * 검증 실패 시 GlobalExceptionHandler가 400 처리
	 */
	@PostMapping
	public ResponseEntity<GiftResponse> createGift(@AuthenticationPrincipal String userId,
												@Valid @RequestBody GiftCreateRequest request){
		GiftResponse response = giftService.createGift(Long.parseLong(userId), request);
		return ResponseEntity.ok(response);
	}
	
	
	/** 선물 수령 + 배송지 입력 (REQ-014)	 **/
	@PatchMapping("/{uuid}/accept")
	public ResponseEntity<GiftResponse> acceptGift(@AuthenticationPrincipal String userId, @PathVariable String uuid,
												  @Valid @RequestBody GiftShippingRequest request){
		GiftResponse response = giftService.acceptGift(Long.parseLong(userId), uuid, request);
		return ResponseEntity.ok(response);
	}
	
}
