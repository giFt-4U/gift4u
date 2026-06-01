import axiosInstance from "./axiosInstance";

// 채팅방 목록 조회 (REQ-C01)
export const getChatRooms = () => axiosInstance.get('/api/chat/rooms');

// 채팅방 생성 or 조회 (REQ-C02)
export const getOrCreateRoom = (opponentId) => axiosInstance.post('/api/chat/rooms', { opponentId });

// 과거 메시지 페이징 조회 (REQ-C03)
export const getMessages = (roomId, page = 0, size = 30) =>
    axiosInstance.get(`/api/chat/rooms/${roomId}/message?page=${page}&size=${size}`);