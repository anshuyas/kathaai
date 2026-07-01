import Image from "next/image";
import Link from "next/link";
import { Story } from "../types/story";

interface StoryCardProps {
  story: Story;
}

function firstLine(story: Story, maxLen = 140): string {
  const text = story.scenes?.[0]?.text ?? "";
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}

export default function StoryCard({ story }: StoryCardProps) {
  const { _id, coverImage, title, ageGroup, language } = story;

  return (
    <Link href={`/stories/${_id}`} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#D8D0C4] bg-white shadow-sm transition hover:shadow-md">
       <div className="relative h-[220px] shrink-0">
  {coverImage ? (
  <Image
    src={coverImage}
    alt={title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-[#F3E8D8] text-[#B78A55]">
    No image
  </div>
)}

  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs">
    ⭐ {ageGroup}
  </div>
</div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex gap-2">
            <span className="rounded border px-2 py-1 text-xs uppercase">{language}</span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-2xl font-semibold leading-snug">{title}</h3>
          <p className="line-clamp-3 text-[#6D645B]">{firstLine(story)}</p>
        </div>
      </div>
    </Link>
  );
}