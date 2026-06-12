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

export const updateMe = (data) =>
    axiosInstance.patch('/api/users/me', data);

export const uploadProfileImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post('/api/users/me/profile-image', formData);
};

export const deleteProfileImage = () =>
    axiosInstance.delete('/api/users/me/profile-image');

export const changePassword = (data) =>
    axiosInstance.patch('/api/users/me/password', data);

export const withdraw = () =>
    axiosInstance.delete('/api/users/me');
