"use client";

import { useEffect, useState } from "react";

import ProgressChart from "../../components/ProgressChart";
import TopStudents from "../../components/TopStudents";
import { DashboardData } from "../../types/teacher";
import LanguageDropdown from "../../components/LanguageDropdown";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import StoryApprovals from "../../components/StoryApprovals";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/utils/auth";

export default function TeacherDashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const router = useRouter();

  const user = getCurrentUser();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  const { language } = useLanguage();
  const t = translations[language];
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    const res = await fetch(
      "http://localhost:5000/api/teacher/dashboard"
    );

    const json = await res.json();

    setDashboard(json.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-xl">
        Loading dashboard...
      </div>
    );

  if (!dashboard)
    return (
      <div className="p-10">
        Failed to load dashboard
      </div>
    );

  return (
    <AuthGuard roles={["teacher"]}>
<main className="min-h-screen bg-[#FFF9EB]">
      {/* HEADER */}
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
  
      <section className="mx-auto max-w-7xl px-8 py-8">

        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-8">
  <ProgressChart progress={dashboard.progress} />
</div>

<div className="col-span-4">
  <TopStudents students={dashboard.leaderboard} />
</div>

</div>


          <div className="mt-10">

            <StoryApprovals
              approvals={dashboard.approvals}
              onActionComplete={fetchDashboard}
            />

          </div>

      </section>

    </main>
    </AuthGuard>
  );
}