import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
`;

export const Title = styled.h1`
    font-size: 18px;
    font-weight: 700;
    color: #FF8C00;
    margin: 0;
`;

export const AddButton = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    line-height: 1;
`;

export const RoomList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
`;

export const RoomItem = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f5;

    &:active {
        background: #fafafa;
    }
`;

export const Avatar = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #FFE0B2;
    color: #FF8C00;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const RoomInfo = styled.div`
    flex: 1;
    overflow: hidden;
`;

export const RoomName = styled.p`
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 600;
    color: #222;
`;

export const LastMessage = styled.p`
    margin: 0;
    font-size: 13px;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const TimeText = styled.span`
    font-size: 11px;
    color: #bbb;
    flex-shrink: 0;
`;

export const CenterText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #aaa;
    font-size: 14px;
`;
