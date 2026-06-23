// axiosInstance.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
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

    if (config.data instanceof FormData) {
        if (typeof config.headers.delete === "function") {
            config.headers.delete("Content-Type");
        } else {
            delete config.headers["Content-Type"];
        }
    } else if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
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
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            const redirect = encodeURIComponent(
                window.location.pathname + window.location.search
            );
            window.location.href = `/login?redirect=${redirect}`;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;