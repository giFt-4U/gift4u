# 🎁 따숨품 dasumpum

> **주소를 몰라도 마음은 전할 수 있게**
> 유아·가족 선물 상황에 특화된 **메신저 기반 선물 커머스 플랫폼**

<br />

## 📌 프로젝트 소개

**따숨품**은 상품 구매, 메시지 카드 작성, 결제, 채팅방 선물 전달, 수령자 주소 입력까지 하나의 흐름으로 연결한 선물 커머스 서비스입니다.

발신자는 상대방의 주소를 몰라도 선물을 보낼 수 있고, 수신자는 채팅방에서 선물 카드를 확인한 뒤 직접 주소를 입력해 선물을 받을 수 있습니다.

<br />

## 💡 핵심 기능

* 친구 기반 선물 전송
* 메시지 카드 작성 및 카드 디자인 선택
* 사용자 이미지 업로드 기반 선물 카드 커스터마이징
* Toss Payments 결제 연동
* UUID 기반 선물 링크 생성
* WebSocket/STOMP 기반 채팅방 GIFT 메시지 자동 전송
* 수신자 주소 입력 및 배송지 저장
* 선물 상태 관리: `PENDING`, `ACCEPTED`, `REFUSED`, `EXPIRED`
* 7일 미수령 선물 자동 만료 스케줄러
* JWT 인증, UUID 링크, XSS 방어, GlobalException 기반 예외 처리

<br />

## 🧭 서비스 플로우

```text
회원가입 / 로그인
 → 상품 탐색
 → 친구 선택
 → 메시지 카드 작성
 → 결제
 → 채팅방에 선물 메시지 자동 전송
 → 수신자 선물 확인
 → 주소 입력
 → 수령 완료
```

<br />

## ✨ 차별점

| 구분     | 따숨품                                 |
| ------ | ----------------------------------- |
| 타겟     | 유아·가족 선물 상황 중심                      |
| 전달 방식  | 인앱 채팅 + UUID 선물 링크                  |
| 주소 입력  | 수신자가 직접 입력                          |
| 감성 요소  | 메시지 카드, 카드 디자인, 이미지 업로드             |
| 실시간성   | WebSocket/STOMP 기반 선물 메시지 전달        |
| 서비스 흐름 | 상품 선택부터 결제, 수령, 배송지 저장까지 All-in-One |

<br />

## 🛠 기술 스택

| 분류            | 기술                                                  |
| ------------- | --------------------------------------------------- |
| Backend       | Java, Spring Boot, Spring Security, JPA, Maven      |
| Frontend      | React, Vite, JavaScript, Zustand, styled-components |
| Database      | Oracle SQL                                          |
| Realtime      | WebSocket, STOMP, SockJS                            |
| Auth          | JWT, Kakao OAuth2                                   |
| Payment       | Toss Payments                                       |
| Infra         | AWS, Apache Tomcat                                  |
| Collaboration | GitHub, Jira, Notion, Postman                       |

<br />

## 🏗 아키텍처

```text
Controller
 → Service
 → Repository
 → Entity
 → Database
```

도메인 기반 Layered Architecture를 적용하여 회원, 친구, 상품, 주문, 결제, 선물, 채팅, 위시리스트, 관리자 기능을 분리했습니다.

<br />

## 📁 주요 도메인

| 도메인          | 설명                       |
| ------------ | ------------------------ |
| User         | 회원, 로그인, JWT 인증          |
| Friendship   | 친구 요청, 수락, 거절, 삭제        |
| Product      | 상품 목록, 상세, 카테고리          |
| Cart / Order | 장바구니 및 주문 흐름             |
| Payment      | Toss Payments 결제 승인 및 취소 |
| Gift         | 선물 생성, 수령, 거절, 만료 상태 관리  |
| GiftMessage  | 메시지 카드, 카드 디자인, 업로드 이미지  |
| GiftShipping | 수령자 배송지 저장               |
| Chat         | 실시간 채팅방                  |
| ChatMessage  | 일반 메시지 및 GIFT 타입 메시지     |
| Wishlist     | 받고 싶은 상품 저장              |
| Admin        | 회원 및 상품 관리               |

<br />

## 🔐 보안 및 검증

* JWT 기반 인증/인가
* UUID 기반 선물 링크로 PK 직접 노출 방지
* 수령자 본인만 주소 입력 가능
* XSS Filter 및 JSON 문자열 이스케이프 처리
* `@Valid` 기반 요청 검증
* GlobalExceptionHandler 기반 예외 응답 표준화
* 결제 전 `orderId`, `amount` 임시 저장으로 금액 변조 방지

<br />

## 📦 실행 방법

### Frontend

```bash
cd frontend
npm install
npm install @tosspayments/tosspayments-sdk
npm run dev
```

### Backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

<br />

## 👥 팀원 및 역할

| 이름  | 역할                                   |
| --- | ------------------------------------ |
| 이혜인 | PM, 선물/메시지, 채팅, 결제, UI/UX, 문서, 예외 처리 |
| 김광현 | 유저/친구, 회원, ERD, 요구사항 명세서, 관리자 페이지    |
| 윤재원 | 상품/탐색, 페르소나, DB, FE UI/UX, 관리자 페이지   |

<br />

## 📅 프로젝트 기간

```text
2026.04.22 ~ 2026.06.24
```

<br />

## 📌 한 줄 소개

> **따숨품은 주소를 묻기 어려운 상황에서도 따뜻한 메시지와 함께 선물을 전달할 수 있는 유아·가족 감성 선물 플랫폼입니다.**
