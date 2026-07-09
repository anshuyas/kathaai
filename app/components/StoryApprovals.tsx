"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import Link from "next/link";

interface Story {
  _id: string;
  title: string;
  heroName: string;
  genre: string;
  createdAt: string;
  coverImage?: string;

  userId?: {
    _id: string;
    fullName: string;
    email: string;
  };

  scenes: {
    imageUrl?: string;
  }[];
}

interface Props {
  approvals: {
    pending: Story[];
    approved: Story[];
    rejected: Story[];
  };
  onActionComplete?: () => void;
}

export default function StoryApprovals({
  approvals,
  onActionComplete,
}: Props) {
  const [tab, setTab] = useState <
    "pending" | "approved" | "rejected"
  >("pending");

const [stories, setStories] = useState(approvals.pending);

useEffect(() => {
  setStories(approvals[tab]);
}, [tab, approvals]);


  const approveStory = async (id: string) => {
  console.log("Approving:", id);

  const res = await fetch(
    `http://localhost:5000/api/teacher/story/${id}/approve`,
    {
      method: "PATCH",
    }
  );

  console.log(res.status);

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    return;
  }

  setStories((prev) =>
    prev.filter((story) => story._id !== id)
  );

  onActionComplete?.();
};

const rejectStory = async (id: string) => {
  const reason = prompt("Reason for rejection?");

  if (!reason) return;

  const res = await fetch(
    `http://localhost:5000/api/teacher/story/${id}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason,
      }),
    }
  );

  if (!res.ok) return;

  setStories((prev) =>
    prev.filter((story) => story._id !== id)
  );

  onActionComplete?.();
};

  return (
    <div className="rounded-[34px] bg-[#F9F3E8] p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black">
          Story Approval
        </h2>

      </div>

      {/* Tabs */}

      <div className="mb-8 flex gap-3">

        {["pending", "approved", "rejected"].map((item) => (

          <button
            key={item}
            onClick={() => setTab(item as any)}
            className={`rounded-full px-6 py-2 font-semibold capitalize transition
            ${
              tab === item
                ? "bg-[#F28A3B] text-white"
                : "bg-[#ECE3D6]"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      <div className="space-y-5">

        {stories.length === 0 && (
  <div className="rounded-3xl bg-white p-12 text-center">
    <h3 className="text-2xl font-bold text-[#5D5349]">
      No stories to review
    </h3>

    <p className="mt-3 text-[#8D8378]">
      New AI-generated stories will appear here.
    </p>
  </div>
)}

        {stories.map((story) => (

          <div
            key={story._id}
            className="flex items-center justify-between rounded-3xl bg-white p-5 shadow"
          >

            <div className="flex gap-5">

              <Image
                src={
                  story.coverImage ||
                  story.scenes[0]?.imageUrl ||
                  "/story-cover.jpg"
                }
                alt=""
                width={130}
                height={90}
                className="rounded-2xl object-cover"
              />

              <div>

                <h3 className="text-xl font-bold">
                  {story.title}
                </h3>

                <p className="mt-2 text-[#7A7065]">
                  {story.genre}
                </p>

                <p className="mt-1 text-sm text-[#9A9085]">
                  by {story.userId?.fullName || "Unknown Author"}
                </p>

              </div>

            </div>

            {tab === "pending" && (

              <div className="flex items-center gap-3">

  <Link
    href={`/stories/${story._id}`}
    className="rounded-xl bg-[#ECE3D6] px-5 py-3 font-medium"
  >
    Preview
  </Link>

  <button
  onClick={() => approveStory(story._id)}
  aria-label="Approve"
  className="rounded-xl bg-[#BEE6C5] p-3"
>
  <Check size={22} />
</button>

<button
  onClick={() => rejectStory(story._id)}
  aria-label="Reject"
  className="rounded-xl bg-[#FFD3D3] p-3"
>
  <X size={22} />
</button>

</div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}