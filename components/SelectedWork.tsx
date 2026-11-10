import { Frame } from "@/components/Frame";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export function SelectedWork() {
  const count = String(projects.length).padStart(2, "0");

  return (
    <section id="work" className="pb-0 pt-20 md:pt-32">
      <Frame>
        <Reveal>
          <header className="flex items-end justify-between gap-6 border-b border-ink/15 pb-6">
            <h2 className="text-[clamp(2.5rem,5.2vw,4.25rem)] font-medium uppercase leading-none tracking-[-0.045em]">
              {site.work.title}
            </h2>
            <p className="kicker text-right text-muted">
              {site.work.range}
              <span className="mt-1 block">
                {count} {projects.length === 1 ? "Project" : "Projects"}
              </span>
            </p>
          </header>
        </Reveal>
      </Frame>

      <div className="mt-14 flex flex-col gap-24 md:mt-20 md:gap-36">
        {projects.map((project) => (
          <ProjectPreview
            key={project.slug}
            project={project}
            priority={project.number === "01"}
          />
        ))}
      </div>
    </section>
  );
}
