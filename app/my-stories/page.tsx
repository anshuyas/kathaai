"use client";

import Link from "next/link";
import {
  Calendar,
  PlayCircle,
  Trash2,
  Sparkles,
  User,
} from "lucide-react";
import LanguageDropdown from "../components/LanguageDropdown";
import { useState, useEffect } from "react";

export default function MyStoriesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "downloads" | "published">("all");
  const [stories, setStories] = useState<any[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null); // stores _id of story to delete
  const [deleting, setDeleting] = useState(false);

  const filteredStories = stories.filter((story) => {
    if (activeTab === "downloads") return story.downloaded === true;
    if (activeTab === "published") return story.published === true;
    return true;
  });

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/story");
        const data = await res.json();
        setStories(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await fetch(`http://localhost:5000/api/story/${deleteTarget}`, {
        method: "DELETE",
      });

      setStories((prev) => prev.filter((s) => s._id !== deleteTarget));
    } catch (error) {
      console.error("Failed to delete story:", error);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F1E7]">

      {/*  DELETE CONFIRMATION MODAL  */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center">
            <div className="flex items-center justify-center rounded-full bg-red-100 p-4 w-16 h-16 mx-auto">
              <Trash2 size={28} className="text-red-500" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#2D241C]">
              Delete Story?
            </h2>

            <p className="mt-2 text-[#7B6E62]">
              Do you want to delete this story? This action cannot be undone.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  HEADER  */}
      <header className="border-b border-[#E7DDCF]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <h1 className="text-3xl font-black text-[#9A4D00]">कथाAI</h1>

          <div className="hidden items-center gap-10 text-sm font-medium md:flex">
            <Link href="/">Home</Link>
            <Link href="/library">Library</Link>
            <Link href="/create">Create</Link>
            <Link href="/my-stories" className="text-[#B76800]">My Stories</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageDropdown />
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F28A3B]">
              <User size={18} />
            </button>
          </div>
        </div>
      </header>

      {/*  CONTENT  */}
      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="flex items-start justify-between">
          <p className="text-xl font-black text-[#5F5348]">
            Stories created by you
          </p>

          <Link
            href="/create"
            className="flex items-center gap-2 rounded-2xl bg-[#B35A00] px-8 py-4 text-lg font-semibold text-white shadow-md"
          >
            <Sparkles size={18} />
            Create new
          </Link>
        </div>

        {/* FILTERS  */}
        <div className="mt-14 flex gap-8">
          {(["all", "downloads", "published"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-8 py-3 text-lg font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "bg-[#F68B3B] text-[#2C2218]"
                  : "bg-[#E6DDD0] text-[#5A4D42]"
              }`}
            >
              {tab === "all" ? "All Stories" : tab === "downloads" ? "Downloads" : "Published Stories"}
            </button>
          ))}
        </div>

        {/*  EMPTY STATE  */}
        {filteredStories.length === 0 && (
          <div className="mt-14 flex min-h-[400px] flex-col items-center justify-center rounded-[30px] border border-dashed border-[#D8C8B5] bg-[#FBF7EF]">
            <div className="rounded-full bg-[#FFF0E0] p-6">
              <Sparkles size={36} className="text-[#B35A00]" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#2D241C]">
              {activeTab === "downloads"
                ? "No Downloads Yet"
                : activeTab === "published"
                ? "No Published Stories Yet"
                : "No Stories Yet"}
            </h3>

            <p className="mt-2 text-[#7B6E62]">
              {activeTab === "all"
                ? "Create your first AI-powered story."
                : activeTab === "downloads"
                ? "Download a story to access it here."
                : "Publish a story to share it with others."}
            </p>

            {activeTab === "all" && (
              <Link
                href="/create"
                className="mt-6 rounded-xl bg-[#B35A00] px-6 py-3 text-white"
              >
                Create Story
              </Link>
            )}
          </div>
        )}

        {/*  STORIES LIST  */}
        <div className="mt-8 space-y-6">
          {filteredStories.map((story) => (
            <div
              key={story._id}
              className="flex items-center justify-between rounded-[28px] border border-[#E4D6C7] bg-[#F8F3EB] p-6"
            >
              <div className="flex gap-6">
                <div className="h-44 w-44 flex-shrink-0 rounded-3xl bg-[#DDD]" />

                <div>
                  <h2 className="text-4xl font-bold">{story.title}</h2>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="rounded-full bg-green-200 px-4 py-1">
                      {story.genre}
                    </span>

                    <span className="flex items-center gap-2 text-[#5B5148]">
                      <Calendar size={16} />
                      Created: {new Date(story.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-16 flex items-center gap-2 font-medium">
                    <span className="h-3 w-3 rounded-full bg-green-600" />
                    {story.published ? "Published" : "Draft"}
                  </div>
                </div>
              </div>

              {/*  ACTIONS  */}
              <div className="flex items-center gap-8 text-[#5A4D42]">
                <Link href={`/stories/${story._id}`}>
                  <PlayCircle size={28} />
                </Link>

                {/* Delete button with tooltip */}
                <div className="group relative flex flex-col items-center">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#2D241C] px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Delete this story
                  </span>

                  <button
                    onClick={() => setDeleteTarget(story._id)}
                    className="text-[#5A4D42] transition-colors hover:text-red-500"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}