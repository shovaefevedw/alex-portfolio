import { sticky } from "@/data/sticky";

export function CreativeApproach() {
  return (
    <section aria-labelledby="approach" className="mt-16 grid grid-cols-12 items-start gap-x-8 gap-y-6 md:mt-20">
      <div className="col-span-12 md:col-span-7">
        <h2 id="approach" className="kicker text-[#999999]">
          02 / Creative Approach
        </h2>
        <p className="mt-4 max-w-[12ch] text-[clamp(2rem,4.2vw,3.6rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em]">
          {sticky.approach.headline}
        </p>
      </div>
      <div className="col-span-12 max-w-[40ch] space-y-4 text-[1.02rem] leading-[1.65] md:col-span-5 md:pt-8">
        {sticky.approach.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
