import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { getProject, projects } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects
    .filter(
      (project) =>
        project.slug !== "birds-in-the-cage" &&
        project.slug !== "eyeball" &&
        project.slug !== "sticky",
    )
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="content" className="pb-24 pt-28 md:pb-36 md:pt-36">
      <Frame>
        <p className="kicker text-muted">
          {project.number}
          <span className="px-2" aria-hidden="true">
            /
          </span>
          {project.category}
        </p>
        <h1 className="mt-5 max-w-[12ch] text-[clamp(3.2rem,8vw,7rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em]">
          {project.title}
        </h1>
        {project.year ? <p className="kicker mt-4 text-muted">{project.year}</p> : null}
        <p className="mt-8 max-w-[40ch] text-[1.08rem] leading-[1.7]">{project.description}</p>

        <div className="mt-12">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(min-width: 1680px) 1520px, 100vw"
              className="h-auto w-full"
            />
          ) : (
            <div className="flex aspect-video items-end border border-ink/15 p-6">
              <p className="kicker text-muted">{project.title}</p>
            </div>
          )}
        </div>

        <p className="mt-10 max-w-[36ch] text-muted">
          A longer note on this project will live here.
        </p>
        <Link href="/#work" className="link-line kicker mt-8 inline-block">
          Back to work
        </Link>
      </Frame>
    </main>
  );
}
