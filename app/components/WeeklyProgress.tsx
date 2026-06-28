import {
  BookOpen,
  Clock3,
  Star,
  Coins,
  TrendingUp,
} from "lucide-react";

export default function WeeklyProgress() {
  const progress = [
    {
      icon: <BookOpen size={22} />,
      title: "Stories Read",
      value: "+2",
      width: "72%",
      color: "bg-[#A65200]",
    },
    {
      icon: <Clock3 size={22} />,
      title: "Time Spent",
      value: "+15 min",
      width: "86%",
      color: "bg-[#FF7E97]",
    },
    {
      icon: <Star size={22} />,
      title: "Quiz Score",
      value: "+8% boost",
      width: "62%",
      color: "bg-[#1E7B44]",
    },
    {
      icon: <Coins size={22} />,
      title: "Points",
      value: "+50 pts",
      width: "48%",
      color: "bg-[#FF8A3C]",
    },
  ];

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
                  {item.icon}
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
                className={`h-full rounded-full ${item.color}`}
                style={{
                  width: item.width,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}