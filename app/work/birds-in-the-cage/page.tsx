import type { Metadata } from "next";
import { ChapterHeading } from "@/components/birds/ChapterHeading";
import { PhotoTiles, TextPhoto } from "@/components/birds/EditorialLayouts";
import { ImageViewer } from "@/components/birds/ImageViewer";
import { ProjectIntroduction } from "@/components/birds/ProjectIntroduction";
import { book } from "@/data/birds";

export const metadata: Metadata = {
  title: "Birds in the Cage",
  description:
    "The frame is the cage. A conceptual photography project on freedom, confinement, and the act of framing.",
};

export default function BirdsInTheCagePage() {
  return (
    <ImageViewer>
      <main id="content" className="overflow-x-clip pb-16">
        <ProjectIntroduction />
        {book.chapters.map((chapter) => (
          <section key={chapter.id} aria-labelledby={chapter.id} className="mt-14">
            <div className="mx-auto w-full max-w-[1720px] px-[max(1.25rem,5vw)]">
              <ChapterHeading chapter={chapter} />
              <div className="mt-6 flex flex-col gap-5">
                {chapter.pairs.map((pair, index) => (
                  <TextPhoto key={pair.image} pair={pair} index={index} />
                ))}
              </div>
              <PhotoTiles ids={chapter.tiles} />
            </div>
          </section>
        ))}
      </main>
    </ImageViewer>
  );
}
