"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-[#E0D8C9] bg-white rounded-full px-4 py-2 text-sm"
      >
        {language}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 min-w-[120px] rounded-2xl border border-[#E0D8C9] bg-white shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => {
              setLanguage("English");
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-[#FFF9EB]"
          >
            English
          </button>

          <button
            onClick={() => {
              setLanguage("नेपाली");
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-[#FFF9EB]"
          >
            नेपाली
          </button>
        </div>
      )}
    </div>
  );
}