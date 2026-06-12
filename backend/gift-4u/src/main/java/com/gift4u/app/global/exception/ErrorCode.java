package com.gift4u.app.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 서비스 전체에서 사용하는 에러 코드
 * 
 * 구조 [HTTP 상태, 클라이언트 노출 코드, 메시지]
 * - status : 실제 HTTP 응답 상태코드. ResponseEntity에 직접 사용합니다.
 * - code   : FE가 분기 처리할 짧은 식별자입니다.
 * - message: 사용자에게 보여줄 메시지.
 */

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    /////////// 400 - 클라이언트가 잘못된 값을 보낸 경우 ///////////
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "INVALID_INPUT_VALUE", "입력값이 올바르지 않습니다."),
    INVALID_TYPE_VALUE(HttpStatus.BAD_REQUEST, "INVALID_TYPE_VALUE", "타입이 올바르지 않습니다."),
    INVALID_FRIENDSHIP_STATUS(HttpStatus.BAD_REQUEST, "INVALID_FRIENDSHIP_STATUS", "처리할 수 없는 친구 요청 상태입니다."),

    MESSAGE_TEXT_BLANK(HttpStatus.BAD_REQUEST, "MESSAGE_TEXT_BLANK", "메시지를 입력해주세요."),
    MESSAGE_TOO_LONG(HttpStatus.BAD_REQUEST, "MESSAGE_TOO_LONG", "메시지는 200자를 초과할 수 없습니다."),
    ORDER_REQUIRED_FIELD_MISSING(HttpStatus.BAD_REQUEST, "ORDER_REQUIRED_FIELD_MISSING", "주문 필수 항목이 누락되었습니다."),
    FRIEND_REQUEST_TO_SELF(HttpStatus.BAD_REQUEST, "FRIEND_REQUEST_TO_SELF", "본인에게 친구 요청을 보낼 수 없습니다."),
    TERMS_AGREEMENT_REQUIRED(HttpStatus.BAD_REQUEST, "TERMS_AGREEMENT_REQUIRED", "약관에 동의해야 가입할 수 있습니다."),
    CHAT_MESSAGE_BLANK(HttpStatus.BAD_REQUEST, "CHAT_MESSAGE_BLANK", "메시지를 입력해주세요."),
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "INVALID_FILE_TYPE", "지원하지 않는 이미지 형식입니다."),
    FILE_TOO_LARGE(HttpStatus.BAD_REQUEST, "FILE_TOO_LARGE", "이미지 용량이 너무 큽니다."),

    /////////// 401 - 인증되지 않은 요청 ///////////

    // JWT
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "로그인이 필요합니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "INVALID_TOKEN", "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "EXPIRED_TOKEN", "토큰이 만료되었습니다. 다시 로그인해주세요."),
    KAKAO_AUTH_FAILED(HttpStatus.UNAUTHORIZED, "KAKAO_AUTH_FAILED", "카카오 인증에 실패했습니다."),
    INVALID_LOGIN_CREDENTIALS(HttpStatus.UNAUTHORIZED, "INVALID_LOGIN_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다."),

    /////////// 403 - 인증은 됐지만 권한이 없는 경우 ///////////
    FORBIDDEN(HttpStatus.FORBIDDEN, "FORBIDDEN", "접근 권한이 없습니다."),
    CHAT_ROOM_ACCESS_DENIED(HttpStatus.FORBIDDEN, "CHAT_ROOM_ACCESS_DENIED", "해당 채팅방에 접근할 권한이 없습니다."),
    NOT_FRIEND(HttpStatus.FORBIDDEN, "NOT_FRIEND", "친구가 아닌 사용자와는 채팅방을 생성할 수 없습니다."),

    /////////// 404 - 리소스를 찾을 수 없는 경우 ///////////
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "E404_USER", "사용자를 찾을 수 없습니다."),
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "E404_GIFT", "상품을 찾을 수 없습니다."),
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", "선물 주문 정보를 찾을 수 없습니다."),
    GIFT_LINK_INVALID(HttpStatus.NOT_FOUND, "GIFT_LINK_INVALID", "유효하지 않거나 만료된 선물 링크입니다."),
    FRIEND_CODE_NOT_FOUND(HttpStatus.NOT_FOUND, "FRIEND_CODE_NOT_FOUND", "사용자를 찾을 수 없습니다."),
    CHAT_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "CHAT_ROOM_NOT_FOUND", "채팅방을 찾을 수 없습니다."),
    PRODUCT_INACTIVE(HttpStatus.NOT_FOUND, "PRODUCT_INACTIVE", "판매가 종료된 상품입니다."),
    FRIENDSHIP_NOT_FOUND(HttpStatus.NOT_FOUND, "FRIENDSHIP_NOT_FOUND", "친구 요청을 찾을 수 없습니다."),

    /////////// 409 - 현재 상태와 충돌하는 요청 ///////////
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다."),
    DUPLICATE_NICKNAME(HttpStatus.CONFLICT, "DUPLICATE_NICKNAME", "이미 사용 중인 닉네임입니다."),
    FRIEND_REQUEST_ALREADY_EXISTS(HttpStatus.CONFLICT, "FRIEND_REQUEST_ALREADY_EXISTS", "이미 친구이거나 요청 대기 중입니다."),
    GIFT_ALREADY_RECEIVED(HttpStatus.CONFLICT, "GIFT_ALREADY_RECEIVED", "이미 수령한 선물입니다."),

    /////////// 410 - 존재했지만 더 이상 유효하지 않음 ///////////
    GIFT_EXPIRED(HttpStatus.EXPECTATION_FAILED, "GFIT_EXPIRED", "만료된 선물 입니다."),

    /////////// 500 - 서버 내부 오류 ///////////
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E500", "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."),
    GIFT_LINK_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "GIFT_LINK_CREATION_FAILED", "선물 링크 생성에 실패했습니다. 다시 시도해주세요."),
    FRIEND_CODE_GENERATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "FRIEND_CODE_GENERATION_FAILED", "친구 코드 생성에 실패했습니다. 다시 시도해 주세요."),
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "FILE_UPLOAD_FAILED", "프로필 이미지 업로드에 실패했습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}