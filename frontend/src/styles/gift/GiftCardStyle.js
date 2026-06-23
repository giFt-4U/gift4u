import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #333;
    width: 32px;
`;

export const Title = styled.h1`
    font-size: 18px;
    font-weight: 700;
    color: #FF8C00;
    margin: 0;
`;

export const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

/* ── 🛠️ 핵심 추가: 사진 고르기 대형 이미지 업로드 배너 프레임 ── */
export const TopPreviewBox = styled.div`
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #f5f5f5;
    border: 1px dashed #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    transition: background 0.2s;

    &:hover {
        background: #f0f0f0;
    }
`;

export const PreviewPlaceholderText = styled.span`
    font-size: 14px;
    color: #666;
    font-weight: 500;
`;

export const UploadedPreviewImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

/* ── 상품명 라벨 ── */
export const ProductLabel = styled.p`
    font-size: 14px;
    color: #555;
    margin: 0;
    padding: 12px 14px;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    font-weight: 500;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const SectionLabel = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

/* ── 메시지 인풋 ── */
export const MessageInput = styled.textarea`
    width: 100%;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;

    &:focus {
        border-color: #FF8C00;
    }
`;

export const CharCount = styled.p`
    font-size: 12px;
    color: ${({ $warning }) => ($warning ? '#e53935' : '#aaa')};
    text-align: right;
    margin: 0;
`;

/* ── 편지 봉투 고르기 그리드 ── */
export const DesignGrid = styled.div`
    display: flex;
    gap: 12px;
`;

export const DesignItem = styled.div`
    flex: 1;
    aspect-ratio: 1 / 1.5; /* 와이어프레임 수직 카드 비율 */
    border-radius: 6px;
    border: 2.5px solid ${({ $selected }) => ($selected ? '#FF8C00' : 'transparent')};
    background: #fafafa;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.15s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const DesignImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

export const ErrorText = styled.p`
    font-size: 13px;
    color: #e53935;
    margin: 0;
    text-align: center;
`;

/* ── 하단 고정 버튼 열 ── */
export const ButtonRow = styled.div`
    display: flex;
    gap: 10px;
    padding: 14px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
    background: #fff;
`;

export const PreviewButton = styled.button`
    flex: 1;
    padding: 14px;
    background: #fff;
    color: #FF8C00;
    border: 1.5px solid #FF8C00;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    flex: 1;
    padding: 14px;
    background: ${({ disabled }) => (disabled ? '#ccc' : '#FF8C00')};
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const ProductSectionBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 12px 0;
`;

export const CenterText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 16px;
    color: #666;
`;
