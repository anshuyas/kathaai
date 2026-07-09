"use client";

import { Student } from "../types/teacher";

interface TopStudentsProps {
  students: Student[];
}

export default function TopStudents({ students }: TopStudentsProps) {
  return (
    <div className="rounded-[32px] bg-[#F9F3E8] p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-black">
        Top Students
      </h2>

      <div className="space-y-5">
        {students.map((student, index) => (
          <div
            key={student.name + index}
            className="flex items-center justify-between rounded-2xl bg-white p-5"
          >
            <div>
              <h3 className="font-bold">{student.name}</h3>
              <p className="text-sm text-gray-500">Rank #{index + 1}</p>
            </div>

            <div className="rounded-full bg-[#FFE7C6] px-4 py-2 font-bold">
              ⭐ {student.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}