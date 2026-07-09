import {
  BookOpen,
  Clock3,
  Star,
  Coins,
} from "lucide-react";

interface ComparisonItem {
  title: string;
  thisWeek: string;
  lastWeek: string;
  currentWidth: number;
  previousWidth: number;
}

interface Props {
  comparison: ComparisonItem[];
}

const iconMap = {
  "Stories Read": <BookOpen size={22} />,
  "Time Spent": <Clock3 size={22} />,
  "Quiz Score": <Star size={22} />,
  Points: <Coins size={22} />,
};

export default function WeekComparison({
  comparison,
}: Props) {

  return (
    <div className="rounded-[34px] bg-[#F9F3E8] p-8 shadow-sm">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <h2 className="text-[24px] font-black">
          This Week VS Last Week
        </h2>

        <div className="flex items-center gap-5 text-xs font-semibold">

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#C41452]" />
            THIS WEEK
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#97D99C]" />
            LAST WEEK
          </div>

        </div>

      </div>

      <div className="space-y-10">

        {comparison.map((item) => (

          <div key={item.title}>

            <div className="mb-4 flex items-center gap-3">

             {iconMap[item.title as keyof typeof iconMap]}

              <span className="font-semibold text-[18px]">
                {item.title}
              </span>

            </div>

            {/* This Week */}

            <div className="mb-3 flex items-center gap-4">

              <div className="h-3 flex-1 rounded-full bg-[#F0E8DA]">

                <div
                  className="h-3 rounded-full bg-[#C41452]"
                 style={{
  width: `${item.currentWidth}%`,
}}
                />

              </div>

              <span className="w-16 font-bold">
                {item.thisWeek}
              </span>

            </div>

            {/* Last Week */}

            <div className="flex items-center gap-4">

              <div className="h-3 flex-1 rounded-full bg-[#F0E8DA]">

                <div
                  className="h-3 rounded-full bg-[#97D99C]"
                  style={{
  width: `${item.previousWidth}%`,
}}
                />

              </div>

              <span className="w-16 font-bold text-[#5E564E]">
                {item.lastWeek}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}