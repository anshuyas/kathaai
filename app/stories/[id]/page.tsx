"use client";

import { use, useEffect, useState } from "react";
import {
  Settings,
  Download,
} from "lucide-react";
import Link from "next/link";

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
  downloaded: boolean;
  videoUrl?: string;
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

const [selectedAnswers, setSelectedAnswers] =
  useState<Record<number, string>>({});

const [quizSubmitted, setQuizSubmitted] =
  useState(false);

const [score, setScore] = useState(0);


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

  if (loading) return <div>Loading story...</div>;
  if (!story) return <div>No story found</div>;

    const scene = story.scenes[currentScene];
    console.log(scene.imageUrl);
    
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
        pointsEarned: total * 10,
      }),
    });

    setQuizSubmitted(true);
  } catch (err) {
    console.error(err);
  }
};
    
const q = story.quiz[currentQuestion];

  return (
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
  onClick={async () => {
    await fetch(
      `http://localhost:5000/api/story/${story._id}/download`,
      {
        method: "PATCH",
      }
    );
  }}
  className="flex items-center gap-2 rounded-xl bg-[#EF7F8F] px-6 py-3 font-medium text-white shadow"
>
  <Download size={18} />
  Download for Offline
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
    Video Mode
  </button>

  <button
    onClick={() => setMode("reading")}
    className={`rounded-lg px-6 py-3 ${
      mode === "reading"
        ? "bg-[#B35A00] text-white"
        : "bg-[#ECE3D6]"
    }`}
  >
    Reading Mode
  </button>
</div>
      </div>

{mode === "video" ? (

  <>
      {/* PLAYER */}
<div className="mx-auto mt-8 max-w-5xl rounded-[32px] bg-white p-5 shadow-lg">
  <div className="relative overflow-hidden rounded-[30px]">

   <img
  src={scene.imageUrl}
  alt={`Scene ${scene.sceneNo}`}
  className="h-[500px] w-full rounded-[24px] object-cover"
/>

    <div className="absolute inset-0 flex items-center justify-center">

      <button className="flex h-28 w-28 items-center justify-center rounded-full bg-white/30 backdrop-blur">
        ▶
      </button>

<button
  onClick={async () => {
  if (currentScene < story.scenes.length - 1) {
    setCurrentScene(currentScene + 1);
    return;
  }

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
  className="mt-6 rounded-xl bg-[#B35A00] px-6 py-3 text-white"
>
  Next Scene
</button>

    </div>

    <div className="absolute right-6 top-6">

  <div className="rounded-xl bg-black/40 p-3 backdrop-blur">
    <Settings size={20} color="white" />
  </div>

</div>

    <div className="absolute bottom-12 left-0 w-full text-center">
      <h2 className="text-5xl font-bold text-white">
        {story.title}
      </h2>
    </div>

  </div>
</div>

      {/* PROGRESS */}
      <div className="mx-auto mt-8 max-w-5xl">

  <div className="rounded-2xl bg-[#C8F0CD] p-6">

    <div className="mb-3 flex items-center justify-between">

      <h3 className="text-lg font-bold">
        Story Progress
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
      Scene {story.scenes[currentScene].sceneNo}
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
        Previous
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
        Story Progress
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
        🧠 Story Challenge
      </h2>

      <p className="mt-3 text-lg text-[#6D6258]">
        Can you remember what happened in the story?
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

        Question {currentQuestion + 1} of {story.quiz.length}

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
          ← Previous
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
  Next →
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
  Submit Quiz
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
          Great Job!
        </h2>

        <p className="mt-4 text-xl text-[#666]">
          You scored
        </p>

        <div className="mt-3 text-6xl font-black text-[#2E8B57]">

          {score}/10

        </div>

        <p className="mt-5 text-lg text-[#666]">
          Keep reading stories to earn more points and improve your skills!
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-[#D7C9B8] px-6 py-3"
          >
            📖 Read Again
          </button>

          <Link
            href="/library"
            className="rounded-xl bg-[#A65200] px-6 py-3 text-white"
          >
            📚 Back to Library
          </Link>

        </div>

      </div>

    )}

  </div>
)}
  </main>
);
}