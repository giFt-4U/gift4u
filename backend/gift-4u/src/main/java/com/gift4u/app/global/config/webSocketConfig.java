package com.gift4u.app.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/** WebSocket(STOMP) 설정
 * 
 * 클라이언트 연결 흐름:
 * 1. /ws		엔드포인트로 WebSocket 연결 (SockJS 폴백 포함)
 * 2. /app/**	경로로 메시지 송신 -> @MessageMappiong 메서드로 라우팅
 * 3. /topic/** 경로를 구독 -> 서버 브로드 캐스트
 * 
 * ex:
 * 	- 메시지 전송: client > STOMP SEND		/app/chat/send
 *  - 메시지 수신: client < STOMP MESSAGE	/topic/chat/{rooId}
 */
@Configuration
@EnableWebSocketMessageBroker
public class webSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	/** 메시지 브로커 설정
	 * 
	 * enableSimpleBroker ("/topic"):
	 * 	- 인메모리 브로커 활성화 /topic/** 구독자에게 메시지를 전달
	 *  - 운영환경에서 Redis/RabbitMQ로 교체 시 이 부분만 수정
	 *  
	 * setApplicationDestinationPrefixes ("/app/")"
	 * 	- 클라이언트가 서버로 메시지를 보낼 때 사용하는 prefix
	 *  - /app/chat/send > ChatWebSocketController @MessageMapping("chat/send")로 라우팅
	 */
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.enableSimpleBroker("/topic");				// 구독 prefix
		registry.setApplicationDestinationPrefixes("/app");	// 발행 prefix
	}
	
	
	/** STOMP 엔드포인트 등록
	 * 
	 *  /ws	: WebSocket 연결 진입점.
	 *  withSockJS() : WebSocket 미지원 브라우저를 위한 폴백 (HTTP 롱폴링)
	 *  setAllowedOriginPatterns("*") : CORS 허용. 배포 시 실제 도메인으로 교체 필요
	 */
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws-stomp")		// WS 연결 엔드포인트
				.setAllowedOriginPatterns("*")
				.withSockJS();					// SockJS fallback
	}
}
