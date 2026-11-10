import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  const { about } = site;

  return (
    <main id="content" className="pb-24 pt-28 md:pb-36 md:pt-36">
      <Frame>
        <p className="kicker text-muted">{about.label}</p>
        <h1 className="mt-6 max-w-[11ch] text-[clamp(3rem,7vw,6.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em]">
          {about.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <div className="mt-12 max-w-[46ch] space-y-5 text-[1.08rem] leading-[1.75]">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/15 pt-8 md:grid-cols-4">
          {about.meta.map((item) => (
            <div key={item.label}>
              <dt className="kicker text-muted">{item.label}</dt>
              <dd className="mt-3 max-w-[22ch] text-[1.02rem] leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-16 max-w-[36ch] text-muted">A longer note will live here.</p>
        <Link href="/#about" className="link-line kicker mt-8 inline-block">
          Back to index
        </Link>
      </Frame>
    </main>
  );
}
