import styled from "styled-components";

export default function ChatRoomList({ rooms, selectedRoomId, onSelect }) {
    return (
        <Container>
            <Title> 채팅 목록 </Title>
            {rooms.length == 0 && <Empty>채팅방이 없습니다.</Empty>}
            {rooms.map(room => (
                <RoomItem
                    key={room.id}
                    isSelected={room.id == selectedRoomId}
                    onClick={() => onSelect(room.id)}
                >
                    채팅방 #{room.id}
                </RoomItem>
            ))}
        </Container>
    );
}

const Container = styled.div`
    width: 240px;
    padding: 16px;
    border-right: 1px solid #eee;
`;

const Title = styled.h3`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 12px;
`;

const RoomItem = styled.div`
    padding: 12px;
    cursor: pointer;
    border-radius: 8px;
    margin-bottom: 4px;

    &:hover { background: #f5f5f5; }
    font-weight: ${({ isSelected }) => isSelected ? '600' : '400'};
    color: ${({ isSelected }) => isSelected ? '#4CAF50' : '#333'};
    background: ${({ isSelected }) => isSelected ? '#e8f5e9' : 'transparent'};
`;

const Empty = styled.p`
    color: #aaa;
    font-size: 13px;
`;