import type { Metadata } from "next";
import { PresentationViewer } from "@/components/PresentationViewer";
import { eyeball, getEyeballSlides } from "@/data/eyeball";

export const metadata: Metadata = {
  title: "Eyeball",
  description: eyeball.description,
};

export default function EyeballPage() {
  const slides = getEyeballSlides();

  return (
    <main id="content" className="flex min-h-dvh flex-col pt-14 sm:pt-16 lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1720px] flex-1 flex-col px-[max(1.25rem,4vw)] pb-6 lg:min-h-0 lg:flex-row lg:items-stretch lg:pb-8 lg:pt-6">
        <aside className="flex w-full flex-col gap-6 py-6 lg:h-full lg:w-[30%] lg:justify-between lg:py-2 lg:pr-10">
          <div>
            <p className="kicker text-muted">
              {eyeball.number}
              <span className="px-2" aria-hidden="true">
                /
              </span>
              {eyeball.series}
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,3.6vw,4rem)] font-medium uppercase leading-[0.84] tracking-[-0.05em]">
              {eyeball.title}
            </h1>
            <p className="mt-5 max-w-[14ch] text-[clamp(1.15rem,1.55vw,1.55rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em]">
              {eyeball.headline}
            </p>
          </div>
          <div className="max-w-[32ch]">
            <p className="text-[0.95rem] leading-[1.6]">{eyeball.description}</p>
            <p className="kicker mt-5 text-muted">{eyeball.category}</p>
          </div>
        </aside>

        <section aria-label="Eyeball presentation" className="flex min-h-0 flex-1 flex-col lg:w-[70%]">
          <PresentationViewer slides={slides} width={eyeball.width} height={eyeball.height} />
        </section>
      </div>
    </main>
  );
}
