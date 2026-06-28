"use client";

import { use, useEffect, useState } from "react";
import {
  Settings,
  Download,
} from "lucide-react";

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

  <div className="mx-auto mt-8 max-w-4xl space-y-8">

    {story.scenes.map((scene) => (
      <div
        key={scene.sceneNo}
        className="rounded-3xl bg-white p-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold">
          Scene {scene.sceneNo}
        </h2>

        <p className="mt-5 text-lg leading-9 text-[#3D342C]">
          {scene.text}
        </p>
      </div>
    ))}

  </div>

)}

      {/* QUIZ SECTION */}
{storyCompleted && (

<div className="mx-auto mt-12 max-w-6xl rounded-[32px] p-10">
<h2 className="mb-8 text-center text-3xl font-black">
      STORY QUIZ
  </h2>

  <div className="mb-8 h-[2px] bg-[#6B8F6B]" />

  <div className="grid grid-cols-12 gap-8">

   {/* LEFT SIDE - QUESTIONS */}
<div className="col-span-8">

  <div className="space-y-10">

    {story.quiz.map((q: Quiz, index: number) => (

      <div key={index}>

        <h3 className="mb-5 text-2xl font-semibold text-[#17221A]">
          {index + 1}. {q.question}
        </h3>

        <div className="space-y-4">

          {q.options.map((option: string, optionIndex: number) => (

            <button
              key={optionIndex}
              disabled={quizSubmitted}
              onClick={() =>
                setSelectedAnswers({
                  ...selectedAnswers,
                  [index]: option,
                })
              }
              className={`max-w-[650px] w-full rounded-lg border px-5 py-4 text-left text-lg transition

              ${
                selectedAnswers[index] === option
                  ? "border-[#B35A00] bg-[#F28A3B] text-white"
                  : "border-[#7D8A78] bg-[#F3EFE7] hover:bg-[#ECE5D7]"
              }

              ${
                quizSubmitted
                  ? "cursor-not-allowed opacity-80"
                  : ""
              }
              `}
            >
              {option}
            </button>

          ))}

        </div>

      </div>

    ))}

    {/* Submit Button */}

    {!quizSubmitted && (

      <button
        onClick={submitQuiz}
        className="mt-8 rounded-xl bg-[#2E8B57] px-10 py-4 text-xl font-semibold text-white transition hover:bg-[#256F45]"
      >
        Submit Quiz
      </button>

    )}


    {/* RIGHT SIDE PANEL */}
    <div className="col-span-4 space-y-5">

      {/* SCORE CARD */}
      <div className="rounded-2xl bg-[#F5D8C7] p-6 shadow-sm">
        <p className="text-sm uppercase text-[#5F5348]">
          Current Score
        </p>

        <div className="mt-2 text-4xl font-bold text-[#2D241C]">
          {score}/10
        </div>
      </div>

      {/* EARN POINTS CARD */}
      <div className="rounded-2xl border border-[#8FD49C] bg-[#C8F0CD] p-8 text-center">

        <p className="text-sm uppercase text-[#4F7B57]">
          Earn Points
        </p>

        <div className="my-4 text-5xl">
          ⭐
        </div>

        <p className="text-xl font-semibold text-[#1E3322]">
          Complete the story
          <br />
          to unlock more!
        </p>

      </div>

      {/* SHARE + SAVE CARD */}
      <div className="rounded-2xl bg-[#F5D8C7] p-6">

        <p className="mb-5 text-center text-sm uppercase text-[#5F5348]">
          Share & Save
        </p>

        <div className="flex justify-around text-3xl">

          <button className="transition hover:scale-110">
            🔗
          </button>

          <button className="transition hover:scale-110">
            💬
          </button>

          <button className="transition hover:scale-110">
            ⬇️
          </button>

        </div>

      </div>

    </div>
  </div>
  </div>
  </div>
  </div>
)}
  </main>
);
}