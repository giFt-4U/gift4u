import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmPaymentAndCreateGift, uploadGiftImage } from '../../api/giftApi';
import * as S from '../../styles/gift/GiftCardStyle';

// 봉투 디자인 목록 (이미지 경로 매핑)
const CARD_DESIGNS = [
    { type: 1, label: '플라워', imgSrc: '/images/cards/card1.png' },
    { type: 2, label: '스타', imgSrc: '/images/cards/card2.png' },
    { type: 3, label: '체크', imgSrc: '/images/cards/card3.png' },
];

const GiftCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);

    // 상품 상세에서 전달받은 값
    const {
        productId,
        receiverId,
        productName,
        productNames,
        productImages,
        imageUrl,
        image_url,
        productPrice,
        totalPrice
    } = location.state ?? {};

    const [message, setMessage] = useState(location.state?.message || '');
    const [selectedDesign, setSelectedDesign] = useState(location.state?.cardDesignType || 1);
    const [uploadedImgUrl, setUploadedImgUrl] = useState(location.state?.uploadedImgUrl || null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MAX_LENGTH = 200;
    const remaining = MAX_LENGTH - message.length;

    // 배너 클릭 시 파일 선택 창 열기
    const handleBannerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 완료 시 미리보기 URL 생성 및 저장
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1) 즉시 미리보기 (blob URL)
        const previewUrl = URL.createObjectURL(file);
        setUploadedImgUrl(previewUrl);

        // 2) 실제 서버 업로드 후, 영구 URL로 교체
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const res = await uploadGiftImage(formData);
            const realUrl = res.data?.imageUrl || res.data?.url;

            if (realUrl) {
                setUploadedImgUrl(realUrl);
            } else {
                setError('이미지 업로드 응답이 올바르지 않습니다.');
            }
        } catch (err) {
            setError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
            setUploadedImgUrl(null);
        } finally {
            setUploading(false);
        }
    };

    // ── 선물하기 및 결제 페이지 이동 ───────────────────────
    const handleSubmit = async () => {
        if (!message.trim()) {
            setError('메시지를 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);

        const finalAmount = totalPrice ?? productPrice ?? 0;

        navigate('/gifts/checkout', {
            state: {
                amount: Number(finalAmount),
                productPrice: Number(finalAmount),
                ...location.state,
                giftData: {
                    receiverId,
                    productId,
                    message: message.trim(),
                    cardDesignType: selectedDesign,
                    productName: productName,
                    imageUrl: imageUrl || image_url,
                    uploadedImgUrl: uploadedImgUrl,
                    price: Number(finalAmount)
                }
            }
        });
    };

    // ── 카드 미리보기 ────────────────────────────────────
    const handlePreview = () => {
        if (!message.trim()) {
            setError('메시지를 입력해주세요.');
            return;
        }
        setError(null);
        navigate('/gifts/card/preview', {
            state: {
                ...location.state,
                message,
                cardDesignType: selectedDesign,
                uploadedImgUrl: uploadedImgUrl
            },
        });
    };

    return (
        <S.Container>
            <S.ScrollArea>

                <S.TopPreviewBox onClick={handleBannerClick}>
                    {uploadedImgUrl ? (
                        <S.UploadedPreviewImg src={uploadedImgUrl} alt="사용자 업로드 이미지" />
                    ) : (
                        <S.PreviewPlaceholderText>📸 클릭하여 카드에 넣을 사진 고르기</S.PreviewPlaceholderText>
                    )}
                    {uploading && <S.PreviewPlaceholderText>업로드 중...</S.PreviewPlaceholderText>}
                </S.TopPreviewBox>

                {/* 숨겨진 파일 인풋 태그 */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {/* 상품명 표시 */}
                {productName && (
                    <S.ProductLabel>📦 {productName}</S.ProductLabel>
                )}

                {/* 메시지 입력 */}
                <S.Section>
                    <S.SectionLabel>메시지를 입력하세요.</S.SectionLabel>
                    <S.MessageInput
                        value={message}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_LENGTH) {
                                setMessage(e.target.value);
                            }
                        }}
                        placeholder="따뜻한 마음을 전해보세요..."
                        rows={5}
                    />
                    <S.CharCount $warning={remaining <= 20}>
                        {message.length} / {MAX_LENGTH}
                    </S.CharCount>
                </S.Section>

                {/* 편지 봉투 고르기 (사진 선택 컴포넌트) */}
                <S.Section>
                    <S.SectionLabel>편지 봉투 고르기</S.SectionLabel>
                    <S.DesignGrid>
                        {CARD_DESIGNS.map((design) => (
                            <S.DesignItem
                                key={design.type}
                                $selected={selectedDesign === design.type}
                                onClick={() => setSelectedDesign(design.type)}
                            >
                                <S.DesignImage src={design.imgSrc} alt={design.label} />
                            </S.DesignItem>
                        ))}
                    </S.DesignGrid>
                </S.Section>

                {error && <S.ErrorText>{error}</S.ErrorText>}

            </S.ScrollArea>

            {/* 하단 버튼 */}
            <S.ButtonRow>
                <S.PreviewButton onClick={handlePreview}>
                    카드 미리보기
                </S.PreviewButton>
                <S.SubmitButton onClick={handleSubmit} disabled={loading || uploading}>
                    {loading ? '전송 중...' : uploading ? '사진 업로드 중...' : '결제하기'}
                </S.SubmitButton>
            </S.ButtonRow>
        </S.Container>
    );
};

export default GiftCard;
