import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../../styles/gift/GiftAcceptStyle';

/**
 * 선물 수령 완료 페이지 (REQ-014)
 *
 * 진입 경로:
 *   GiftAddress → acceptGift() 성공 → navigate('/gifts/:uuid/accept')
 *
 * 흐름:
 *   - 수령 완료 안내 화면
 *   - "홈" 버튼 → / 이동
 *   - "선물함 보기" 버튼 → /mypage/gifts 이동
 */
const GiftAccept = () => {
    const navigate = useNavigate();

    return (
        <S.Container>

            {/* 완료 안내 */}
            <S.Content>
                <S.CheckIcon>✅</S.CheckIcon>
                <S.CompleteText>수령이 완료되었습니다!</S.CompleteText>
                <S.SubText>
                    배송지 정보가 저장되었습니다.{'\n'}
                    배송이 시작되면 알림을 드릴게요.
                </S.SubText>
            </S.Content>

            {/* 하단 버튼 */}
            <S.ButtonRow>
                <S.HomeButton onClick={() => navigate('/')}>
                    홈
                </S.HomeButton>
                <S.GiftBoxButton onClick={() => navigate('/mypage/gifts')}>
                    선물함 보기
                </S.GiftBoxButton>
            </S.ButtonRow>

        </S.Container>
    );
};

export default GiftAccept;