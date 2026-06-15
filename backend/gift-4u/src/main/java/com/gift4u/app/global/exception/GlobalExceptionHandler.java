package com.gift4u.app.global.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import lombok.extern.slf4j.Slf4j;

/** 서비스 전역 예외 처리 핸들러
 * 응답 포맷:
 * 	{ "success": false, "error": { "code": "...", "message": "..."} }
 */


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	
	/** 직접 던지는 예외
	 * ex: throw new GlobalException(ErrorCode.USER_NOT_FOUND)
	 * 		-> 404, { "success": false, "error": { "code": "USER_NOT_FOUND", ... } }
	 */
    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(GlobalException e) {
    	// 4xx는 warn(의도된 상황), 5xx는 error(서버 버그)로 레벨 구분!
    	if(e.getErrorCode().getStatus().is5xxServerError()) {
    		log.error("[GlobalException] code={}, message={}", e.getErrorCode().getCode(), e.getMessage(), e);
    	} else {
    		log.warn("[GlobalExcption] code={}, message={}", e.getErrorCode().getCode(), e.getMessage());
    	}
    	return ResponseEntity
    			.status(e.getErrorCode().getStatus())
    			.body(ErrorResponse.of(e.getErrorCode())); 
    }
    
    
    /**  @Valid + @RequestBody 검증 실패 -> 400
     * ex: name 필드 @NotBlank 실패
     * 		-> { "code": "INVALID_INPUT_VALUE", "details": ["name: 필수 항목입니다."] }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidException(MethodArgumentNotValidException e) {
        List<String> details = e.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .toList();
        log.warn("[ValidationFailed] details={}", details);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE, details));
    }

    
    /** PathVariable, ReqyestParam 타입 불일치 -> 400
     * ex: GET 	/products/abc (id 자리에 문자열)
     * 		-> 400, INVALID_TYPE_VALUE
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException e) {
    	log.warn("[TypeMismatch] param={}, value={}", e.getName(), e.getValue());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(ErrorCode.INVALID_TYPE_VALUE));
    }
    
    
    /** Spring Security - 권한 없음 -> 403
     * 
     * @PreAuthorize, @Secured, hasRole() 등 메서드 보안 실패 시 잡는다!
     * + SecurityConfig의 antMatchers 수준에서 막힌 경우는 AccessDeniedHandler가 처리한다.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException e) {
        log.warn("[AccessDenied] message={}", e.getMessage());
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse.of(ErrorCode.FORBIDDEN));
    }
    
    
    /** 예상치 못한 모든 예외 -> 500
     * 사용자에게 내부 정보 절대 노출하지 않는다. 절대!
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("[UnexpectedException] {} ", e.getMessage(), e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}