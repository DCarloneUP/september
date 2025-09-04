'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// Dataset demo, indipendente da lib/mock.ts
const data = [
  { name: "Confirmed", value: 12 },
  { name: "Packed", value: 7 },
  { name: "Refunded", value: 3 },
  { name: "Shipped", value: 15 },
];

export default function SalesChart() {
  return (
    <div className="rounded-2xl border bg-white/70 p-4">
      <div className="mb-2 font-medium">Sales</div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
