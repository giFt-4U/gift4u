import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../../api/chatApi';

const FriendRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // ── 1. 페이지 진입 시 대기 중인 요청 목록 가져오기 ──
    useEffect(() => {
        getFriendRequests()
            .then((res) => {
                setRequests(res.data || []);
            })
            .catch((e) => {
                console.error("목록 로딩 실패:", e);
            })
            .finally(() => setLoading(false));
    }, []);

    // ── 2. 친구 수락 처리 ──────────────────────────────
    const handleAccept = async (id) => {
        try {
            await acceptFriendRequest(id);
            alert('친구 요청을 수락했습니다.');

            // 수락 성공 후 화면 목록에서 삭제 처리
            setRequests((prev) => prev.filter((req) => req.id !== id));
        } catch (e) {
            // 백엔드 글로벌 에러 멘트 그대로 alert 노출
            const globalMessage = e.response?.data?.message;
            alert(globalMessage || '처리에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // ── 3. 친구 거절 처리 ──────────────────────────────
    const handleReject = async (id) => {
        if (!window.confirm('정말 요청을 거절하시겠습니까?')) return;

        try {
            await rejectFriendRequest(id);
            alert('친구 요청을 거절했습니다.');

            // 거절 성공 후 화면 목록에서 삭제 처리
            setRequests((prev) => prev.filter((req) => req.id !== id));
        } catch (e) {
            const globalMessage = e.response?.data?.message;
            alert(globalMessage || '처리에 실패했습니다. 다시 시도해주세요.');
        }
    };

    if (loading) return <CenterText>로딩 중...</CenterText>;

    return (
        <Container>
            <Title>친구 요청 확인</Title>

            {requests.length === 0 ? (
                <CenterText>받은 친구 요청이 없습니다.</CenterText>
            ) : (
                <RequestList>
                    {requests.map((req) => (
                        <RequestItem key={req.id}>
                            {/* 상대방 이름 혹은 정보 정보 출력 (백엔드 DTO 속성 매칭) */}
                            <UserInfo>
                                <Nickname>{req.senderNickname || '사용자'}</Nickname>
                                <SubText>친구 요청을 보냈습니다.</SubText>
                            </UserInfo>

                            {/* 버튼 제어 영역 */}
                            <ButtonArea>
                                <AcceptButton onClick={() => handleAccept(req.id)}>
                                    수락
                                </AcceptButton>
                                <RejectButton onClick={() => handleReject(req.id)}>
                                    거절
                                </RejectButton>
                            </ButtonArea>
                        </RequestItem>
                    ))}
                </RequestList>
            )}
        </Container>
    );
};

export default FriendRequestList;

// ── 3. 스타일 정의 (Styled-Components) ────────────────
const Container = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
`;

const RequestList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const RequestItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fff;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Nickname = styled.span`
    font-weight: 600;
    font-size: 1rem;
`;

const SubText = styled.span`
    font-size: 0.85rem;
    color: #888;
`;

const ButtonArea = styled.div`
    display: flex;
    gap: 8px;
`;

const AcceptButton = styled.button`
    padding: 8px 14px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover { background: #357abd; }
`;

const RejectButton = styled.button`
    padding: 8px 14px;
    background: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover { background: #e8e8e8; }
`;

const CenterText = styled.p`
    text-align: center;
    color: #888;
    margin-top: 4px;
`;