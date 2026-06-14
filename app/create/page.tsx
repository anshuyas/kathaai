"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

import Link from "next/link";
import {
  ChevronDown,
  BookOpen,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import LanguageDropdown from "../components/LanguageDropdown";

export default function CreatePage() {
    const { language } = useLanguage();
const t = translations[language];
  const [status, setStatus] = useState<
    "idle" | "generating" | "completed"
  >("idle");

  const [story, setStory] = useState("");

  const generateStory = () => {
    setStatus("generating");

    // replace with API later
    setTimeout(() => {
      setStory(`
Once upon a time near the Narayani River,
a clever monkey met a hungry crocodile.

The crocodile wanted to trick the monkey,
but the monkey used wisdom and kindness
to solve the problem peacefully.

The End.
      `);

      setStatus("completed");
    }, 4000);
  };

  return (
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
              className="text-[#B76800]"
            >
              {t.create}
            </Link>

            <Link href="/stories">
              {t.myStories}
            </Link>

            <Link href="/dashboard">
                {t.dashboard}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageDropdown />

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F28A3B]">
              <User size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
<section className="px-12 py-8">
    <div className="grid grid-cols-[460px_1fr_390px] gap-8"></div>
            {/* LEFT PANEL */}
        <div className="rounded-[32px] border border-[#E3CDBB] bg-[#F8F1E5] p-6">
          <h2 className="text-[20px] font-medium">
            1. Your Story Idea
          </h2>

          <textarea
            value={story}
            onChange={(e) =>
              setStory(e.target.value)
            }
            placeholder="type here"
            className="mt-4 h-[130px] w-full resize-none rounded-[28px] border border-[#E3CDBB] bg-[#FFF9EB] p-5 outline-none"
          />

          <h2 className="mt-8 text-[20px] font-medium">
            2. Customize your story
          </h2>

          {/* Age */}
          <div className="mt-6">
            <label className="mb-2 block text-sm text-[#594D43]">
              Age Group
            </label>

            <select className="h-12 w-full rounded-2xl border border-[#E3CDBB] bg-[#FFF9EB] px-4">
              <option>15-18 years</option>
              <option>10-14 years</option>
              <option>5-9 years</option>
            </select>
          </div>

          {/* Heroes */}
          <div className="mt-8">
            <p className="mb-4 text-sm text-[#594D43]">
              Choose a Hero
            </p>

            <div className="flex gap-4">
              <div className="text-center">
                <img
                  src="/images/aarav.png"
                  className="h-12 w-12 rounded-full"
                />
                <p className="mt-2 text-xs">
                  Aarav
                </p>
              </div>

              <div className="text-center">
                <img
                  src="/images/red-panda.png"
                  className="h-12 w-12 rounded-full"
                />
                <p className="mt-2 text-xs">
                  Red Panda
                </p>
              </div>

              <div className="h-12 w-12 rounded-full bg-[#EAE0D2]" />

              <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#D8BDA8]">
                +
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <select className="h-12 rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-3">
              <option>English</option>
              <option>Nepali</option>
            </select>

            <select className="h-12 rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-3">
              <option>Life Skills</option>
            </select>

            <select className="h-12 rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-3">
              <option>Adventure</option>
            </select>

            <select className="h-12 rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-3">
              <option>Medium</option>
            </select>
          </div>

          <button
            onClick={generateStory}
            className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#A65200] text-lg text-white"
          >
            <Sparkles size={18} />
            Generate story
          </button>
        </div>

        {/* MIDDLE PANEL */}
        <div className="rounded-[32px] border border-[#E3CDBB] bg-[#F8F1E5] p-6">
          <h2 className="text-[20px] font-medium">
            Creating Your Story
          </h2>

          {status === "idle" && (
            <div className="flex h-[700px] flex-col items-center justify-center text-[#B1A89D]">
              <Sparkles size={48} />
              <p className="mt-6 text-2xl">
                Awaiting your idea...
              </p>
            </div>
          )}

          {status === "generating" && (
            <div className="flex h-[700px] flex-col items-center justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A65200] border-t-transparent" />

              <p className="mt-6 text-xl">
                AI is creating your story...
              </p>
            </div>
          )}

          {status === "completed" && (
            <div className="mt-6 rounded-2xl bg-white p-6">
              <p className="whitespace-pre-line">
                {story}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="rounded-[32px] border border-[#E3CDBB] bg-[#F8F1E5] p-6">
          <h2 className="text-[20px] font-medium">
            Your Story
          </h2>

          {status !== "completed" ? (
            <div className="mt-6 flex h-[650px] items-center justify-center rounded-[28px] border-2 border-dashed border-[#D7C9B8]">
              <BookOpen
                size={42}
                className="text-[#C4B7A7]"
              />
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[28px] bg-white">
              <img
                src="/images/story-cover.jpg"
                alt=""
                className="h-[650px] w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-end px-8 pb-10">
        <button className="rounded-2xl bg-[#A65200] px-10 py-4 text-white">
          Request Approval
        </button>
      </div>
    </main>
  );
}