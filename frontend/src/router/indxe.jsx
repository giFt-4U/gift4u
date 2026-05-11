import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import ChatListPage from '../pages/ChatListPage';
import ChatRoomPage from '../pages/ChatRoomPage';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/chat' element={<ChatListPage />} />
                <Route path='/chat/:roomId' element={<ChatRoomPage />} />  {/* ← 추가 */}
            </Routes>
        </BrowserRouter>
    );
}