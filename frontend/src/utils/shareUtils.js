const KAKAO_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

export const copyText = async (text) => {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (!copied) {
        throw new Error('copy failed');
    }
};

export const initKakaoSdk = () => {
    if (window.Kakao && KAKAO_KEY && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY);
    }
};

export const buildProductShareUrl = (productId, friendCode) => {
    const url = new URL(`${window.location.origin}/products/${productId}`);
    if (friendCode) {
        url.searchParams.set('ref', friendCode);
    }
    return url.toString();
};

export const buildFriendInviteUrl = (friendCode) => {
    const url = new URL(`${window.location.origin}/chat/add`);
    if (friendCode) {
        url.searchParams.set('code', friendCode);
    }
    return url.toString();
};

export const getProductImageUrl = (product) => {
    const imageSrc = product?.imageUrl || product?.image_url;
    if (!imageSrc) return `${window.location.origin}/images/default.png`;
    if (imageSrc.startsWith('http')) return imageSrc;
    return `${window.location.origin}${imageSrc}`;
};

export const getDefaultShareImageUrl = () => `${window.location.origin}/images/default.png`;

/** feed 카드용 — 카카오 서버가 이미지를 가져올 수 있는 공개 URL인지 */
export const canUseKakaoFeedImage = (url) => {
    try {
        const { hostname } = new URL(url);
        return hostname !== 'localhost' && hostname !== '127.0.0.1';
    } catch {
        return false;
    }
};
