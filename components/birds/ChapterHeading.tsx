import type { BirdChapterContent } from "@/data/birds";

export function ChapterHeading({ chapter }: { chapter: BirdChapterContent }) {
  return (
    <div className="flex items-end justify-between gap-8">
      <h2
        id={chapter.id}
        className="max-w-[14ch] text-[clamp(1.7rem,2.8vw,2.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.04em]"
      >
        {chapter.title}
      </h2>
      <p className="max-w-[22ch] text-right text-[clamp(0.95rem,1.35vw,1.15rem)] font-medium uppercase leading-[1.05] tracking-[-0.03em]">
        {chapter.statement}
      </p>
    </div>
  );
}
