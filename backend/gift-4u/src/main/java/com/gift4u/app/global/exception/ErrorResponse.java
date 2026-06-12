package com.gift4u.app.global.exception;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;

/**
 * 모든 에러 응답의 공통 포맷
 * 
 * 성공 응답: { "success": true, "data": { ... } }
 * 실패 응답: { "success": false, "error": { "code": "...", "message": "...", "details": [...] } }
 * 
 * details 필드는 @Valid 검증 실패 시에만 채워진다.
 * null 경우 JSON에서 제외도도록 @JsonInclude 처리
 */
@Getter
@Builder
public class ErrorResponse {
	private final boolean success;
	private final ErrorDetail error;
	
	/**
	 * 단일 에러 응답 (대부분 처리)
	 * ex: 404 USER_NOT_FOUND
	 */

    public static ErrorResponse of(ErrorCode errorCode) {
        return ErrorResponse.builder()
                .success(false)
                .error(ErrorDetail.of(errorCode))
                .build();
    }
    
    /**
     * @Valid 검증 실패 시 필드별 오류 목록 포함응답
     * ex: 이름 필드 누락 + 이메일 형식오류가 동시에 발생한 경우
     */
    public static ErrorResponse of(ErrorCode errorCode, List<String> details) {
    	return ErrorResponse.builder()
    			.success(false)
    			.error(ErrorDetail.of(errorCode, details))
    			.build();
    }
    
    @Getter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ErrorDetail {
    	private final String code;
    	private final String message;
    	// @Valid 실패 시 필드별 오류 목록, 평소엔 null
    	private final List<String> details;
    	
    	static ErrorDetail of(ErrorCode errorCode) {
    		return ErrorDetail.builder()
    				.code(errorCode.getCode())
    				.message(errorCode.getMessage())
    				.build();
    	}
    	
    	static ErrorDetail of(ErrorCode errorCode, List<String> details) {
    		return ErrorDetail.builder()
    				.code(errorCode.getCode())
    				.message(errorCode.getMessage())
    				.details(details)
    				.build();
    	}
    }
}