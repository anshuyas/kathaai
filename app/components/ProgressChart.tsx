"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Progress } from "../types/teacher";

interface ClassProgressChartProps {
  progress: Progress;
}

export default function ClassProgressChart({ progress }: ClassProgressChartProps) {
  const data = [
    { name: "Stories Read", value: progress.totalStoriesRead },
    { name: "Quizzes Completed", value: progress.totalQuizzesCompleted },
  ];

  return (
    <div className="rounded-[32px] bg-[#F9F3E8] p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-black">
        Class Progress Overview
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#F28A3B" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}