"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type CustomDropdownProps = {
  options: string[];
  defaultValue: string;
  onChange?: (value: string) => void;
};

export default function CustomDropdown({
  options,
  defaultValue,
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] =
    useState(defaultValue);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="flex h-12 w-full items-center justify-between rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-4 text-[#2D241C]"
      >
        <span>{selected}</span>

        <ChevronDown
          size={18}
          className={`transition duration-200 ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-2xl border border-[#E3CDBB] bg-[#FFF9EB] shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() =>
                handleSelect(option)
              }
              className="block w-full px-4 py-3 text-left text-[#2D241C] transition hover:bg-[#FFF2E5]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}