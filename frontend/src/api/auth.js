// auth.js
import axiosInstance from './axiosInstance';

export const login = (email, password) =>
    axiosInstance.post('/api/auth/login', { email, password });

export const signup = (data) =>
    axiosInstance.post('/api/auth/signup', data);

export const kakaoLogin = (code) =>
    axiosInstance.post('/api/auth/kakao', { code });

export const getMe = () =>
    axiosInstance.get('/api/users/me');
