import React from 'react';
import styled from 'styled-components';

/* ── mock data ───────────────────────────────────────────── */
const weeklySignups = [
    { day: '월', count: 3 },
    { day: '화', count: 7 },
    { day: '수', count: 5 },
    { day: '목', count: 12 },
    { day: '금', count: 9 },
    { day: '토', count: 4 },
    { day: '일', count: 6 },
];
const monthlyOrders = [
    { month: '1월', value: 24 },
    { month: '2월', value: 31 },
    { month: '3월', value: 28 },
    { month: '4월', value: 47 },
    { month: '5월', value: 52 },
    { month: '6월', value: 38 },
];
const recentUsers = [
    { id: 1, nickname: '김따숨', email: 'a@test.com', provider: 'LOCAL',  joined: '오늘 09:12' },
    { id: 2, nickname: '이선물', email: 'b@test.com', provider: 'KAKAO',  joined: '오늘 08:44' },
    { id: 3, nickname: '박육아', email: 'c@test.com', provider: 'LOCAL',  joined: '어제 22:01' },
    { id: 4, nickname: '최아기', email: 'd@test.com', provider: 'LOCAL',  joined: '어제 18:30' },
    { id: 5, nickname: '정따뜻', email: 'e@test.com', provider: 'KAKAO',  joined: '어제 15:10' },
];

/* ── Styles ──────────────────────────────────────────────── */
const PageTitle = styled.h2`
    font-size: 20px; font-weight: 700; color: #111827;
    margin-bottom: 4px; letter-spacing: 0; text-transform: none;
`;
const PageSub = styled.p`
    font-size: 13px; color: #9ca3af; margin-bottom: 28px;
    letter-spacing: 0; text-transform: none;
`;

/* stat cards */
const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px; margin-bottom: 28px;
    @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
`;
const StatCard = styled.div`
    background: #fff; border: 1px solid #e8eaed; border-radius: 14px; padding: 22px 24px;
`;
const StatIcon = styled.div`
    width: 40px; height: 40px; border-radius: 10px;
    background: ${({ $bg }) => $bg || '#fff4e8'};
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px;
`;
const StatLabel = styled.p`
    font-size: 11.5px; font-weight: 600; color: #9ca3af;
    letter-spacing: .5px; text-transform: uppercase; margin-bottom: 8px;
`;
const StatValue = styled.p`
    font-size: 28px; font-weight: 700; color: #111827;
    line-height: 1; margin-bottom: 8px; letter-spacing: 0; text-transform: none;
`;
const StatTrend = styled.span`
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11.5px; font-weight: 600;
    color: ${({ $up }) => ($up ? '#059669' : '#dc2626')};
    background: ${({ $up }) => ($up ? '#ecfdf5' : '#fff1f0')};
    padding: 3px 8px; border-radius: 20px;
`;

/* chart row */
const ChartRow = styled.div`
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px;
    @media (max-width: 1000px) { grid-template-columns: 1fr; }
`;
const ChartCard = styled.div`
    background: #fff; border: 1px solid #e8eaed; border-radius: 14px; padding: 22px 24px;
`;
const ChartTitle = styled.p`
    font-size: 14px; font-weight: 700; color: #111827;
    margin-bottom: 2px; letter-spacing: 0; text-transform: none;
`;
const ChartSub = styled.p`
    font-size: 12px; color: #9ca3af; margin-bottom: 20px;
    letter-spacing: 0; text-transform: none;
`;

/* bar chart (CSS) */
const BarChartWrap = styled.div`
    display: flex; align-items: flex-end; gap: 8px; height: 160px; padding-bottom: 24px; position: relative;
`;
const BarCol = styled.div`
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%;
    justify-content: flex-end;
`;
const Bar = styled.div`
    width: 100%; border-radius: 5px 5px 0 0;
    background: ${({ $active }) => ($active ? '#ff8c00' : '#ffe0b2')};
    height: ${({ $h }) => $h}%;
    transition: height .4s ease, background .2s;
    cursor: default;
    &:hover { background: #ff8c00; }
`;
const BarLabel = styled.span`
    font-size: 11px; color: #9ca3af; position: absolute; bottom: 0;
`;
const BarLabelRow = styled.div`
    display: flex; gap: 8px; margin-top: 8px;
`;
const BarLabelItem = styled.span`
    flex: 1; text-align: center; font-size: 11px; color: #9ca3af;
`;

/* line chart (SVG) */
const LineChartWrap = styled.div`height: 160px; position: relative;`;

/* table */
const TableCard = styled.div`
    background: #fff; border: 1px solid #e8eaed; border-radius: 14px; overflow: hidden;
`;
const TableHeader = styled.div`
    padding: 18px 24px 14px; display: flex; align-items: center;
    justify-content: space-between; border-bottom: 1px solid #f3f4f6;
`;
const TableTitle = styled.p`
    font-size: 14px; font-weight: 700; color: #111827;
    letter-spacing: 0; text-transform: none;
`;
const ViewAll = styled.a`
    font-size: 12px; color: #e07800; font-weight: 600; cursor: pointer; text-decoration: none;
    &:hover { text-decoration: underline; }
`;
const Table = styled.table`
    width: 100%; border-collapse: collapse; font-size: 13px;
    letter-spacing: 0; text-transform: none;
`;
const Thead = styled.thead`background: #fafafa;`;
const Th = styled.th`
    padding: 10px 20px; text-align: left; font-size: 11px; font-weight: 600;
    color: #9ca3af; text-transform: uppercase; letter-spacing: .5px;
    border-bottom: 1px solid #f3f4f6; white-space: nowrap;
`;
const Tr = styled.tr`
    &:hover { background: #fafbff; }
    &:not(:last-child) td { border-bottom: 1px solid #f9fafb; }
`;
const Td = styled.td`padding: 13px 20px; color: #374151; vertical-align: middle;`;
const UserInfo = styled.div`display: flex; align-items: center; gap: 10px;`;
const Avatar = styled.div`
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #ff8c00, #ffb347);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; color: #fff; flex-shrink: 0;
`;
const UserName = styled.span`font-weight: 600; color: #111827; font-size: 13px;`;
const UserEmail = styled.p`font-size: 11px; color: #9ca3af; margin-top: 1px;`;
const ProviderBadge = styled.span`
    padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: 600;
    background: ${({ $k }) => ($k ? '#fef9c3' : '#eff6ff')};
    color: ${({ $k }) => ($k ? '#92400e' : '#1d4ed8')};
`;

/* ── CSS Bar Chart ───────────────────────────────────────── */
const CSSBarChart = ({ data, maxVal }) => {
    const max = maxVal || Math.max(...data.map(d => d.count));
    return (
        <div>
            <BarChartWrap>
                {data.map((d, i) => (
                    <BarCol key={i}>
                        <Bar $h={Math.round((d.count / max) * 100)} />
                    </BarCol>
                ))}
            </BarChartWrap>
            <BarLabelRow>
                {data.map((d, i) => (
                    <BarLabelItem key={i}>{d.day}</BarLabelItem>
                ))}
            </BarLabelRow>
        </div>
    );
};

/* ── SVG Line Chart ──────────────────────────────────────── */
const SVGLineChart = ({ data }) => {
    const W = 400, H = 140, PAD = { t: 10, r: 10, b: 28, l: 36 };
    const values = data.map(d => d.value);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const xStep = (W - PAD.l - PAD.r) / (data.length - 1);
    const toX = (i) => PAD.l + i * xStep;
    const toY = (v) => PAD.t + ((maxV - v) / (maxV - minV || 1)) * (H - PAD.t - PAD.b);

    const points = data.map((d, i) => `${toX(i)},${toY(d.value)}`).join(' ');
    const areaPoints = [
        `${toX(0)},${H - PAD.b}`,
        ...data.map((d, i) => `${toX(i)},${toY(d.value)}`),
        `${toX(data.length - 1)},${H - PAD.b}`,
    ].join(' ');

    return (
        <LineChartWrap>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
                {/* grid lines */}
                {[0, 0.5, 1].map((t, i) => {
                    const y = PAD.t + t * (H - PAD.t - PAD.b);
                    return (
                        <g key={i}>
                            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                            <text x={PAD.l - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#d1d5db">
                                {Math.round(minV + (1 - t) * (maxV - minV))}
                            </text>
                        </g>
                    );
                })}
                {/* area fill */}
                <polygon points={areaPoints} fill="rgba(255,140,0,0.08)" />
                {/* line */}
                <polyline points={points} fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinejoin="round" />
                {/* dots */}
                {data.map((d, i) => (
                    <circle key={i} cx={toX(i)} cy={toY(d.value)} r="4" fill="#ff8c00" />
                ))}
                {/* x labels */}
                {data.map((d, i) => (
                    <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">
                        {d.month}
                    </text>
                ))}
            </svg>
        </LineChartWrap>
    );
};

/* ── Component ───────────────────────────────────────────── */
const AdminDashboard = () => {
    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    });

    return (
        <div>
            <PageTitle>대시보드</PageTitle>
            <PageSub>{today} 기준 현황입니다.</PageSub>

            <StatGrid>
                <StatCard>
                    <StatIcon $bg="#fff4e8">👥</StatIcon>
                    <StatLabel>전체 회원</StatLabel>
                    <StatValue>1,284</StatValue>
                    <StatTrend $up>▲ 12% 이번 달</StatTrend>
                </StatCard>
                <StatCard>
                    <StatIcon $bg="#f0fdf4">📦</StatIcon>
                    <StatLabel>등록 상품</StatLabel>
                    <StatValue>347</StatValue>
                    <StatTrend $up>▲ 8개 신규</StatTrend>
                </StatCard>
                <StatCard>
                    <StatIcon $bg="#eff6ff">🎁</StatIcon>
                    <StatLabel>이번 달 주문</StatLabel>
                    <StatValue>52</StatValue>
                    <StatTrend $up={false}>▼ 3% 전월 대비</StatTrend>
                </StatCard>
                <StatCard>
                    <StatIcon $bg="#fdf2f8">🌟</StatIcon>
                    <StatLabel>오늘 신규 가입</StatLabel>
                    <StatValue>9</StatValue>
                    <StatTrend $up>▲ 전일 대비 +3</StatTrend>
                </StatCard>
            </StatGrid>

            <ChartRow>
                <ChartCard>
                    <ChartTitle>이번 주 신규 가입</ChartTitle>
                    <ChartSub>요일별 가입자 수</ChartSub>
                    <CSSBarChart data={weeklySignups} />
                </ChartCard>

                <ChartCard>
                    <ChartTitle>월별 주문 추이</ChartTitle>
                    <ChartSub>최근 6개월</ChartSub>
                    <SVGLineChart data={monthlyOrders} />
                </ChartCard>
            </ChartRow>

            <TableCard>
                <TableHeader>
                    <TableTitle>최근 가입 회원</TableTitle>
                    <ViewAll href="/admin/users">전체 보기 →</ViewAll>
                </TableHeader>
                <Table>
                    <Thead>
                        <tr>
                            <Th>회원</Th>
                            <Th>가입 방식</Th>
                            <Th>가입 시각</Th>
                        </tr>
                    </Thead>
                    <tbody>
                        {recentUsers.map((u) => (
                            <Tr key={u.id}>
                                <Td>
                                    <UserInfo>
                                        <Avatar>{u.nickname.charAt(0)}</Avatar>
                                        <div>
                                            <UserName>{u.nickname}</UserName>
                                            <UserEmail>{u.email}</UserEmail>
                                        </div>
                                    </UserInfo>
                                </Td>
                                <Td>
                                    <ProviderBadge $k={u.provider === 'KAKAO'}>
                                        {u.provider === 'KAKAO' ? '카카오' : '일반'}
                                    </ProviderBadge>
                                </Td>
                                <Td style={{ color: '#9ca3af', fontSize: 12 }}>{u.joined}</Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </TableCard>
        </div>
    );
};

export default AdminDashboard;
