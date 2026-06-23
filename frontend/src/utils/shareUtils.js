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

