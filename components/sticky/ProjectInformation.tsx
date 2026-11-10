import { sticky } from "@/data/sticky";

const facts = [
  { label: "Year", value: sticky.year },
  { label: "Role", value: sticky.role.join("\n") },
  { label: "Medium", value: sticky.medium.join("\n") },
];

export function ProjectInformation() {
  return (
    <section aria-labelledby="introduction" className="mt-14 grid grid-cols-12 gap-x-8 gap-y-8 md:mt-16">
      <div className="col-span-12 md:col-span-6">
        <h2 id="introduction" className="kicker text-[#999999]">
          01 / Introduction
        </h2>
        <div className="mt-5 max-w-[42ch] space-y-4 text-[1.02rem] leading-[1.65]">
          {sticky.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <dl className="col-span-12 grid grid-cols-1 gap-6 md:col-span-4 md:col-start-9">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="kicker text-[#999999]">{fact.label}</dt>
            <dd className="mt-2 whitespace-pre-line text-[0.95rem] leading-[1.55]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
