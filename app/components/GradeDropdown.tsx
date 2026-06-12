"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const grades = [
  "Montessori",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
];

export default function GradeDropdown() {
  const [selectedGrade, setSelectedGrade] = useState("By grade");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-[220px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between rounded-2xl border-2 border-[#D8D0C4] bg-white px-5 text-[20px] text-[#5C5147]"
      >
        {selectedGrade}
        <ChevronDown
          size={22}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 z-50 w-full overflow-hidden rounded-2xl border-2 border-[#D8D0C4] bg-white shadow-lg">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setIsOpen(false);
              }}
              className="w-full px-6 py-4 text-center text-[18px] text-[#5C5147] transition hover:bg-[#FFF5EB]"
            >
              {grade}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}