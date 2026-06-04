import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { acceptGift } from '../../api/giftApi';
import * as S from '../../styles/gift/GiftAddressStyle';

/**
 * 배송지 입력 페이지 (REQ-014)
 *
 * 진입 경로:
 *   GiftCardView → "주소 입력하기" 버튼
 *   → /gifts/:uuid/address
 *
 * 흐름:
 *   1. 수령자 이름 / 연락처 / 주소 / 상세주소 / 우편번호 입력
 *   2. 선물하기 버튼 → acceptGift(uuid, formData) API 호출
 *   3. 성공 → /gifts/:uuid/accept 이동
 *   4. 실패 → 에러 코드별 메시지 표시
 *
 * 유효성 검증:
 *   FE에서 1차 검증 (필수값 비어있는지)
 *   BE에서 2차 검증 (@Valid @NotBlank)
 *   → 두 곳 다 체크해야 안전
 */
const GiftAddress = () => {
    const navigate = useNavigate();
    const { uuid } = useParams();

    const [form, setForm] = useState({
        receiverName: '',
        receiverPhone: '',
        address: '',
        addressDetail: '',
        zipCode: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // ── 입력값 변경 ──────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // 입력 시 해당 필드 에러 즉시 제거
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    // ── FE 유효성 검증 ───────────────────────────────────
    const validate = () => {
        const newErrors = {};
        if (!form.receiverName.trim()) newErrors.receiverName = '이름을 입력해주세요.';
        if (!form.receiverPhone.trim()) newErrors.receiverPhone = '연락처를 입력해주세요.';
        if (!form.address.trim()) newErrors.address = '주소를 입력해주세요.';
        return newErrors;
    };

    // ── 선물 수령 API 호출 ───────────────────────────────
    const handleSubmit = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiError(null);

        try {
            await acceptGift(uuid, {
                receiverName: form.receiverName.trim(),
                receiverPhone: form.receiverPhone.trim(),
                address: form.address.trim(),
                addressDetail: form.addressDetail.trim(),
                zipCode: form.zipCode.trim(),
            });

            // 수령 완료 페이지로 이동
            navigate(`/gifts/${uuid}/accept`);

        } catch (e) {
            const code = e.response?.data?.error?.code;
            if (code === 'GIFT_ALREADY_RECEIVED') {
                setApiError('이미 수령한 선물입니다.');
            } else if (code === 'GIFT_EXPIRED') {
                setApiError('만료된 선물입니다.');
            } else if (code === 'GIFT_LINK_INVALID') {
                setApiError('유효하지 않은 선물 링크입니다.');
            } else if (code === 'FORBIDDEN') {
                setApiError('수령 권한이 없습니다.');
            } else {
                setApiError('오류가 발생했습니다. 다시 시도해주세요.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>

            <S.ScrollArea>

                {/* 이름 */}
                <S.FieldGroup>
                    <S.FieldLabel>이름</S.FieldLabel>
                    <S.FieldInput
                        name="receiverName"
                        value={form.receiverName}
                        onChange={handleChange}
                        placeholder="받는 분 이름을 입력하세요"
                        $hasError={!!errors.receiverName}
                    />
                    {errors.receiverName && <S.FieldError>{errors.receiverName}</S.FieldError>}
                </S.FieldGroup>

                {/* 연락처 */}
                <S.FieldGroup>
                    <S.FieldLabel>휴대폰 번호</S.FieldLabel>
                    <S.FieldInput
                        name="receiverPhone"
                        value={form.receiverPhone}
                        onChange={handleChange}
                        placeholder="010"
                        type="tel"
                        $hasError={!!errors.receiverPhone}
                    />
                    {errors.receiverPhone && <S.FieldError>{errors.receiverPhone}</S.FieldError>}
                </S.FieldGroup>

                {/* 주소 */}
                <S.FieldGroup>
                    <S.FieldLabel>주소 별명</S.FieldLabel>
                    <S.FieldInput
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="주소 별명을 입력하세요 (예시: 집, 회사)"
                        $hasError={!!errors.address}
                    />
                    {errors.address && <S.FieldError>{errors.address}</S.FieldError>}
                </S.FieldGroup>

                {/* 상세주소 */}
                <S.FieldGroup>
                    <S.FieldLabel>배송지 정보</S.FieldLabel>
                    <S.FieldInput
                        name="addressDetail"
                        value={form.addressDetail}
                        onChange={handleChange}
                        placeholder="주소를 입력하세요"
                    />
                    <S.FieldInput
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        placeholder="기본배송지: 사용자 주소 (예시: 000-000-00)"
                        style={{ marginTop: 8 }}
                    />
                </S.FieldGroup>

                {/* 배송 메모 — 추후 기능 확장용 (현재 BE 미지원) */}
                <S.FieldGroup>
                    <FieldLabel>배송의 특이</FieldLabel>
                    <S.MemoBox>
                        S.<MemoText>기본배송지</MemoText>
                        <S.MemoSub>사용자 주소 (예시: 000-000-000-00)</S.MemoSub>
                    </S.MemoBox>
                    <S.AddButton>+ 배송지 추가</S.AddButton>
                </S.FieldGroup>

                {apiError && <S.ApiError>{apiError}</S.ApiError>}

            </S.ScrollArea>

            {/* 선물하기 버튼 */}
            <S.BottomArea>
                <S.SubmitButton onClick={handleSubmit} disabled={loading}>
                    {loading ? '처리 중...' : '선물하기'}
                </S.SubmitButton>
            </S.BottomArea>

        </S.Container>
    );
};

export default GiftAddress;