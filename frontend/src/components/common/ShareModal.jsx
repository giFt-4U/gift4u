import React, { useEffect, useState } from 'react';
import { copyText, initKakaoSdk } from '../../utils/shareUtils';
import {
    ShareOverlay,
    ShareModalBox,
    ShareModalHeader,
    ShareTitle,
    ShareCloseButton,
    ShareList,
    ShareItem,
    ShareIcon,
    ShareLinkBar,
    ShareLinkText,
    ShareCopyButton,
} from '../../styles/ShareModalStyle';

const KakaoTalkIcon = () => (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect width="56" height="56" rx="12" fill="#FEE500" />
        <g transform="translate(0, 4)">
            <path
                fill="#3C1E1E"
                d="M28 13c-6.35 0-11.5 4.15-11.5 9.27 0 3.05 2.01 5.74 5.04 7.24l-.99 3.7a.5.5 0 0 0 .77.52l4.42-2.92c1.66.27 3.42.41 5.26.41 6.35 0 11.5-4.15 11.5-9.27S34.35 13 28 13Z"
            />
            <text
                x="28"
                y="25.5"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FEE500"
                fontSize="7.5"
                fontWeight="800"
                fontFamily="Arial, Helvetica, sans-serif"
                letterSpacing="0.2"
            >
                TALK
            </text>
        </g>
    </svg>
);

const SmsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#2E7D32" strokeWidth="1.8" />
        <path d="M3 7.5 12 13l9-5.5" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ShareModal = ({ open, onClose, shareUrl, kakao, smsText }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        initKakaoSdk();
    }, []);

    useEffect(() => {
        if (!open) {
            setCopied(false);
        }
    }, [open]);

    if (!open) return null;

    const handleCopy = async () => {
        try {
            await copyText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert('복사에 실패했어요. 직접 URL을 복사해주세요.');
        }
    };

    const handleKakaoShare = () => {
        if (!window.Kakao?.isInitialized()) {
            alert('카카오 SDK가 준비되지 않았습니다.');
            return;
        }

        // feed 카드 description에는 URL이 화면에 안 보이는 경우가 많아 text 템플릿 사용
        const shareText = `${kakao.title}\n${kakao.description}\n${shareUrl}`;

        window.Kakao.Share.sendDefault({
            objectType: 'text',
            text: shareText,
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
            },
            buttonTitle: kakao.buttonTitle || '따숨품에서 보기',
        });
        onClose();
    };

    const handleSmsShare = () => {
        window.location.href = `sms:?body=${encodeURIComponent(smsText)}`;
        onClose();
    };

    return (
        <ShareOverlay onClick={onClose}>
            <ShareModalBox onClick={(e) => e.stopPropagation()}>
                <ShareModalHeader>
                    <ShareTitle>공유하기</ShareTitle>
                    <ShareCloseButton type="button" onClick={onClose} aria-label="닫기">
                        ×
                    </ShareCloseButton>
                </ShareModalHeader>

                <ShareList>
                    <ShareItem type="button" onClick={handleKakaoShare}>
                        <ShareIcon $bg="transparent" $full>
                            <KakaoTalkIcon />
                        </ShareIcon>
                        카카오톡
                    </ShareItem>
                    <ShareItem type="button" onClick={handleSmsShare}>
                        <ShareIcon $bg="#E8F5E9">
                            <SmsIcon />
                        </ShareIcon>
                        문자
                    </ShareItem>
                </ShareList>

                <ShareLinkBar>
                    <ShareLinkText readOnly value={shareUrl} />
                    <ShareCopyButton type="button" onClick={handleCopy}>
                        {copied ? '완료' : '복사'}
                    </ShareCopyButton>
                </ShareLinkBar>
            </ShareModalBox>
        </ShareOverlay>
    );
};

export default ShareModal;
