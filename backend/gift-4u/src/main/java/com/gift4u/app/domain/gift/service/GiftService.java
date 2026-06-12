package com.gift4u.app.domain.gift.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.chat.servicer.ChatService;
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
	
	@Lazy // ChatService <> GiftService 순환참조방지
	private final ChatService chatService;
	
	
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
		
		// 선물 생성 시 채팅방에 GIFT 메시지 자동 전송 (REQ-C05)
		chatService.sendGiftMessage(gift);
		
		return GiftResponse.from(gift);
	}
	
	
	/** 선물 상세 조회 (uuid 기반, REQ-013)
	 * 링크를 받은 사람이 수령 전 선물 내용을 확인할 때 사용
	 * 만료된 선물도 조회는 가능하되 상태(EXPIRED)를 그대로 반환
	 */
	public GiftResponse getGift(String uuid) {
	    // 1. 기준이 되는 선물 단건 조회
	    Gift gift = giftRepository.findByUuid(uuid)
	            .orElseThrow(() -> new GlobalException(ErrorCode.GIFT_LINK_INVALID));
	            
	    // 2. 메시지 카드 정보 조회
	    GiftMessage giftMessage = giftMessageRepository.findByGiftId(gift.getId())
	            .orElse(null); // 메시지가 없을 경우를 대비해 예외 대신 null 처리 방어

	    // 3. 장바구니 동시 결제 시 연속 인서트 시차가 발생할 수 있으므로 전후 5초 범위 설정
	    LocalDateTime giftTime = gift.getCreatedAt();
	    LocalDateTime startTime = giftTime.minusSeconds(5);
	    LocalDateTime endTime = giftTime.plusSeconds(5);
	    
	    // 4. 레포지토리에 추가한 메서드로 같이 묶인 모든 선물 내역 조회
	    List<Gift> bundleGifts = giftRepository.findAllBySenderIdAndCreatedAtBetween(
	            gift.getSender().getId(), startTime, endTime
	    );
	    
	    // 5. 함께 결제된 모든 상품들의 이름을 추출하여 리스트화
	    List<String> bundleProductNames = bundleGifts.stream()
	            .map(bGift -> bGift.getProduct().getName())
	            .toList();
	            
	    // 6. 묶음 정보 및 메시지 카드가 통합된 빌더 메서드로 응답 반환
	    return GiftResponse.from(gift, giftMessage, bundleProductNames);
	}
	
	
	/** 선물 수령 (REQ-014)
	 * 1. uuid 선물 조회
	 * 2. 수령자 본인 확인
	 * 3. Gift.accept() 호출 - 상태/만료 검증은 엔티티 내부에서 처리
	 * 4. 배송지 중복 저장 방지 후 GiftShipping 저장
	 * 
	 * + 수령 완료 응답 후에도 메시지 카드를 다시 볼 수 있도록
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
				.receiverName(request.getReceiverName())
				.receiverPhone(request.getReceiverPhone())
				.address(request.getAddress())
				.addressDetail(request.getAddressDetail())
				.zipCode(request.getZipCode())
				.build();
		giftShippingRepository.save(shipping);
		
		// 수령완료 응답 메시지 카드 정보 포함
		GiftMessage giftMessage = giftMessageRepository.findByGiftId(gift.getId()).orElse(null);
		chatService.sendAcceptMessage(gift, gift.getReceiver().getNickname());
		
		return GiftResponse.from(gift, giftMessage);
	}
	
	
	/** 내가 보낸 선물 목록 조회 (REQ-012)	 **/
	public List<GiftResponse> getSentGifts(Long senderId){
		return giftRepository.findAllBySenderId(senderId)
				.stream()
				.map(gift->{
					GiftMessage giftMessage = giftMessageRepository.findByGiftId(gift.getId())
							.orElseThrow(()-> new GlobalException(ErrorCode.INTERNAL_SERVER_ERROR));
					return GiftResponse.from(gift, giftMessage);
				})
				.toList();
	}
	
	
	/** 내가 받은 선물 목록 조회 (REQ-013) **/
	public List<GiftResponse> getReceivedGifts(Long receiverId){
		return giftRepository.findAllByReceiverId(receiverId)
				.stream()
				.map(gift-> {
					GiftMessage giftMessage = giftMessageRepository.findByGiftId(gift.getId())
							.orElseThrow(()-> new GlobalException(ErrorCode.INTERNAL_SERVER_ERROR));
					return GiftResponse.from(gift, giftMessage);
				})
				.toList();
	}
	
}
