import type { Metadata } from "next";
import { CreativeApproach } from "@/components/sticky/CreativeApproach";
import { ProjectHeader } from "@/components/sticky/ProjectHeader";
import { ProjectInformation } from "@/components/sticky/ProjectInformation";
import { SelectedFrames } from "@/components/sticky/SelectedFrames";
import { VideoPlayer } from "@/components/sticky/VideoPlayer";
import { sticky } from "@/data/sticky";

export const metadata: Metadata = {
  title: "Sticky",
  description: sticky.subtitle,
};

export default function StickyPage() {
  return (
    <main id="content" data-header-theme="dark" className="min-h-dvh bg-[#111111] text-[#F2F0EB]">
      <div className="mx-auto w-full max-w-[1440px] px-[max(1.25rem,5vw)] pb-20">
        <ProjectHeader />
        <VideoPlayer
          src={sticky.video.src}
          poster={sticky.video.poster}
          width={sticky.video.width}
          height={sticky.video.height}
        />
        <ProjectInformation />
        <CreativeApproach />
        <SelectedFrames />
      </div>
    </main>
  );
}
