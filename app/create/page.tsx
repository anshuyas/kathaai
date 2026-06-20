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
import { useRef, useState } from "react";
import LanguageDropdown from "../components/LanguageDropdown";
import CustomDropdown from "../components/CustomDropdowm";

export default function CreatePage() {
    const { language } = useLanguage();
const t = translations[language];
const [showHeroModal, setShowHeroModal] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "generating" | "completed"
  >("idle");
const fileInputRef =
  useRef<HTMLInputElement>(null);
  const [story, setStory] = useState("");
  const [customHero, setCustomHero] = useState<string | null>(null);
  const [heroName, setHeroName] = useState("");
const [heroVoice, setHeroVoice] = useState("Kid Voice");
const [selectedHero, setSelectedHero] = useState({
  name: "Aarav",
  image: "/images/aarav.png",
  voice: "Kid Voice",
});
  const [generatedStory, setGeneratedStory] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] =
  useState("English");
  const [selectedAge, setSelectedAge] =
  useState("5-9 years");

const [selectedLength, setSelectedLength] =
  useState("Short");

const [selectedGenre, setSelectedGenre] =
  useState("Adventure");

const [
  selectedLearningGoal,
  setSelectedLearningGoal,
] = useState("Life Skills");

  const generateStory = async () => {
  try {
    setStatus("generating");

    const response = await fetch(
      "http://localhost:5000/api/ai/generate-story",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: story,
          language: selectedLanguage,
          ageGroup: selectedAge,
            storyLength: selectedLength,
            genre: selectedGenre,
            learningGoal: selectedLearningGoal,
            heroImage: customHero, 
              heroName: selectedHero.name,
  heroVoice: selectedHero.voice,
        }),
      }
    );

    const data = await response.json();

   setGeneratedStory(data.data);

setStatus("completed");
  } catch (error) {
    console.error(error);
    setStatus("idle");
  }
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

            <Link href="/my-stories">
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
      <section className="grid grid-cols-[460px_1fr_390px] gap-8 p-8">
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

            <CustomDropdown
  defaultValue="5-9 years"
  options={[
    "5-9 years",
    "10-14 years",
    "15-18 years",
  ]}
  onChange={setSelectedAge}
/>
          </div>

<input
  type="file"
  accept="image/*"
  capture="environment"
  className="hidden"
  ref={fileInputRef}
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setCustomHero(imageUrl);
      setShowHeroModal(false);
    }
  }}
/>
          {/* Heroes */}
          <div className="mt-8">
            <p className="mb-4 text-sm text-[#594D43]">
              Choose a Hero
            </p>

            <div className="flex gap-4 items-start">
              <div
  onClick={() =>
    setSelectedHero({
      name: "Aarav",
      image: "/images/aarav.png",
      voice: "Kid Voice",
    })
  }
  className={`cursor-pointer text-center ${
    selectedHero.name === "Aarav"
      ? "scale-110"
      : ""
  }`}
>
  <img
    src="/images/aarav.png"
    className="h-12 w-12 rounded-full border-2 border-transparent"
  />

  <p className="mt-2 text-xs">
    Aarav
  </p>
</div>

              <div
  onClick={() =>
    setSelectedHero({
      name: "Red Panda",
      image: "/images/red-panda.png",
      voice: "Kid Voice",
    })
  }
  className="cursor-pointer text-center"
>
  <img
    src="/images/red-panda.png"
    className="h-12 w-12 rounded-full"
  />

  <p className="mt-2 text-xs">
    Red Panda
  </p>
</div>

             <div
  onClick={() =>
    setSelectedHero({
      name: "Joy",
      image: "/images/joy.png",
      voice: "Kid Voice",
    })
  }
  className="cursor-pointer text-center"
>
  <img
    src="/images/joy.png"
    className="h-12 w-12 rounded-full"
  />

  <p className="mt-2 text-xs">
    Joy
  </p>
</div>
             {customHero && (
  <div
    onClick={() =>
      setSelectedHero({
        name: heroName,
        image: customHero,
        voice: heroVoice,
      })
    }
    className="cursor-pointer text-center"
  >
    <img
      src={customHero}
      alt={heroName}
      className="h-12 w-12 rounded-full object-cover"
    />

    <p className="mt-2 text-xs">
      {heroName}
    </p>
  </div>
)}

              <button
  type="button"
  onClick={() => setShowHeroModal(true)}
  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#D8BDA8] text-xl font-semibold text-[#A65200] transition hover:bg-[#FFF2E5]"
>
  +
</button>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-8 grid grid-cols-2 gap-4">
  {/* Language */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#594D43]">
      Language
    </label>

   <CustomDropdown
  defaultValue="English"
  options={["English", "Nepali"]}
  onChange={setSelectedLanguage}
/>
  </div>

  {/* Story Length */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#594D43]">
      Story Length
    </label>

    <CustomDropdown
      defaultValue="Short"
      options={["Short", "Medium", "Long"]}
      onChange={setSelectedLength}
    />
  </div>

  {/* Genre */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#594D43]">
      Genre
    </label>

    <CustomDropdown
      defaultValue="Adventure"
      options={[
        "Adventure",
        "Fantasy",
        "Science",
        "Festival",
        "Funny",
        "Moral",
        "Historical",
        "Comic",
      ]}
      onChange={setSelectedGenre}
    />
  </div>

  {/* Learning Goal */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#594D43]">
      Learning Goal
    </label>

    <CustomDropdown
      defaultValue="Life Skills"
      options={[
        "Life Skills",
        "Character",
        "Problem Solving",
        "Leadership",
        "Kindness",
        "Culture",
        "Mindfulness",
        "Social",
        "Values",
      ]}
      onChange={setSelectedLearningGoal}
    />
  </div>
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

          {status === "completed" && generatedStory && (
  <div className="mt-6 rounded-2xl bg-white p-6">
    <h2 className="mb-6 text-2xl font-bold text-[#A65200]">
      {generatedStory.title}
    </h2>

    <div className="space-y-6">
      {generatedStory.scenes?.map(
        (scene: any) => (
          <div
            key={scene.sceneNo}
            className="rounded-xl border border-[#EEE4D8] p-4"
          >
            <h3 className="mb-2 font-semibold text-[#A65200]">
              Scene {scene.sceneNo}
            </h3>

            <p className="leading-relaxed">
              {scene.text}
            </p>
          </div>
        )
      )}
    </div>
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

      {showHeroModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-[420px] rounded-[28px] border border-[#E3CDBB] bg-[#FFF9EB] p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-[#A65200]">
        Create Your Hero
      </h2>

      {/* HERO IMAGE */}
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#E3CDBB] bg-[#F8F1E5]">
            {customHero ? (
              <img
                src={customHero}
                alt="Hero"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#8B7E71]">
                No Image
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO NAME */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-[#594D43]">
          Hero Name
        </label>

        <input
          value={heroName}
          onChange={(e) =>
            setHeroName(e.target.value)
          }
          placeholder="Enter hero name"
          className="h-12 w-full rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-4 outline-none"
        />
      </div>

      {/* VOICE */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-[#594D43]">
          Voice
        </label>

        <CustomDropdown
          defaultValue="Kid Voice"
          options={[
            "Kid Voice",
            "Girl Voice",
            "Boy Voice",
            "Female Narrator",
            "Male Narrator",
          ]}
          onChange={setHeroVoice}
        />
      </div>

      {/* UPLOAD BUTTONS */}
      <div className="space-y-3">
        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="w-full rounded-xl bg-[#A65200] py-3 text-white"
        >
          Upload Hero Image
        </button>

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="w-full rounded-xl border border-[#A65200] py-3 text-[#A65200]"
        >
          Take Photo
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() =>
            setShowHeroModal(false)
          }
          className="flex-1 rounded-xl border border-[#D8BDA8] py-3"
        >
          Cancel
        </button>

        <button
          onClick={() => {
  if (!heroName.trim()) {
    alert("Please enter a hero name");
    return;
  }

  setSelectedHero({
    name: heroName,
    image: customHero || "",
    voice: heroVoice,
  });

  setShowHeroModal(false);
}}
          className="flex-1 rounded-xl bg-[#A65200] py-3 text-white"
        >
          Save Hero
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}