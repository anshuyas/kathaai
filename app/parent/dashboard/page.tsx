"use client";

import Link from "next/link";
import { User } from "lucide-react";

import LanguageDropdown from "@/app/components/LanguageDropdown";

import WeeklyProgress from "@/app/components/WeeklyProgress";
import WeekComparison from "@/app/components/WeekComparison";
import RecentBadges from "@/app/components/Badges";
import DailyChallenge from "@/app/components/DailyChallenge";
import StatsCards from "@/app/components/StatsCards";

export default function ParentDashboard() {
  return (
    <main className="min-h-screen bg-[#F7F1E7]">

      {/* NAVBAR */}

      <nav className="border-b border-[#ECE4D2]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

          <h1 className="text-3xl font-black text-[#9A4D00]">
            कथाAI
          </h1>

          <div className="hidden items-center gap-10 text-sm font-medium md:flex">

            <Link href="/">
              Home
            </Link>

            <Link href="/library">
              Library
            </Link>

            <Link href="/create">
              Create
            </Link>

            <Link href="/stories">
              My Stories
            </Link>

            <Link
              href="/dashboard"
              className="text-[#B76800]"
            >
              Dashboard
            </Link>

          </div>

          <div className="flex items-center gap-3">

            <LanguageDropdown />

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F28A3B]">

              <User size={18} />

            </button>

          </div>

        </div>
      </nav>

      {/* BODY */}

      <section className="mx-auto max-w-7xl px-8 py-8">

        {/* Welcome */}

        <div className="mb-8 flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-semibold">

              Here's how{" "}
              <span className="text-[#A65200]">
                Username
              </span>{" "}
              is doing.

            </h2>

            <p className="mt-2 text-[#6F665B]">
              Review your child's weekly progress and creative journey.
            </p>

          </div>

          {/* Username Card */}

          <div className="flex h-20 w-56 items-center justify-center rounded-3xl bg-[#A7F2B7]">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#19753B] text-white">

                😊

              </div>

              <div>

                <p className="font-bold tracking-wide">
                  USERNAME
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Stats */}

        <StatsCards />

        {/* Middle */}

        <div className="mt-10 grid grid-cols-2 gap-8">

          <WeeklyProgress />

          <WeekComparison />

        </div>

        {/* Bottom */}

        <div className="mt-8 grid grid-cols-2 gap-8">

          <RecentBadges />

          <DailyChallenge />

        </div>

      </section>

    </main>
  );
}