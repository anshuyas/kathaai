"use client";

import { use, useEffect, useState } from "react";

interface Scene {
  sceneNo: number;
  text: string;
  visualPrompt: string;
  emotion: string;
  audioNarration: string;
}

interface Story {
  title: string;
  language: string;
  scenes: Scene[];
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

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/story/${id}`);
        const data = await res.json();
        console.log("STORY API:", data);
        setStory(data.data);
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

  return (
    <div style={{ padding: "20px" }}>
      {/* TITLE */}
      <h1>{story.title}</h1>

      {/* MODE (we will enhance later) */}
      <p>Language: {story.language}</p>

      {/* SCENE BOX */}
      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
        <h2>Scene {scene.sceneNo}</h2>

        <p>{scene.text}</p>

        <p><b>Emotion:</b> {scene.emotion}</p>

        <p><b>Visual Prompt:</b> {scene.visualPrompt}</p>
      </div>

      {/* NAVIGATION */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={currentScene === 0}
          onClick={() => setCurrentScene((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          disabled={currentScene === story.scenes.length - 1}
          onClick={() => setCurrentScene((prev) => prev + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}