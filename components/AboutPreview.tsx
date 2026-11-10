import { ArrowLink } from "@/components/ArrowLink";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function AboutPreview() {
  const { about } = site;

  return (
    <section id="about" className="border-t border-ink/10 py-24 md:py-36">
      <Frame>
        <Reveal>
          <p className="kicker text-muted">{about.label}</p>
        </Reveal>

        <div className="mt-6 grid grid-cols-12 gap-x-6">
          <h2 className="col-span-12 text-[clamp(3.15rem,7vw,6.9rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em] lg:col-span-7">
            {about.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Reveal className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-24">
            <div className="max-w-[42ch] space-y-5 text-[1.15rem] leading-[1.7]">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <ArrowLink href="/about">More about me</ArrowLink>
            </div>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/15 pt-8 md:mt-24 md:grid-cols-4">
          {about.meta.map((item) => (
            <div key={item.label}>
              <dt className="kicker text-muted">{item.label}</dt>
              <dd className="mt-3 max-w-[22ch] text-[1.125rem] leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Frame>
    </section>
  );
}
