"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { GRADES } from "../lib/gradeToAge";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

interface GradeDropdownProps {
  value: string | null;
  onChange: (grade: string | null) => void;
}

export default function GradeDropdown({ value, onChange }: GradeDropdownProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[220px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between rounded-2xl border border-[#D8D0C4] bg-white px-5 text-[18px] text-[#5C5147] shadow-sm"
      >
        {value ?? t.byGrade}
        <ChevronDown size={20} className={`transition duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 z-50 w-full overflow-hidden rounded-2xl border border-[#D8D0C4] bg-white shadow-lg">
          <button
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
          >
          </button>

          {GRADES.map((grade) => (
            <button
              key={grade}
              onClick={() => {
                onChange(grade);
                setIsOpen(false);
              }}
              className="block w-full px-5 py-3 text-center text-[18px] text-[#5C5147] transition hover:bg-[#FFF5EB]"
            >
              {grade}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}