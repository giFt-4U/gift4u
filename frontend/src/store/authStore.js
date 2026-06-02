import { create } from 'zustand';

/** 로그인 상태 전역 관리
 * token    : localStorage에 저장된 JWT
 * setToken : 로그인 성공 시 호출
 * clearToken: 로그아웃 시 호출
 */

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token'),

    setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },

    clearToken: () => {
        localStorage.removeItem('token');
        set({ token: null });
    },
}));

export default useAuthStore;