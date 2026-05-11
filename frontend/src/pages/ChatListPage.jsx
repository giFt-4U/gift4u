import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRooms, createRoom } from '../api/chatApi';

const MY_ID = 1; // 추후 로그인 연동

export default function ChatListPage() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        getRooms(MY_ID).then(setRooms);
    }, []);

    const handleSearch = async () => {
        if (!searchId.trim()) return;

        const room = await createRoom(MY_ID, Number(searchId));
        setRooms(prev => prev.find(r => r.id == room.id) ? prev : [...prev, room]);
        navigate(`/chat/${room.id}`);
        setSearchId('');
    };

    return (
        <Container>
            <Header>
                <BackBtn onClick={() => navigate('/')}> ← </BackBtn>
                <h1>따숨품</h1>
                <SearchBox>
                    <SearchInput
                        value={searchId}
                        onClick={e => setSearchId(e.target.value)}
                        onKeyDown={e => e.key == 'Enter' && handleSearch()}
                        placeholder="친구 ID 검색"
                    />
                    <SearchBtn onClick={handleSearch}></SearchBtn>
                </SearchBox>
            </Header>

            {/* 채팅방 목록 */}
            <RoomList>
                {rooms.length === 0
                    ? <Empty>채팅방이 없습니다. <br />친구를 추가하고 대화를 시작해보세요!</Empty>
                    : rooms.map(room => (
                        <RoomItem key={room.id} onClick={() => navigate(`/chat/${room.id}`)}>
                            <RoomIcon>💬</RoomIcon>
                            <RoomInfo>
                                <RoomName> 채팅방 #{room.id}</RoomName>
                                <RoomSub>대화를 시작하세요.</RoomSub>
                            </RoomInfo>
                            <Arrow>›</Arrow>
                        </RoomItem>
                    ))
                }
            </RoomList>
        </Container>
    );
}


const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  gap: 12px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding: 0 4px;
  color: #333;
`;

const Logo = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  margin: 0;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SearchInput = styled.input`
  width: 100px;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 13px;
  outline: none;
  &:focus { border-color: #4CAF50; }
`;

const SearchBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const RoomList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  &:hover { background: #f9f9f9; }
`;

const RoomIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomName = styled.p`
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 15px;
`;

const RoomSub = styled.p`
  margin: 0;
  font-size: 13px;
  color: #aaa;
`;

const Arrow = styled.span`
  font-size: 20px;
  color: #ccc;
`;

const Empty = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #aaa;
  font-size: 14px;
  line-height: 1.8;
`;