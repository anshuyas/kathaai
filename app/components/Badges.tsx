"use client";

import { BookOpen, Brain, Coins, Compass, GraduationCap, Heart, MicVocal, Sparkles, Star, Trophy } from "lucide-react";
import { useState } from "react";

interface Badge {
  title: string;
  icon: string;
  bg: string;
  color: string;
}

interface Props {
  badges: Badge[];
}

const iconMap = {
  Compass,
  MicVocal,
  GraduationCap,
  BookOpen,
  Brain,
  Star,
  Heart,
  Trophy,
  Sparkles,
  Coins,
};

export default function RecentBadges({
  badges = [],
}: Props) {
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
          const Icon =
  iconMap[badge.icon as keyof typeof iconMap] || Star;

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