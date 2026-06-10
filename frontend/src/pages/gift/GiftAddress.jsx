import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptGift, getGift } from '../../api/giftApi';
import useAuthStore from '../../store/authStore';
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
 * 
 * 진입 시 Forbidden 방지:
 *   마운트 즉시 getGift()로 선물 수령자 확인
 *   현재 로그인 userId ≠ receiverId 이면 접근 차단
 *
 * 카카오 주소 API:
 *   "주소 검색" 버튼 → daum.Postcode 팝업
 *   → 선택 시 address + zipCode 자동 입력
 */
const GiftAddress = () => {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const { user } = useAuthStore();

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
    const [checking, setChecking] = useState(true);

    // ── 진입 시 수령자 본인 확인 (Forbidden 사전 방지) ──
    useEffect(() => {
        getGift(uuid)
            .then((res) => {
                const gift = res.data;

                console.log("로그인한 유저 정보(user):", user);
                console.log("백엔드가 준 선물 정보(gift):", gift);
                // 만료/수령 완료 선물 접근 차단
                if (gift.status === 'EXPIRED') {
                    alert('만료된 선물입니다.');
                    navigate(-1);
                    return;
                }
                if (gift.status === 'ACCEPTED') {
                    alert('이미 수령한 선물입니다.');
                    navigate(-1);
                    return;
                }

                const myId = user?.id;
                const giftReceiverId = gift.receiver;

                // 수령자 본인 확인
                if (myId && giftReceiverId) {
                    // 두 ID를 숫자형태로 변환하여 정확히 일치하는지 검증
                    if (Number(giftReceiverId) !== Number(myId)) {
                        alert('수령 권한이 없습니다.');
                        navigate(-1);
                        return;
                    }
                }

                setChecking(false);
            })
            .catch(() => {
                alert('유효하지 않은 선물 링크입니다.');
                navigate(-1);
            });
    }, [uuid, user, navigate]);

    // ── 카카오 주소 API 팝업 ─────────────────────────────
    const openAddressSearch = () => {
        if (!window.daum?.Postcode) {
            alert('주소 검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
            return;
        }
        new window.daum.Postcode({
            oncomplete: (data) => {
                // 도로명 주소 우선, 없으면 지번 주소
                const fullAddress = data.roadAddress || data.jibunAddress;
                setForm((prev) => ({
                    ...prev,
                    address: fullAddress,
                    zipCode: data.zonecode,
                }));
                setErrors((prev) => ({ ...prev, address: null }));
            },
        }).open();
    };

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
            alert('선물 수령 및 배송지 입력이 완료되었습니다!');
            navigate(`/gifts/${uuid}/accept`);

        } catch (e) {
            const serverMessage = e.response?.data?.message;
            const code = e.response?.data?.error?.code;

            let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';

            if (code === 'GIFT_ALREADY_RECEIVED') {
                errorMessage = '이미 수령한 선물입니다.';
            } else if (code === 'GIFT_EXPIRED') {
                errorMessage = '만료된 선물입니다.';
            } else if (code === 'GIFT_LINK_INVALID') {
                errorMessage = '유효하지 않은 선물 링크입니다.';
            } else if (code === 'FORBIDDEN') {
                errorMessage = '수령 권한이 없습니다.';
            } else if (serverMessage) {
                errorMessage = serverMessage;
            }

            alert(errorMessage);
            setApiError(errorMessage);

            // 치명적인 에러(만료, 유효하지 않음)일 경우 안전하게 이전 페이지나 메인으로 이동 처리 가능
            if (code === 'GIFT_EXPIRED' || code === 'GIFT_LINK_INVALID') {
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    // 수령자 확인 중이면 로딩
    if (checking) return <S.CenterText>확인 중...</S.CenterText>;

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
                        placeholder="010-0000-0000"
                        type="tel"
                        $hasError={!!errors.receiverPhone}
                    />
                    {errors.receiverPhone && <S.FieldError>{errors.receiverPhone}</S.FieldError>}
                </S.FieldGroup>
                {/* 주소 — 카카오 API */}
                <S.FieldGroup>
                    <S.FieldLabel>배송지 정보</S.FieldLabel>
                    <S.AddressRow>
                        <S.FieldInput
                            name="address"
                            value={form.address}
                            placeholder="주소를 검색해주세요"
                            readOnly
                            $hasError={!!errors.address}
                            style={{ flex: 1 }}
                        />
                        <S.SearchButton type="button" onClick={openAddressSearch}>
                            주소 검색
                        </S.SearchButton>
                    </S.AddressRow>
                    {errors.address && <S.FieldError>{errors.address}</S.FieldError>}
                    {form.zipCode && <S.ZipCode>우편번호: {form.zipCode}</S.ZipCode>}
                    <S.FieldInput
                        name="addressDetail"
                        value={form.addressDetail}
                        onChange={handleChange}
                        placeholder="상세 주소 (동, 호수 등)"
                        style={{ marginTop: 8 }}
                    />
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

                {/* 배송 메모 — 추후 기능 확장용 (현재 BE 미지원) */}
                <S.FieldGroup>
                    <S.FieldLabel>배송의 특이</S.FieldLabel>
                    <S.MemoBox>
                        <S.MemoText>기본배송지</S.MemoText>
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