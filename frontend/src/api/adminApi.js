import axiosInstance from './axiosInstance';

// 대시보드
export const getAdminDashboard = () =>
    axiosInstance.get('/api/admin/dashboard');

// 회원 관리
export const getAdminUsers = ({ search, status, page = 0, size = 10 } = {}) =>
    axiosInstance.get('/api/admin/users', {
        params: {
            ...(search ? { search } : {}),
            ...(status && status !== 'all' ? { status } : {}),
            page,
            size,
        },
    });

export const getAdminUser = (userId) =>
    axiosInstance.get(`/api/admin/users/${userId}`);
