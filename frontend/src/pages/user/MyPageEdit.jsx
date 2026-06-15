import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getMe, updateMe, uploadProfileImage, deleteProfileImage } from '../../api/auth';
import {
    EditContainer,
    EditHeader,
    AvatarWrap,
    AvatarImage,
    AvatarPlaceholder,
    AvatarAddButton,
    DeleteImageButton,
    InputGroup,
    Label,
    Input,
    ErrorText,
    ButtonRow,
    SecondaryButton,
    PrimaryButton,
} from '../../styles/MyPageEditStyle';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MyPageEdit = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const previewBlobRef = useRef(null);
    const { user, setUser } = useAuthStore();

    const [nickname, setNickname] = useState(user?.nickname || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [previewUrl, setPreviewUrl] = useState(user?.profileImage || '');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const initial = useMemo(
        () => nickname?.charAt(0)?.toUpperCase() || '?',
        [nickname]
    );

    useEffect(() => {
        getMe()
            .then((res) => {
                setUser(res.data);
                setNickname(res.data.nickname || '');
                setPhone(res.data.phone || '');
                setPreviewUrl(res.data.profileImage || '');
            })
            .catch(() => navigate('/login'));
    }, []);

    useEffect(() => {
        return () => {
            if (previewBlobRef.current) {
                URL.revokeObjectURL(previewBlobRef.current);
            }
        };
    }, []);

    const getErrorMessage = (err) =>
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        '저장에 실패했습니다. 다시 시도해주세요.';

    const onClickAddImage = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드할 수 있습니다.');
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            setError('이미지는 5MB 이하만 가능합니다.');
            return;
        }

        if (previewBlobRef.current) {
            URL.revokeObjectURL(previewBlobRef.current);
            previewBlobRef.current = null;
        }

        const objectUrl = URL.createObjectURL(file);
        previewBlobRef.current = objectUrl;
        setPreviewUrl(objectUrl);
        setError('');
        setUploading(true);

        try {
            const res = await uploadProfileImage(file);
            setUser(res.data);
            setPreviewUrl(res.data.profileImage || '');
            if (previewBlobRef.current) {
                URL.revokeObjectURL(previewBlobRef.current);
                previewBlobRef.current = null;
            }
        } catch (err) {
            setPreviewUrl(user?.profileImage || '');
            setError(getErrorMessage(err));
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const onDeleteImage = async () => {
        if (!previewUrl && !user?.profileImage) return;

        setLoading(true);
        setError('');
        try {
            if (user?.profileImage) {
                const res = await deleteProfileImage();
                setUser(res.data);
            }

            if (previewBlobRef.current) {
                URL.revokeObjectURL(previewBlobRef.current);
                previewBlobRef.current = null;
            }

            setPreviewUrl('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const onSave = async () => {
        const trimmedNickname = nickname.trim();
        if (!trimmedNickname) {
            setError('닉네임을 입력해주세요.');
            return;
        }
        if (trimmedNickname.length > 50) {
            setError('닉네임은 50자 이하로 입력해주세요.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await updateMe({
                nickname: trimmedNickname,
                phone: phone.trim() || null,
            });
            setUser(res.data);
            navigate('/mypage');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const onBack = () => {
        navigate('/mypage');
    };

    const isBusy = loading || uploading;
    const showDeleteButton = Boolean(previewUrl || user?.profileImage);

    return (
        <EditContainer>
            <EditHeader>회원정보 수정</EditHeader>

            <AvatarWrap>
                {previewUrl ? (
                    <AvatarImage src={previewUrl} alt="프로필 미리보기" />
                ) : (
                    <AvatarPlaceholder>{initial}</AvatarPlaceholder>
                )}
                <AvatarAddButton
                    type="button"
                    onClick={onClickAddImage}
                    disabled={isBusy}
                    aria-label="프로필 이미지 추가"
                >
                    +
                </AvatarAddButton>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
            </AvatarWrap>

            {uploading && <ErrorText style={{ color: '#888' }}>사진 업로드 중...</ErrorText>}

            {showDeleteButton && (
                <DeleteImageButton type="button" onClick={onDeleteImage} disabled={isBusy}>
                    사진 제거
                </DeleteImageButton>
            )}

            <InputGroup>
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임 입력"
                    disabled={isBusy}
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="phone">휴대폰</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    disabled={isBusy}
                />
            </InputGroup>

            {error && <ErrorText>{error}</ErrorText>}

            <ButtonRow>
                <SecondaryButton type="button" onClick={onBack} disabled={isBusy}>
                    취소
                </SecondaryButton>
                <PrimaryButton type="button" onClick={onSave} disabled={isBusy} $disabled={isBusy}>
                    {loading ? '저장 중...' : '저장'}
                </PrimaryButton>
            </ButtonRow>
        </EditContainer>
    );
};

export default MyPageEdit;
