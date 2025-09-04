'use client';

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { followersByMonth } from '@/lib/mock';

// converte l'ISO "2025-04" in mese (04) per l'asse X
const data = followersByMonth.map((row) => ({
  month: row.month.slice(5),
  Upsystems: row.Upsystems,
  Teamtalent: row.Teamtalent,
  Replan: row.Replan,
  Yourmerchandising: row.Yourmerchandising,
}));

export default function FollowersChart() {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Upsystems" stroke="#7b23f4" />
          <Line type="monotone" dataKey="Teamtalent" stroke="#06b6d4" />
          <Line type="monotone" dataKey="Replan" stroke="#f97316" />
          <Line type="monotone" dataKey="Yourmerchandising" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
