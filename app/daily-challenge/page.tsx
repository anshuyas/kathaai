"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  Trophy,
  Star,
} from "lucide-react";

interface Challenge {
  _id: string;
  title: string;
  readReward: number;
  quizReward: number;
  completionReward: number;
  totalReward: number;
}

export default function DailyChallengePage() {
  const router = useRouter();

  const [challenge, setChallenge] =
    useState<Challenge | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/daily-challenge/today"
        );

        const data = await res.json();

        if (data.success) {
          setChallenge(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9EB]">
        <h2 className="text-2xl font-bold">
          Loading Challenge...
        </h2>
      </main>
    );
  }

  if (!challenge) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9EB]">
        <h2 className="text-2xl font-bold">
          No Challenge Available Today
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9EB]">

      <section className="mx-auto max-w-4xl px-8 py-12">

        <button
          onClick={() => router.back()}
          className="mb-10 flex items-center gap-2 text-[#A65200]"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="rounded-[36px] bg-white p-10 shadow">

          <div className="text-center">

            <Trophy
              size={70}
              className="mx-auto text-[#156C39]"
            />

            <h1 className="mt-6 text-4xl font-black">
              Today's Daily Challenge
            </h1>

            <h2 className="mt-3 text-2xl font-bold text-[#A65200]">
              {challenge.title}
            </h2>

            <p className="mt-4 text-lg text-[#6B6258]">
              Complete today's exclusive story challenge to
              earn bonus points.
            </p>

          </div>

          <div className="mt-12 space-y-6">

            <div className="flex items-center justify-between rounded-2xl bg-[#F8F3EA] p-6">

              <div className="flex items-center gap-4">

                <BookOpen size={28} />

                <div>

                  <h3 className="text-xl font-bold">
                    Read Story
                  </h3>

                  <p className="text-[#777]">
                    Finish today's story.
                  </p>

                </div>

              </div>

              <span className="text-2xl font-black text-[#A65200]">
                +{challenge.readReward}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#F8F3EA] p-6">

              <div className="flex items-center gap-4">

                <ClipboardCheck size={28} />

                <div>

                  <h3 className="text-xl font-bold">
                    Complete Quiz
                  </h3>

                  <p className="text-[#777]">
                    Answer all quiz questions.
                  </p>

                </div>

              </div>

              <span className="text-2xl font-black text-[#A65200]">
                +{challenge.quizReward}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#F8F3EA] p-6">

              <div className="flex items-center gap-4">

                <Star size={28} />

                <div>

                  <h3 className="text-xl font-bold">
                    Completion Bonus
                  </h3>

                  <p className="text-[#777]">
                    Finish everything.
                  </p>

                </div>

              </div>

              <span className="text-2xl font-black text-[#A65200]">
                +{challenge.completionReward}
              </span>

            </div>

          </div>

          <div className="mt-10 rounded-3xl bg-[#A9F0B7] p-8 text-center">

            <p className="text-lg">
              Total Reward
            </p>

            <h2 className="mt-2 text-5xl font-black">
              ⭐ {challenge.totalReward}
            </h2>

          </div>

         <button
  onClick={() =>
    router.push(`/stories/${challenge._id}?challenge=true`)
  }
  className="mt-10 w-full rounded-2xl bg-[#156C39] py-5 text-2xl font-bold text-white transition hover:bg-[#12582F]"
>
  Start Reading
</button>
        </div>

      </section>

    </main>
  );
}