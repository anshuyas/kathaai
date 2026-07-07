"use client";

import { use, useEffect, useState } from "react";
import {
  Settings,
  Download,
} from "lucide-react";
import Link from "next/link";
import AuthGuard from "@/app/components/AuthGuard";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

interface Scene {
  sceneNo: number;
  text: string;
  visualPrompt: string;
  emotion: string;
  audioNarration: string;
  imageUrl: string;
}

interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

interface Story {
  _id: string;
  title: string;
  language: string;
  genre: string;
  heroName: string;
  heroVoice: string;
  scenes: Scene[];
  quiz: Quiz[];
  published: boolean;
  downloadedBy: string[];
  videoUrl?: string;
  videoStatus?: "pending" | "generating" | "completed" | "failed";
  readReward: number;
quizReward: number;
completionReward: number;
totalReward: number;
isDailyChallenge: boolean;
challengeDate: string;
}

export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const { id } = use(params);
  const [mode, setMode] = useState<
  "video" | "reading"
>("video");
  const [playbackSpeed, setPlaybackSpeed] =
  useState(1);
  const [sessionId, setSessionId] = useState("");
const [startTime] = useState(Date.now());
const [storyCompleted, setStoryCompleted] = useState(false);
const [showQuiz, setShowQuiz] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [quizFinished, setQuizFinished] = useState(false);
const [currentUserId, setCurrentUserId] = useState<string | null>(null);

const [selectedAnswers, setSelectedAnswers] =
  useState<Record<number, string>>({});

const [quizSubmitted, setQuizSubmitted] =
  useState(false);

const [score, setScore] = useState(0);
const searchParams = useSearchParams();

const isDailyChallenge =
  searchParams.get("challenge") === "true";

const [videoProgress, setVideoProgress] = useState(0);
const { language } = useLanguage();
const t = translations[language];

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(payload.id);
  }
}, []);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/story/${id}`);
        const data = await res.json();
        console.log("STORY API:", data);
        setStory(data.data);
        const token = localStorage.getItem("token");

const payload = JSON.parse(atob(token!.split(".")[1]));
console.log({
  userId: payload.id,
  storyId: id,
});

const readingRes = await fetch(
  "http://localhost:5000/api/reading/start",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: payload.id,
      storyId: id,
    }),
  }
);

console.log("STATUS:", readingRes.status);

const text = await readingRes.text();

console.log("RAW RESPONSE:");
console.log(text);

const readingData = JSON.parse(text);

console.log("PARSED:");
console.log(readingData);

setSessionId(readingData.data._id);
      } catch (err) {
        console.error("Error loading story:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <div>{t.loadingStory}</div>;
  if (!story) return <div>{t.noStoryFound}</div>;

    const scene = story.scenes[currentScene];
    console.log(scene.imageUrl);

    const isDownloaded = !!currentUserId && story.downloadedBy?.includes(currentUserId);
    
const submitQuiz = async () => {
  console.log("QUIZ DATA:");
console.log(JSON.stringify(story.quiz, null, 2));
 let total = 0;

story.quiz.forEach((q, index) => {
  if (selectedAnswers[index] === q.answer) {
    total += 2;
  }
});

console.log("FINAL TOTAL:", total);

  setScore(total);

  if (isDailyChallenge) {
  console.log("✅ Daily Challenge completed");
} else {
  console.log("📖 Story completed");
}

  if (!sessionId) {
    console.error("No reading session found");
    return;
  }

  try {
    // finish reading session
    await fetch("http://localhost:5000/api/reading/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        duration: Math.floor((Date.now() - startTime) / 1000),
      }),
    });

    console.log("Selected Answers:", selectedAnswers);
console.log("Quiz:", story.quiz);
console.log("Total:", total);

console.log({
  sessionId,
  score: total,
  pointsEarned: total * 10,
});

    // save quiz score + earned points
    await fetch("http://localhost:5000/api/user/quiz-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        score: total,
        pointsEarned: isDailyChallenge
  ? story.totalReward
  : 0,
      }),
    });

    setQuizSubmitted(true);
  } catch (err) {
    console.error(err);
  }
};
    
const q = story.quiz[currentQuestion];
const downloadStory = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));

    const res = await fetch(
      `http://localhost:5000/api/story/${story._id}/download`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: payload.id }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Story downloaded for offline reading!");
      setStory(data.data);
    } else {
      console.error("Download failed:", data.message);
    }
  } catch (err) {
    console.error(err);
  }
};
console.log("isDailyChallenge:", isDailyChallenge);

  return (
    <AuthGuard roles={["student", "parent", "teacher"]}>
  <main className="min-h-screen bg-[#F7F1E7]">
  <div className="mx-auto max-w-6xl px-6 py-8">

      {/* HEADER */}
      <div className="flex items-start justify-between">
  <div>
    <h1 className="text-5xl font-black text-[#1F1B16]">
      {story.title}
    </h1>

    <p className="mt-2 text-lg text-[#5D5349]">
      {story.genre}
    </p>
  </div>

  <button
  onClick={downloadStory}
  className="flex items-center gap-2 rounded-xl bg-[#EF7F8F] px-6 py-3 font-medium text-white shadow hover:bg-[#E46D7D]"
>
  <Download size={18} />
  {isDownloaded ? t.downloaded : t.downloadForOffline}
</button>
</div>

       <div className="mt-10 flex gap-3">
  <button
    onClick={() => setMode("video")}
    className={`rounded-lg px-6 py-3 ${
      mode === "video"
        ? "bg-[#B35A00] text-white"
        : "bg-[#ECE3D6]"
    }`}
  >
    {t.videoMode}
  </button>

  <button
    onClick={() => setMode("reading")}
    className={`rounded-lg px-6 py-3 ${
      mode === "reading"
        ? "bg-[#B35A00] text-white"
        : "bg-[#ECE3D6]"
    }`}
  >
    {t.readingMode}
  </button>
</div>
      </div>

{mode === "video" ? (

  <>

    <div className="mx-auto mt-8 max-w-5xl rounded-[32px] bg-white p-5 shadow-lg">
      {story.videoUrl ? (
        <video
          src={`http://localhost:5000${story.videoUrl}`}
          controls
          className="w-full rounded-[24px]"
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            setVideoProgress((video.currentTime / video.duration) * 100 || 0);
          }}
          onEnded={async () => {
            const duration = Math.floor(
              (Date.now() - startTime) / 1000
            );

            await fetch(
              "http://localhost:5000/api/reading/finish",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  sessionId,
                  duration,
                }),
              }
            );

            setStoryCompleted(true);
          }}
        />
      ) : (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-[24px] bg-[#F3E8D8] text-center">
          <p className="text-xl font-semibold text-[#A65200]">
            {t.videoNotAvailableYet}
          </p>
          <p className="mt-2 text-[#8B7E71]">
            {story.videoStatus === "generating"
              ? t.videoGeneratingMessage
              : t.switchToReadingMode}
          </p>
        </div>
      )}
    </div>

    {/* PROGRESS */}
    {story.videoUrl && (
      <div className="mx-auto mt-8 max-w-5xl">

        <div className="rounded-2xl bg-[#C8F0CD] p-6">

          <div className="mb-3 flex items-center justify-between">

            <h3 className="text-lg font-bold">
              {t.storyProgress}
            </h3>

            <span className="font-semibold">
              {Math.round(videoProgress)}%
            </span>

          </div>

          <div className="h-4 rounded-full bg-[#DFF5E2]">

            <div
              className="h-4 rounded-full bg-[#2E8B57] transition-all"
              style={{ width: `${videoProgress}%` }}
            />

          </div>

        </div>
      </div>
    )}

  </>

) : (

   /* READING MODE */

  <div className="mx-auto mt-8 max-w-4xl">

  <div className="rounded-3xl bg-white p-8 shadow-sm">

    <img
      src={story.scenes[currentScene].imageUrl}
      alt=""
      className="mb-8 h-[420px] w-full rounded-3xl object-cover"
    />

    <h2 className="text-2xl font-bold">
      {t.scene} {story.scenes[currentScene].sceneNo}
    </h2>

    <p className="mt-6 text-xl leading-10 text-[#3D342C]">
      {story.scenes[currentScene].text}
    </p>

    <div className="mt-10 flex justify-between">

      <button
        disabled={currentScene === 0}
        onClick={() =>
          setCurrentScene(currentScene - 1)
        }
        className="rounded-xl border px-6 py-3 disabled:opacity-40"
      >
                {t.previous}
      </button>

      <button
        onClick={() => {
          if (
            currentScene <
            story.scenes.length - 1
          ) {
            setCurrentScene(currentScene + 1);
          } else {
            setStoryCompleted(true);
          }
        }}
        className="rounded-xl bg-[#A65200] px-6 py-3 text-white"
      >
        {currentScene === story.scenes.length - 1
          ? "Finish Story"
          : "Next"}
      </button>

    </div>

  </div>
  {/* PROGRESS */}
      <div className="mx-auto mt-8 max-w-5xl">

  <div className="rounded-2xl bg-[#C8F0CD] p-6">

    <div className="mb-3 flex items-center justify-between">

      <h3 className="text-lg font-bold">
        {t.storyProgress}
      </h3>

      <span className="font-semibold">
        {Math.round(
          ((currentScene + 1) /
            story.scenes.length) *
            100
        )}
        %
      </span>

    </div>

    <div className="h-4 rounded-full bg-[#DFF5E2]">

      <div
        className="h-4 rounded-full bg-[#2E8B57]"
        style={{
          width: `${
            ((currentScene + 1) /
              story.scenes.length) *
            100
          }%`,
        }}
      />

    </div>

  </div>
</div>

</div>

)}

{/* QUIZ SECTION */}
{storyCompleted && (
  <div className="mx-auto mt-16 max-w-4xl">

    {/* Heading */}

    <div className="mb-10 text-center">

      <h2 className="text-4xl font-black">
        {t.storyChallenge}
      </h2>

      <p className="mt-3 text-lg text-[#6D6258]">
        {t.rememberStoryPrompt}
      </p>

    </div>

    {/* Progress */}

    <div className="mb-8 h-3 overflow-hidden rounded-full bg-[#E9DED0]">

      <div
        className="h-full rounded-full bg-[#A65200] transition-all duration-300"
        style={{
          width: `${((currentQuestion + 1) / story.quiz.length) * 100}%`,
        }}
      />

    </div>

    {/* Quiz Card */}

    <div className="rounded-[32px] bg-white p-10 shadow-sm">

      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#A65200]">

        {t.questionOf} {currentQuestion + 1} {t.of} {story.quiz.length}

      </p>

      <h3 className="mb-8 text-3xl font-bold leading-snug">

        {story.quiz[currentQuestion].question}

      </h3>

      <div className="space-y-4">

        {story.quiz[currentQuestion].options.map(
          (option: string, index: number) => (

            <button
              key={index}
              disabled={quizSubmitted}
              onClick={() =>
                setSelectedAnswers({
                  ...selectedAnswers,
                  [currentQuestion]: option,
                })
              }
              className={`w-full rounded-2xl border px-6 py-5 text-left text-lg transition

              ${
                selectedAnswers[currentQuestion] === option
                  ? "border-[#F28A3B] bg-[#F28A3B] text-white"
                  : "border-[#DDD2C4] bg-[#F9F4EC] hover:bg-[#EFE5D8]"
              }
              `}
            >
              {option}
            </button>

          )
        )}

      </div>

      {/* Navigation */}

      <div className="mt-10 flex items-center justify-between">

        <button
          disabled={currentQuestion === 0}
          onClick={() =>
            setCurrentQuestion(currentQuestion - 1)
          }
          className="rounded-xl border border-[#D7C9B8] px-6 py-3 disabled:opacity-40"
        >
          {t.prevArrow}
        </button>

        {currentQuestion < story.quiz.length - 1 ? (

          <button
  disabled={!selectedAnswers[currentQuestion]}
  onClick={() =>
    setCurrentQuestion(currentQuestion + 1)
  }
  className={`rounded-xl px-8 py-3 text-white transition

  ${
    selectedAnswers[currentQuestion]
      ? "bg-[#A65200] hover:bg-[#8C4500]"
      : "cursor-not-allowed bg-gray-300"
  }
  `}
>
  {t.nextArrow}
</button>

        ) : (

          <button
  disabled={!selectedAnswers[currentQuestion]}
  onClick={submitQuiz}
  className={`rounded-xl px-8 py-3 text-white transition

  ${
    selectedAnswers[currentQuestion]
      ? "bg-[#2E8B57] hover:bg-[#256F45]"
      : "cursor-not-allowed bg-gray-300"
  }
  `}
>
  {t.submitQuiz}
</button>

        )}

      </div>

    </div>

    {/* Result */}

    {quizSubmitted && (

      <div className="mt-10 rounded-[32px] bg-white p-10 text-center shadow-sm">

        <div className="text-6xl">
          🎉
        </div>

        <h2 className="mt-5 text-4xl font-black">
  {isDailyChallenge
    ? t.dailyChallengeComplete
    : t.greatJob}
</h2>

        <p className="mt-4 text-xl text-[#666]">
          {t.youScored}
        </p>

        <div className="mt-3 text-6xl font-black text-[#2E8B57]">

          {score}/10

        </div>

        <p className="mt-5 text-lg text-[#666]">
  {isDailyChallenge
    ? t.dailyChallengeBonusMsg.replace("{reward}", String(story.totalReward))
    : t.keepReadingMsg}
</p>

        <div className="mt-10 flex justify-center gap-4">

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-[#D7C9B8] px-6 py-3"
          >
                        {t.readAgain}
          </button>

          <Link
            href="/library"
            className="rounded-xl bg-[#A65200] px-6 py-3 text-white"
          >
                        {t.backToLibrary}
          </Link>

        </div>

      </div>

    )}

  </div>
)}
  </main>
  </AuthGuard>
);
}