"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import Link from "next/link";
import { Search, Play, Sparkles, User, LogOut } from "lucide-react";
import GradeDropdown from "../components/GradeDropdown";
import StoryCard from "../components/StoryCard";
import LanguageDropdown from "../components/LanguageDropdown";
import AuthGuard from "../components/AuthGuard";
import { getCurrentUser } from "../utils/auth";
import { useRouter } from "next/navigation";
import { Story } from "../types/story";
import { GRADE_TO_AGE_GROUP } from "../lib/gradeToAge";
import { fetchApprovedStories } from "../lib/stories";

// Only these 4 genres have NP/EN translations today; others fall back to the raw genre string.
const GENRE_TO_LABEL_KEY: Record<string, string> = {
  funny: "funnyStories",
  festival: "festival",
  science: "science",
  adventure: "adventure",
};

function categoryLabel(cat: string, t: Record<string, string>): string {
  if (cat === "all") return t.all;
  if (cat === "popular") return t.popular;
  const key = GENRE_TO_LABEL_KEY[cat.toLowerCase()];
  return key ? t[key] : cat; // unmapped genres (Fantasy, Moral, Historical, Comic) show as-is
}

export default function LibraryPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const user = getCurrentUser();

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchApprovedStories();
        if (!cancelled) setStories(data);
      } catch (err) {
        if (!cancelled) setError("Couldn't load stories. Please try again.");
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Categories are derived from whatever genres actually exist in the fetched stories,
  // so buttons never go stale relative to the schema and never show empty filters.
  const categories = useMemo(() => {
    const genres = Array.from(new Set(stories.map((s) => s.genre).filter(Boolean)));
    return ["all", "popular", ...genres];
  }, [stories]);

  const filteredStories = useMemo(() => {
    let list = stories.filter((story) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        story.title.toLowerCase().includes(q) ||
        (story.scenes?.[0]?.text ?? "").toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "all" ||
        activeCategory === "popular" ||
        story.genre === activeCategory;

      const matchesGrade =
        !selectedGrade || story.ageGroup === GRADE_TO_AGE_GROUP[selectedGrade];

      return matchesSearch && matchesCategory && matchesGrade;
    });

    if (activeCategory === "popular") {
      list = [...list].sort((a, b) => (b.downloadCount ?? 0) - (a.downloadCount ?? 0));
    }

    return list;
  }, [stories, searchQuery, activeCategory, selectedGrade]);

  const storyOfTheDay = useMemo(() => {
    if (stories.length === 0) return null;
    return [...stories].sort(
      (a, b) =>
        new Date(b.approvedAt ?? b.createdAt).getTime() -
        new Date(a.approvedAt ?? a.createdAt).getTime()
    )[0];
  }, [stories]);

  console.log("hero story:", storyOfTheDay?.title, storyOfTheDay?.coverImage);


  return (
    <AuthGuard roles={["student", "parent", "teacher"]}>
      <main className="min-h-screen bg-[#FFF9EB]">
        {/* HEADER */}
        <header className="border-b border-[#ece4d2]">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <h1 className="text-3xl font-black text-[#9A4D00]">कथाAI</h1>

            <div className="hidden md:flex items-center gap-10 text-sm font-medium">
              <Link href="/">{t.home}</Link>
              <Link href="/library" className="text-[#B76800]">{t.library}</Link>
              <Link href="/create">{t.create}</Link>
              <Link href="/my-stories">{t.myStories}</Link>
              <Link href="/dashboard">{t.dashboard}</Link>
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
                      <h3 className="text-lg font-bold text-[#2D241C]">{user?.fullName}</h3>
                      <p className="mt-1 text-sm capitalize text-[#7B7269]">{user?.role}</p>
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
              <Search size={24} className="text-[#72675C]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchStories}
                className="ml-3 w-full bg-transparent text-base outline-none placeholder:text-[#72675C]"
              />
            </div>

            <GradeDropdown value={selectedGrade} onChange={setSelectedGrade} />
          </div>

          {/* Categories */}
          <div className="mt-10 flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  activeCategory === cat
                    ? "rounded-full bg-[#A65200] px-6 py-2 text-sm text-white"
                    : "rounded-full border border-[#D7CEC1] bg-white px-8 py-3"
                }
              >
                {categoryLabel(cat, t)}
              </button>
            ))}
          </div>

          {/* HERO */}
          
          {storyOfTheDay && (
            <div
             className="relative mt-10 h-[480px] overflow-hidden rounded-[36px] bg-[#F3E8D8]"
    style={
      storyOfTheDay.coverImage
        ? {
            backgroundImage: `url('${storyOfTheDay.coverImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : undefined
    }
            >
              <div className="absolute inset-0 bg-black/20" />

              <div className="relative z-10 flex h-full flex-col justify-center px-14">
                <span className="w-fit rounded-full bg-[#267340] px-5 py-2 text-sm font-medium text-white">
                  {t.storyOfTheDay}
                </span>

                <h1 className="mt-6 max-w-[700px] text-5xl font-bold leading-tight text-white">
                  {storyOfTheDay.title}
                </h1>

                <p className="mt-6 max-w-[700px] text-[28px] text-white">
                  {storyOfTheDay.scenes?.[0]?.text}
                </p>

                <Link
                  href={`/stories/${storyOfTheDay._id}`}
                  className="mt-8 flex w-fit items-center gap-3 rounded-2xl bg-[#A65200] px-8 py-4 text-xl font-medium text-white shadow-md"
                >
                  <Play size={18} fill="white" />
                  {t.readNow}
                </Link>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mt-12 flex items-center justify-between">
            <h2 className="text-[34px] font-semibold text-[#3E3228]">{t.recommended}</h2>
            <button className="text-xl text-[#A65200]">{t.viewAll} →</button>
          </div>

          {loading && <p className="mt-8 text-[#72675C]">Loading stories...</p>}
          {error && <p className="mt-8 text-red-600">{error}</p>}
          {!loading && !error && filteredStories.length === 0 && (
            <p className="mt-8 text-[#72675C]">No stories match your search yet.</p>
          )}

          {!loading && !error && filteredStories.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 mb-16 flex items-center justify-between rounded-[36px] bg-[#FF914D] px-12 py-12">
            <div>
              <h2 className="text-[52px] font-bold text-[#5A2200]">{t.createOwnStory}</h2>
              <p className="mt-4 max-w-[900px] text-[24px] text-[#5A2200]">{t.createOwnStoryDesc}</p>
            </div>

            <Link
              href="/create"
              className="flex items-center gap-3 rounded-2xl bg-[#A65200] px-8 py-5 text-xl font-medium text-white shadow-md"
            >
              <Sparkles size={20} />
              {t.createStory}
            </Link>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}