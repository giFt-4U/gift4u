# 🎁 따숨품 (Ttasumm)

> **메신저 연동형 모바일 선물 커머스 플랫폼**  
> 친구에게 마음을 담은 선물을, 채팅으로 따뜻하게 전달하세요.

<br>

## 📌 프로젝트 소개

**따숨품**은 친구와의 채팅 안에서 선물을 발견하고, 주문하고, 전달하는  
**메신저 연동형 선물 커머스 서비스**입니다.

기존 선물 커머스의 불편함(주소 수집, 외부 공유 등)을 해소하고,  
채팅 기반의 자연스러운 선물 경험을 제공합니다.

### User Flow
```
MAIN → 상품목록 → 상품상세 → 친구선택 → 주문 → 메시지카드 작성
     → 채팅방 선물카드 전송 → 받는 사람 확인 → 주소 입력 → 수락 완료
```

<br>

## 👥 팀 소개

| 이름 | 역할 |
|------|------|
| **이혜인** | 선물/메시지 담당 (선물전송 코어 · 채팅) · UI/UX · 문서 작업 |
| **김광현** | 유저/로그인/친구 담당 (계정 · Kakao OAuth) · ERD · 요구명세서 |
| **윤재원** | 제품/탐색/경험 (메인 · 상세페이지) · 페르소나 · DB |

> 팀명: **GiFt-4U (F4)** | 프로젝트 기간: `2026.04.22 ~ 2026.06.24`

<br>

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **Backend** | Java · Spring Boot (STS) |
| **Frontend** | React · styled-components · Figma (UI/UX) |
| **Database** | H2 (개발) → Oracle · JPA |
| **실시간 통신** | WebSocket · STOMP |
| **인증** | Kakao OAuth2 · JWT |
| **Infra** | AWS |
| **Architecture** | Domain-based Layered Architecture (Controller - Service - Repository) |
| **협업** | Git · Postman · dbdiagram.io |

<br>

## 📁 프로젝트 구조

```
gift-4u/
├── backend/
│   └── gift-4u/
│       └── src/main/java/com/gift_4u/F4/
│           ├── domain/
│           │   ├── Gift/          # 선물 도메인
│           │   ├── Message/       # 채팅/메시지 도메인
│           │   ├── Product/       # 제품 도메인
│           │   └── User/          # 유저 도메인
│           └── global/            # Security, CORS, WebSocket,Config 설정
└── frontend/
    └── src/
        ├── api/                   # REST API 모듈
        ├── hooks/                 # Custom Hooks (useChat 등)
        ├── pages/                 # 페이지 컴포넌트
        ├── components/            # 공통 컴포넌트
        └── router/                # React Router 설정
```

<br>

## 🗃 ERD

> 주요 테이블: `USERS` · `FRIENDSHIPS` · `CHAT_ROOMS` · `CHAT_MESSAGES` · `GIFTS` · `GIFT_MESSAGES` · `GIFT_SHIPPING` · `GIFT_CHAT_LINKS` · `PRODUCTS` · `CATEGORIES` · `BANNERS`

<br>

## 🔄 선물 전송 플로우

```
1. POST /api/gifts                   → 선물 생성 (giftId, uuid 반환)
2. STOMP /pub/chat/message           → 채팅방에 선물카드 자동 전송
3. POST /api/gift-chat-links         → 선물-채팅 연결 저장
4. 받는 사람: GET /api/gifts/{uuid}   → 선물 확인
5. POST /api/gifts/{id}/shipping     → 주소 입력 → 수락 완료
```

<br>

<p align="center">
  <b>GiFt-4U (F4)</b> · 따숨품 · 2025
</p>
