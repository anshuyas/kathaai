import Image from "next/image";

interface StoryCardProps {
  image: string;
  title: string;
  description: string;
  grade: string;
}

export default function StoryCard({
  image,
  title,
  description,
  grade,
}: StoryCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#D8D0C4] bg-white shadow-sm">
      <div className="relative h-[220px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs">
          ⭐ {grade}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex gap-2">
          <span className="rounded border px-2 py-1 text-xs">
            NEPALI
          </span>

          <span className="rounded border px-2 py-1 text-xs">
            ENGLISH
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-semibold">
          {title}
        </h3>

        <p className="text-[#6D645B]">
          {description}
        </p>
      </div>
    </div>
  );
}