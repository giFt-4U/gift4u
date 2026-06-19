package com.gift4u.app.domain.gift.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gift4u.app.domain.gift.dto.GiftResponse;
import com.gift4u.app.domain.gift.dto.GiftShippingRequest;
import com.gift4u.app.domain.gift.service.GiftService;
import com.gift4u.app.global.security.CustomUserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** 선물 관령 API 엔드포인트
 * 
 * [인증 필요]
 * 	POST	/api/gifts					- 선물 생성 (REQ-011)
 * 	PATHCH	/api/gifts/{uuid}/accept	- 선물수령 + 배송지 입력 (REQ-014)
 *  PATHCH  /api/gifts/{uuid}/refuse	- 선물 거절 (REQ-015)
 * 	GET		/api/gifts/sent				- 내가 보낸 선물 목록 (REQ-012)
 * 	GET		/api/gifts/received			- 내가 받은 선물 목록 (REQ-013)
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
	
	
	/** 선물 수령 + 배송지 입력 (REQ-014)	 **/
	@PatchMapping("/{uuid}/accept")
	public ResponseEntity<GiftResponse> acceptGift(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable String uuid,
												  @Valid @RequestBody GiftShippingRequest request){
	    Long currentUserId = userDetails.getUser().getId();
		GiftResponse response = giftService.acceptGift(currentUserId, uuid, request);
		return ResponseEntity.ok(response);
	}

	
	/** 선물 거절 (REQ-15) **/
	@PatchMapping("/{uuid}/refuse")
	public ResponseEntity<GiftResponse> refuseGift(@AuthenticationPrincipal CustomUserDetails userDetails, 
	                                               @PathVariable String uuid) {
	    Long currentUserId = userDetails.getUser().getId();
	    GiftResponse response = giftService.refuseGift(currentUserId, uuid);
	    return ResponseEntity.ok(response);
	}
	
	
	/** 내가 보낸 선물 목록 (REQ-012) **/
	@GetMapping("/sent")
	public ResponseEntity<List<GiftResponse>> getSentGifts(@AuthenticationPrincipal CustomUserDetails userDetails){
	    Long currentUserId = userDetails.getUser().getId();
		return ResponseEntity.ok(giftService.getSentGifts(currentUserId));
	}
	
	/** 내가 받은 선물 목록 (REQ-013) **/
	@GetMapping("/received")
	public ResponseEntity<List<GiftResponse>> getReceivedGifts(@AuthenticationPrincipal CustomUserDetails userDetails){
	    Long currentUserId = userDetails.getUser().getId();
		return ResponseEntity.ok(giftService.getReceivedGifts(currentUserId));
	}
	
	/** 선물 상세 조회 - 링크 공유용 (REQ-013)
	 * 로그인하지 않은 수신자도 접근 가능. (SecurityConfig에서 permitAll 처리 필요!)
	 */
	@GetMapping("/{uuid}")
	public ResponseEntity<GiftResponse> getGift(@PathVariable String uuid) {
		return ResponseEntity.ok(giftService.getGift(uuid));
	}
	
	/** 선물 이미지 추가
	 */
	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Map<String, String>> uploadGiftImage(
	        @RequestParam("file") MultipartFile file
	) {
	    String imageUrl = giftService.uploadGiftImage(file);
	    return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
	}
	
}
