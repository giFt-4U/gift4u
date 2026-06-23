import axiosInstance from './axiosInstance';

// 선물 생성 (REQ-011)
export const confirmPaymentAndCreateGift = (confirmData) => axiosInstance.post('/api/payments/confirm', confirmData);

// 선물 상세 조회 - 링크용, 토큰 불필요 (REQ-013)
export const getGift = (uuid) => axiosInstance.get(`/api/gifts/${uuid}`);

// 선물 수령 + 배송지 입력 (REQ-014)
export const acceptGift = (uuid, data) => axiosInstance.patch(`/api/gifts/${uuid}/accept`, data);

// 선물 거절 (REQ-015)
export const refuseGift = (uuid) => axiosInstance.patch(`/api/gifts/${uuid}/refuse`);

// 내가 보낸 선물 목록 (REQ-012)
export const getSentGifts = () => axiosInstance.get('/api/gifts/sent');

// 내가 받은 선물 목록 (REQ-013)
export const getReceivedGifts = () => axiosInstance.get('/api/gifts/received');

// 메시지 카드 이미지 추가
export const uploadGiftImage = (formData) =>
    axiosInstance.post('/api/gifts/upload', formData);