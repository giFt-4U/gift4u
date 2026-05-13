package com.gift4u.app.global.exception;

import lombok.Getter;

/** 서비스 전역에서 사용하는 커스텀 예외
 * 사용법 :
 * 		throw new GlobalException(ErrorCode.USER_NOT_FOUND)
 * 
 * - 반드시 ErrorCode를 통해서만 생성하기
 * - 직접 메시지 문자열을 넣지 않는다.
 * - RuntimeException을 상속하므로 throws 선언 없이 어디서든 사용 가능하다.
 */

@Getter
public class GlobalException extends RuntimeException {
	private final ErrorCode errorCode;
	
	public GlobalException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
}
