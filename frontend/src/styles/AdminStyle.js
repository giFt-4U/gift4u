// AdminStyle.js

import styled from 'styled-components';

export const AdminWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #e9eef4;
    color: #333;
`;

export const AdminTopBar = styled.header`
    width: 100%;
    height: 48px;

    display: flex;
    align-items: center;

    padding: 0 24px;

    background-color: #000;
    color: #fff;

    font-size: 18px;
    font-weight: 700;
`;

export const AdminBody = styled.div`
    display: flex;

    width: 100%;
    min-height: calc(100vh - 48px);
`;

export const AdminSidebar = styled.aside`
    width: 300px;
    min-height: calc(100vh - 48px);

    background-color: #ffffff;

    padding-top: 24px;
`;

export const AdminMenuItem = styled.button`
    width: 100%;
    height: 48px;

    border: none;
    background-color: ${({ $active }) => ($active ? '#eaf3ff' : '#ffffff')};

    padding: 0 24px;

    display: flex;
    align-items: center;

    color: ${({ $active }) => ($active ? '#1e88ff' : '#333')};

    font-size: 16px;
    font-weight: ${({ $active }) => ($active ? 700 : 500)};

    cursor: pointer;
    text-align: left;

    &:hover {
        background-color: #f3f7fc;
    }
`;

export const AdminMain = styled.main`
    flex: 1;

    padding: 36px;
`;

export const AdminCard = styled.section`
    width: 100%;
    min-height: 540px;

    background-color: #ffffff;

    padding: 24px 36px;

    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
`;

export const CardTitle = styled.h2`
    margin: 0 0 18px;

    font-size: 16px;
    font-weight: 600;
    color: #555;
`;

export const UserCount = styled.span`
    color: #1e88ff;
    font-weight: 700;
`;

export const AdminTable = styled.table`
    width: 100%;

    border-collapse: collapse;

    thead {
        border-bottom: 1px solid #ddd;
    }

    th {
        height: 44px;

        color: #777;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
    }

    td {
        height: 64px;

        border-bottom: 1px solid #ddd;

        color: #666;
        font-size: 14px;
        text-align: center;
    }

    input {
        width: 16px;
        height: 16px;
    }
`;

export const EmptyAdminBox = styled.div`
    min-height: 360px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #777;
    text-align: center;

    h3 {
        margin: 0 0 12px;

        font-size: 20px;
        font-weight: 700;
        color: #333;
    }

    p {
        max-width: 520px;

        margin: 0 0 24px;

        font-size: 15px;
        line-height: 1.6;
    }
`;

export const AdminButton = styled.button`
    height: 42px;

    padding: 0 18px;

    border: none;
    border-radius: 6px;

    background-color: #d9d9d9;
    color: #777;

    font-size: 14px;
    font-weight: 600;

    cursor: not-allowed;
`;