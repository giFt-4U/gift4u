// axiosInstance.js

import axios from "axios";

/**
 * 백엔드 API 기본 주소
 *
 * 1순위: .env 파일의 VITE_API_URL 사용
 * 2순위: 환경변수가 없을 경우 localhost:8080 사용
 *
 * 예)
 * VITE_API_URL=http://localhost:8080
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * axios 공통 인스턴스
 *
 * 모든 API 요청에서 공통으로 사용할 설정을 작성한다.
 * baseURL을 지정해두면 요청 시 "/api/products"처럼 작성해도
 * 실제 요청은 "http://localhost:8080/api/products"로 전송된다.
 */
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


/**
 * 요청 인터셉터
 *
 * 모든 요청이 서버로 전송되기 전에 실행된다.
 * localStorage에 JWT 토큰이 있으면 Authorization 헤더에 자동으로 추가한다.
 *
 * 예)
 * Authorization: Bearer 토큰값
 */
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

/**
 * 응답 인터셉터
 *
 * 서버 응답을 받은 후 실행된다.
 * 401 Unauthorized 응답이 오면 토큰이 만료되었거나 인증이 실패한 것으로 판단한다.
 *
 * 처리 방식:
 * 1. localStorage에서 token 삭제
 * 2. 로그인 페이지로 이동
 */
axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;