// axiosInstance.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 요청 인터셉터
 * 모든 요청에 JWT 토큰을 자동으로 붙인다.
 * 로그인한 상태면 Authorization 헤더 자동 추가
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
 * 401 응답 시 토큰 만료로 판단 -> 로그인 페이지로 이동
 */
axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;