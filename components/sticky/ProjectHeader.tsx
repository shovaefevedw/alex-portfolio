import { Reveal } from "@/components/Reveal";
import { sticky } from "@/data/sticky";

export function ProjectHeader() {
  return (
    <header className="pt-20 md:pt-24">
      <div className="flex items-baseline justify-between gap-6">
        <p className="kicker text-[#999999]">{sticky.label}</p>
        <p className="kicker text-right text-[#999999]">
          {sticky.year}
          <span className="px-2" aria-hidden="true">
            /
          </span>
          {sticky.category}
        </p>
      </div>
      <div className="mt-3 flex items-end justify-between gap-8">
        <h1 className="text-[clamp(3.5rem,7vw,6.25rem)] font-medium uppercase leading-[0.82] tracking-[-0.055em]">
          {sticky.title}
        </h1>
        <Reveal className="hidden max-w-[18ch] pb-1 text-right text-[clamp(1rem,1.35vw,1.2rem)] font-medium leading-[1.25] tracking-[-0.03em] md:block">
          {sticky.subtitle}
        </Reveal>
      </div>
      <p className="mt-3 max-w-[22ch] text-[1.05rem] font-medium leading-snug tracking-[-0.03em] md:hidden">
        {sticky.subtitle}
      </p>
    </header>
  );
}
