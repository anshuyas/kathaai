"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "W1", progress: 65 },
  { week: "W2", progress: 72 },
  { week: "W3", progress: 76 },
  { week: "W4", progress: 81 },
  { week: "W5", progress: 88 },
];

export default function ClassProgressChart() {
  return (
    <div className="rounded-[32px] bg-[#F9F3E8] p-8 shadow-sm">

      <h2 className="mb-8 text-3xl font-black">
        Class Progress Overview
      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <XAxis dataKey="week" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="progress"
              stroke="#F28A3B"
              strokeWidth={4}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}