"use client";

import { Clock3, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
interface Props {
  title?: string;
  countdown?: string;
}

export default function DailyChallenge({
  title = "Daily Challenge",
  countdown = "10 : 23 : 33",
}: Props) {

  const router = useRouter();
  
  return (
    <div className="flex h-[270px] items-center justify-between rounded-[34px] bg-[#A9F0B7] px-8 shadow-sm">

      {/* LEFT */}

      <div className="flex h-full flex-col justify-center">

        <h2 className="text-[38px] font-black leading-none text-[#156C39]">
          {title}
        </h2>

        <p className="mt-3 text-[20px] text-[#4E8E63]">
          New Challenge in
        </p>

        <div className="mt-8 flex items-center gap-3 text-[#156C39]">

          <Clock3 size={26} strokeWidth={2.3} />

          <span className="text-[28px] font-semibold tracking-wide">
            {countdown}
          </span>

        </div>

        <button
        onClick={() => router.push("/daily-challenge")}
          className="
            mt-8
            flex
            h-[60px]
            w-[230px]
            items-center
            justify-center
            rounded-full
            bg-[#156C39]
            text-[22px]
            font-semibold
            text-white
            transition
            hover:bg-[#12582F]
          "
        >
          Start Challenge ▶
        </button>

      </div>

      {/* RIGHT */}

      <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-4 border-[#DDF9E3]">

        <Trophy
          size={68}
          strokeWidth={2.2}
          className="text-[#156C39]"
        />

      </div>

    </div>
  );
}