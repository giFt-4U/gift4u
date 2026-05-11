import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/chat';

// 내 채팅방 목록 조회
export const getRooms = (userId) =>
    axios.get(`${BASE_URL}/rooms`, { params: { userId } })
        .then(res => res.data);

// 친구와 채팅방
export const createRoom = (myId, friendId) =>
    axios.get(`${BASE_URL}/rooms`, { friendId }, { params: { myId } })
        .then(res => res.data);

// 채팅방 메시지 내역 조회
export const getMessages = (roomId) =>
    axios.get(`${BASE_URL}/rooms/${roomId}/messages`)
        .then(res => res.data);