import {
  BookOpen,
  Clock3,
  Star,
  Coins,
  TrendingUp,
} from "lucide-react";

interface ProgressItem {
  title: string;
  value: string;
  width: number;
}

interface Props {
  progress: ProgressItem[];
}

const iconMap = {
  "Stories Read": <BookOpen size={22} />,
  "Time Spent": <Clock3 size={22} />,
  "Quiz Score": <Star size={22} />,
  Points: <Coins size={22} />,
};

const colorMap = {
  "Stories Read": "bg-[#A65200]",
  "Time Spent": "bg-[#FF7E97]",
  "Quiz Score": "bg-[#1E7B44]",
  Points: "bg-[#FF8A3C]",
};

export default function WeeklyProgress({ progress }: Props) { 
  
  return (
    <div className="rounded-[34px] bg-[#F9F3E8] p-8 shadow-sm">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <h2 className="text-[24px] font-black">
          This Week Progress
        </h2>

        <TrendingUp
          size={24}
          className="text-[#A65200]"
        />

      </div>

      {/* Progress Items */}

      <div className="space-y-10">

        {progress.map((item) => (

          <div key={item.title}>

            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="text-[#4A4035]">
                  {iconMap[item.title as keyof typeof iconMap]}
                </div>

                <span className="font-semibold text-[18px]">
                  {item.title}
                </span>

              </div>

              <span className="font-bold text-[#1E7B44]">
                {item.value}
              </span>

            </div>

            {/* Bar */}

            <div className="h-4 overflow-hidden rounded-full bg-[#F0E8DA]">

              <div
className={`h-full rounded-full ${
  colorMap[item.title as keyof typeof colorMap]
}`}
               style={{
  width: `${item.width}%`,
}}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}