import {
  BookOpen,
  Clock3,
  Star,
  Coins,
} from "lucide-react";

export default function WeekComparison() {
  const comparison = [
    {
      icon: <BookOpen size={22} />,
      title: "Stories Read",
      thisWeek: "8",
      lastWeek: "6",
      currentWidth: "92%",
      previousWidth: "70%",
    },
    {
      icon: <Clock3 size={22} />,
      title: "Time Spent",
      thisWeek: "1h 25m",
      lastWeek: "1h 10m",
      currentWidth: "84%",
      previousWidth: "73%",
    },
    {
      icon: <Star size={22} />,
      title: "Quiz Score",
      thisWeek: "85%",
      lastWeek: "77%",
      currentWidth: "96%",
      previousWidth: "84%",
    },
    {
      icon: <Coins size={22} />,
      title: "Points",
      thisWeek: "250",
      lastWeek: "200",
      currentWidth: "80%",
      previousWidth: "63%",
    },
  ];

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

              {item.icon}

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
                    width: item.currentWidth,
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
                    width: item.previousWidth,
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