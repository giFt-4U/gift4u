package com.gift4u.app.domain.gift.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.gift.dto.GiftCreateRequest;
import com.gift4u.app.domain.gift.dto.GiftResponse;
import com.gift4u.app.domain.gift.dto.GiftShippingRequest;
import com.gift4u.app.domain.gift.entity.Gift;
import com.gift4u.app.domain.gift.entity.GiftMessage;
import com.gift4u.app.domain.gift.entity.GiftShipping;
import com.gift4u.app.domain.gift.repository.GiftMessageRepository;
import com.gift4u.app.domain.gift.repository.GiftRepository;
import com.gift4u.app.domain.gift.repository.GiftShippingRepository;
import com.gift4u.app.domain.user.entity.User;
import com.gift4u.app.domain.user.repository.UserRepository;
import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

import lombok.RequiredArgsConstructor;

/** 선물 도메인 핵심 비즈니스 로직
 * 흐름
 * 1. createGift() - 보내는 사람이 친구에게 선물 생성 + 메시지카드 저장
 * 2. acceptGift() - 받는 사람이 uuid 링크로 수령 + 배송지 저장
 * 3. getGift()    - uuid로 선물 상세 조회(링크공유용)
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GiftService {

	private final GiftRepository giftRepository;
	private final GiftMessageRepository giftMessageRepository;
	private final GiftShippingRepository giftShippingRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;
	
	/** 선물 생성 (REQ-011 / 010)
	 * 
	 * 1. 보낸 사람(sender), 받는 사람(receiver), 상품(product) 존재 확인
	 * 2. Gift Entity 저장 -> GiftMessage 저장
	 * 3. 생성된 선물 정보 반환 (uuid 포함-> FE에서 링크 생성에 이용)
	 */
	@Transactional
	public GiftResponse createGift (Long senderId, GiftCreateRequest request) {
		
		User sender = userRepository.findById(senderId)
				.orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
		
		User recevier = userRepository.findById(request.getReceiverId())
				.orElseThrow(() -> new GlobalException(ErrorCode.USER_NOT_FOUND));
		
		Product product = productRepository.findById(request.getProductId())
				.orElseThrow(() -> new GlobalException(ErrorCode.PRODUCT_NOT_FOUND));
		
		// 선물 생성
		Gift gift = Gift.builder()
				.sender(sender)
				.receiver(recevier)
				.product(product)
				.build();
		giftRepository.save(gift);
		
		
		// 메시지 카드 저장 (REQ-010: 200자 제한은 @Size로 Controller 검증)
		GiftMessage giftMessage = GiftMessage.builder()
				.gift(gift)
				.message(request.getMessage())
				.cardDesignType(request.getCardDesignType())
				.build();
		giftMessageRepository.save(giftMessage);
		
		return GiftResponse.from(gift);
	}
	
	
	/** 선물 수령 (REQ-014)
	 * 1. uuid 선물 조회
	 * 2. 수령자 본인 확인
	 * 3. Gift.accept() 호출 - 상태/만료 검증은 엔티티 내부에서 처리
	 * 4. 배송지 중복 저장 방지 후 GiftShipping 저장
	 */
	@Transactional
	public GiftResponse acceptGift(Long currentUserId, String uuid, GiftShippingRequest request) {
		Gift gift = giftRepository.findByUuid(uuid)
				.orElseThrow(()-> new GlobalException(ErrorCode.GIFT_LINK_INVALID));
		
		// 수령자 본인만 수령 가능
		if(!gift.getReceiver().getId().equals(currentUserId)) {
			throw new GlobalException(ErrorCode.FORBIDDEN);
		}
		
		// 상태/만료 검증 -> 엔티티 내부에서 GlobalException 발생
		gift.accept();
		
		// 배송지 중복 저장 방지
		if(giftShippingRepository.existsByGiftId(gift.getId())) {
			throw new GlobalException(ErrorCode.GIFT_ALREADY_RECEIVED);
		}
		
		GiftShipping shipping = GiftShipping.builder()
				.gift(gift)
				.recipientName(request.getRecipientName())
				.recipientPhone(request.getRecipientPhone())
				.address(request.getAddress())
				.addressDetail(request.getAddressDetail())
				.zipCode(request.getZipCode())
				.build();
		giftShippingRepository.save(shipping);
		
		return GiftResponse.from(gift);
	}
	
}
