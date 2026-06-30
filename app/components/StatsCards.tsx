import {
  BookOpen,
  Clock3,
  Star,
  Coins,
  FileText,
  Download,
} from "lucide-react";

interface StatsProps {
  stats: {
    storiesRead: number;
    timeSpent: string;
    averageScore: number;
    totalPoints: number;
  };
}

export default function StatsCards({ stats }: StatsProps) {
  const cards = [
    {
      icon: <BookOpen size={30} />,
      value: stats.storiesRead,
      title: "Stories Read",
      subtitle: "This week",
    },
    {
      icon: <Clock3 size={30} />,
      value: stats.timeSpent,
      title: "Time Spent",
      subtitle: "This week",
    },
    {
      icon: <Star size={30} />,
      value: `${stats.averageScore}%`,
      title: "Avg. Score",
      subtitle: "This week",
    },
    {
      icon: <Coins size={30} />,
      value: stats.totalPoints,
      title: "Points",
      subtitle: "Total",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-10 grid grid-cols-4 gap-5">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] bg-[#FFE382] px-6 py-7 shadow-sm"
          >
            <div className="mb-5 text-[#A65200]">
              {item.icon}
            </div>

            <h2 className="text-4xl font-black">
              {item.value}
            </h2>

            <p className="mt-3 text-lg font-bold">
              {item.title}
            </p>

            <p className="mt-2 text-sm text-[#6C6257]">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      <div className="col-span-2">
        <div className="flex h-full flex-col items-center justify-center rounded-[28px] bg-[#FFE382] px-5 py-7 shadow-sm">
          <FileText
            size={34}
            className="text-[#A65200]"
          />

          <h3 className="mt-5 text-center text-lg font-bold leading-6">
            Weekly
            <br />
            Report
          </h3>

          <button className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-white transition hover:scale-105">
            <Download size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}