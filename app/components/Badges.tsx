"use client";

import { useState } from "react";
import {
  Compass,
  MicVocal,
  GraduationCap,
  BookOpen,
  Brain,
  Star,
  Heart,
  Trophy,
  Sparkles,
} from "lucide-react";

const badges = [
  {
    title: "Story Explorer",
    icon: Compass,
    bg: "#A7F0B3",
    color: "#156C39",
  },
  {
    title: "Quiz Master",
    icon: MicVocal,
    bg: "#FFD3E2",
    color: "#C2185B",
  },
  {
    title: "Top Learner",
    icon: GraduationCap,
    bg: "#FFDCC5",
    color: "#A65200",
  },
  {
    title: "Book Lover",
    icon: BookOpen,
    bg: "#D9E8FF",
    color: "#2463C9",
  },
  {
    title: "Creative Thinker",
    icon: Brain,
    bg: "#EAD8FF",
    color: "#6B21A8",
  },
  {
    title: "Star Reader",
    icon: Star,
    bg: "#FFF3B0",
    color: "#D97706",
  },
  {
    title: "Helping Hand",
    icon: Heart,
    bg: "#FFD6D6",
    color: "#DC2626",
  },
  {
    title: "Champion",
    icon: Trophy,
    bg: "#CFFFE2",
    color: "#15803D",
  },
  {
    title: "Story Wizard",
    icon: Sparkles,
    bg: "#FFE8C8",
    color: "#EA580C",
  },
];

export default function RecentBadges() {
  const [expanded, setExpanded] = useState(false);

  const visibleBadges = expanded ? badges : badges.slice(0, 3);

  return (
    <div
      className={`rounded-[34px] bg-[#F7F1E7] p-8 shadow-sm transition-all duration-500 overflow-hidden ${
        expanded ? "min-h-[520px]" : "h-[270px]"
      }`}
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-[38px] font-bold text-[#2D2D2D]">
          Recent Badges
        </h2>

        <button
          onClick={() => setExpanded(!expanded)}
          className="font-semibold text-[#A65200] hover:underline"
        >
          {expanded ? "Hide" : "View all"}
        </button>
      </div>

      {/* Badges */}

      <div
        className={`grid ${
          expanded ? "grid-cols-3 gap-y-10" : "grid-cols-3"
        } justify-items-center`}
      >
        {visibleBadges.map((badge, index) => {
          const Icon = badge.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full border-4"
                style={{
                  backgroundColor: badge.bg,
                  borderColor: badge.color + "40",
                }}
              >
                <Icon
                  size={34}
                  color={badge.color}
                  strokeWidth={2.2}
                />
              </div>

              <p className="mt-4 text-center text-[15px] font-semibold text-[#3B332C]">
                {badge.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}