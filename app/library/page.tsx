"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

import Link from "next/link";
import {
  ChevronRight,
  Search,
  Globe,
  ChevronDown,
  Play,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";
import GradeDropdown from "../components/GradeDropdown";
import StoryCard from "../components/StoryCard";
import LanguageDropdown from "../components/LanguageDropdown";
import AuthGuard from "../components/AuthGuard";
import { getCurrentUser } from "../utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LibraryPage() {
  const { language } = useLanguage();
const t = translations[language];
const [showProfileMenu, setShowProfileMenu] = useState(false);

const router = useRouter();

const user = getCurrentUser();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

  return (
    <AuthGuard roles={["student", "parent", "teacher"]}>
    <main className="min-h-screen bg-[#FFF9EB]">
      {/* HEADER */}
      <header className="border-b border-[#ece4d2]">
  <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
    <h1 className="text-3xl font-black text-[#9A4D00]">
      कथाAI
    </h1>

    <div className="hidden md:flex items-center gap-10 text-sm font-medium">
      <Link href="/">{t.home}</Link>

      <Link
        href="/library"
        className="text-[#B76800]"
      >
        {t.library}
      </Link>

      <Link href="/create">{t.create}</Link>
      <Link href="/my-stories">{t.myStories}</Link>
      <Link href="/dashboard">{t.dashboard}</Link>
      
    </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
      <LanguageDropdown></LanguageDropdown>

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

      {/* CONTENT */}
      <section className="mx-auto max-w-[1440px] px-16 py-10">
        {/* Search */}
        <div className="flex gap-6">
          <div className="flex h-12 flex-1 items-center rounded-2xl border-2 border-[#DDD5C8] bg-white px-4">
            <Search
              size={24}
              className="text-[#72675C]"
            />

            <input
              placeholder={t.searchStories}
              className="ml-3 w-full bg-transparent text-base outline-none placeholder:text-[#72675C]"
            />
          </div>

          <GradeDropdown />
        </div>

        {/* Categories */}
        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-[#A65200] px-6 py-2 text-sm text-white">
            {t.all}
          </button>

          <button className="rounded-full border border-[#D7CEC1] bg-white px-8 py-3">
            {t.popular}
          </button>

          <button className="rounded-full border border-[#D7CEC1] bg-white px-8 py-3">
            {t.funnyStories}
          </button>

          <button className="rounded-full border border-[#D7CEC1] bg-white px-8 py-3">
            {t.festival}
          </button>

          <button className="rounded-full border border-[#D7CEC1] bg-white px-8 py-3">
            {t.science}
          </button>

          <button className="rounded-full border border-[#D7CEC1] bg-white px-8 py-3">
            {t.adventure}
          </button>

          <button className="rounded-full border border-[#D7CEC1] bg-white px-5 py-3">
            <ChevronRight />
          </button>
        </div>

        {/* HERO */}
        <div
          className="relative mt-10 h-[480px] overflow-hidden rounded-[36px]"
          style={{
            backgroundImage: "url('/images/monkey.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-center px-14">
            <span className="w-fit rounded-full bg-[#267340] px-5 py-2 text-sm font-medium text-white">
              {t.storyOfTheDay}
            </span>

            <h1 className="mt-6 max-w-[700px] text-5xl font-bold leading-tight text-white">
              The Clever Monkey & The Crocodile&apos;s Feast
            </h1>

            <p className="mt-6 max-w-[700px] text-[28px] text-white">
              Journey to the banks of the Narayani river to
              see if our friend Monkey can outsmart the
              hungry crocodile today!
            </p>

            <button className="mt-8 flex w-fit items-center gap-3 rounded-2xl bg-[#A65200] px-8 py-4 text-xl font-medium text-white shadow-md">
              <Play size={18} fill="white" />
              {t.readNow}
            </button>
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-[34px] font-semibold text-[#3E3228]">
            {t.recommended}
          </h2>

          <button className="text-xl text-[#A65200]">
            {t.viewAll} →
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-8">
          <StoryCard
            image="/images/thousand-lamp.png"
            title="The Night of Thousand Lamps"
            description="Learn about the magic of Tihar and the bond between a sister and her brave brother."
            grade="Grade 4"
          />

          <StoryCard
            image="/images/yeti.png"
            title="Yeti's Lost Bell"
            description="Follow the path of a helpful Yak named Tashi as he helps a friendly Yeti find his favorite bell."
            grade="Grade 3"
          />

          <StoryCard
            image="/images/magic.png"
            title="The Magic Rhododendron"
            description="A young traveler discovers a flower that can grant wishes, but only to those with a kind heart."
            grade="Grade 2"
          />
        </div>

        {/* CTA */}
        <div className="mt-20 mb-16 flex items-center justify-between rounded-[36px] bg-[#FF914D] px-12 py-12">
          <div>
            <h2 className="text-[52px] font-bold text-[#5A2200]">
              {t.createOwnStory}
            </h2>

            <p className="mt-4 max-w-[900px] text-[24px] text-[#5A2200]">
              {t.createOwnStoryDesc}
            </p>
          </div>

          <button className="flex items-center gap-3 rounded-2xl bg-[#A65200] px-8 py-5 text-xl font-medium text-white shadow-md">
            <Sparkles size={20} />
            {t.createStory}
          </button>
        </div>
      </section>
    </main>
    </AuthGuard>
  );
}