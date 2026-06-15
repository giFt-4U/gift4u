// friendshipApi.js
import axiosInstance from './axiosInstance';

export const getFriends = () => axiosInstance.get('/api/friendships');
