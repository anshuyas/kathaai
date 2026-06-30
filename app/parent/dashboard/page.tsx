"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";

import LanguageDropdown from "@/app/components/LanguageDropdown";

import WeeklyProgress from "@/app/components/WeeklyProgress";
import WeekComparison from "@/app/components/WeekComparison";
import RecentBadges from "@/app/components/Badges";
import DailyChallenge from "@/app/components/DailyChallenge";
import StatsCards from "@/app/components/StatsCards";
import { translations } from "@/app/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/utils/auth";
import { useState, useEffect } from "react";


export default function ParentDashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const router = useRouter();
  
  const user = getCurrentUser();

  const [dashboard, setDashboard] = useState<any>(null);
  
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));

      const res = await fetch(
        `http://localhost:5000/api/parent/dashboard/${payload.id}`
      );

      const data = await res.json();

      if (data.success) {
        setDashboard(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchDashboard();
}, []);

  return (
    <AuthGuard roles={["parent", "student"]}>
    <main className="min-h-screen bg-[#F7F1E7]">

      {/* NAVBAR */}

     <header className="border-b border-[#ece4d2]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <h1 className="text-3xl font-black text-[#9A4D00]">
            कथाAI
          </h1>

          <div className="hidden items-center gap-10 text-sm font-medium md:flex">
            <Link href="/">{t.home}</Link>

            <Link href="/library">{t.library}</Link>

            <Link
              href="/create"
            >
              {t.create}
            </Link>

            <Link href="/my-stories">
              {t.myStories}
            </Link>

            <Link href="/dashboard" className="text-[#B76800]">
                {t.dashboard}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageDropdown />

           <div className="relative">

  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F28A3B] text-white transition hover:scale-105"
  >
    <User size={18} />
  </button>

  {showProfileMenu && (
    <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#E8DDCF] bg-white p-5 shadow-xl z-50">

      <div>
        <h3 className="text-lg font-bold text-[#2D241C]">
          {user?.fullName}
        </h3>

        <p className="mt-1 text-sm capitalize text-[#7B7269]">
          {user?.role}
        </p>
      </div>

      <div className="my-4 h-px bg-[#ECE3D6]" />

      <button
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
</div>
  )}
    </div>
          </div>
        </div>
      </header>


      {/* BODY */}

      <section className="mx-auto max-w-7xl px-8 py-8">

        {/* Welcome */}

        <div className="mb-8 flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-semibold">

              Here's how{" "}
              <span className="text-[#A65200]">
                {user?.fullName}
              </span>{" "}
              is doing.

            </h2>

            <p className="mt-2 text-[#6F665B]">
              Review your child's weekly progress and creative journey.
            </p>

          </div>

        </div>

        {/* Stats */}

        {dashboard && (
  <StatsCards stats={dashboard.stats} />
)}

        {/* Middle */}

        <div className="mt-10 grid grid-cols-2 gap-8">

<WeeklyProgress progress={dashboard?.progress ?? []} />

{dashboard && (
  <WeekComparison comparison={dashboard.comparison} />
)}
        </div>

        {/* Bottom */}

        <div className="mt-8 grid grid-cols-2 gap-8">

         {dashboard && (
  <RecentBadges badges={dashboard.badges} />
)}

          <DailyChallenge />

        </div>

      </section>

    </main>
    </AuthGuard>
  );
}