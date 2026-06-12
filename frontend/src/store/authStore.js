import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token'),

    user: (() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    })(),

    setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },

    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },

    clearToken: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
    },
}));

export default useAuthStore;
