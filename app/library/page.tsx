import {
  ChevronRight,
  Search,
} from "lucide-react";
import GradeDropdown from "../components/GradeDropdown";
import StoryCard from "../components/StoryCard";

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-[#FFF9EB]">
      {/* Search Section */}
      <section className="mx-auto max-w-[1100px] px-6 pt-8">
        <div className="flex gap-4">
          <div className="flex h-12 flex-1 items-center rounded-2xl border-2 border-[#D8D0C4] bg-white px-4">
            <Search size={20} />

            <input
              placeholder="Search stories"
              className="ml-3 w-full bg-transparent outline-none"
            />
          </div>

          <GradeDropdown />
        </div>

        {/* Categories */}

        <div className="mt-8 flex gap-4">
          <button className="rounded-full bg-[#A65200] px-6 py-3 text-white">
            All
          </button>

          <button className="rounded-full border px-6 py-3">
            Popular
          </button>

          <button className="rounded-full border px-6 py-3">
            Funny stories
          </button>

          <button className="rounded-full border px-6 py-3">
            Festival
          </button>

          <button className="rounded-full border px-6 py-3">
            Science
          </button>

          <button className="rounded-full border px-6 py-3">
            Adventure
          </button>

          <button className="rounded-full border px-4 py-3">
            <ChevronRight />
          </button>
        </div>

        {/* Hero Story */}

        <div className="mt-10 overflow-hidden rounded-[32px] bg-orange-300">
          <div className="p-12">
            <span className="rounded-full bg-green-700 px-4 py-2 text-sm text-white">
              STORY OF THE DAY
            </span>

            <h1 className="mt-6 max-w-[600px] text-6xl font-bold text-[#4E2200]">
              The Clever Monkey & The Crocodile's Feast
            </h1>

            <p className="mt-5 max-w-[650px] text-2xl text-[#4E2200]">
              Journey to the banks of the Narayani river to
              see if our friend Monkey can outsmart the
              hungry crocodile today!
            </p>

            <button className="mt-8 rounded-2xl bg-[#A65200] px-8 py-4 text-white">
              ▶ Read Now
            </button>
          </div>
        </div>

        {/* Recommended */}

        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">
            Recommended for You
          </h2>

          <button className="text-[#A65200]">
            View all →
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <StoryCard
            image="/stories/lamp.png"
            title="The Night of Thousand Lamps"
            description="Learn about the magic of Tihar and the bond between a sister and her brave brother."
            grade="Grade 4"
          />

          <StoryCard
            image="/stories/yak.png"
            title="Yeti's Lost Bell"
            description="Follow the path of a helpful Yak named Tashi."
            grade="Grade 3"
          />

          <StoryCard
            image="/stories/panda.png"
            title="The Magic Rhododendron"
            description="A young traveler discovers a flower that can grant wishes."
            grade="Grade 2"
          />
        </div>

        {/* CTA */}

        <div className="mt-16 mb-20 flex items-center justify-between rounded-[32px] bg-[#FF944D] px-10 py-10">
          <div>
            <h2 className="text-5xl font-bold text-[#4E2200]">
              Do you want to create your own story?
            </h2>

            <p className="mt-4 max-w-[700px] text-xl text-[#4E2200]">
              Use our AI lab to weave a magical tale
              about mountains, festivals, or anything
              your imagination dreams of!
            </p>
          </div>

          <button className="rounded-2xl bg-[#A65200] px-8 py-4 text-white">
            ✨ Create Story
          </button>
        </div>
      </section>
    </main>
  );
}