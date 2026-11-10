"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLink } from "@/components/ArrowLink";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/data/projects";

export function ProjectPreview({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (project.layout === "cinematic") {
    return <Cinematic project={project} priority={priority} />;
  }

  if (project.layout === "structured") {
    return <Structured project={project} priority={priority} />;
  }

  return <Photographic project={project} priority={priority} />;
}

function Photographic({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <Frame>
      <article>
        <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="kicker text-muted">{project.number}</p>
          <p className="kicker text-muted sm:max-w-[24rem] sm:text-right">{project.category}</p>
        </div>
        <ProjectVisual project={project} priority={priority} mode="natural" />
        <div className="mt-6 grid grid-cols-12 items-start gap-x-6 gap-y-6 md:mt-8">
          <h3 className="col-span-12 text-balance text-[clamp(2.9rem,6.6vw,6.1rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em] md:col-span-7">
            {project.title}
          </h3>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 md:pt-2">
            <p className="max-w-[36ch] text-[1.15rem] leading-[1.65]">{project.description}</p>
            <div className="mt-6">
              <ArrowLink href={`/work/${project.slug}`}>View Project</ArrowLink>
            </div>
          </Reveal>
        </div>
      </article>
    </Frame>
  );
}

function Structured({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <Frame>
      <article className="flex flex-col items-start gap-8 border-t border-ink/15 pt-12 md:flex-row md:gap-14 md:pt-14">
        <Reveal className="w-full shrink-0 md:w-[min(32rem,40%)]">
          <p className="kicker text-muted">{project.number}</p>
          <h3 className="mt-5 text-[clamp(3.35rem,6vw,5.25rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em]">
            {project.title}
          </h3>
          <p className="kicker mt-4 max-w-[28ch] text-muted">{project.category}</p>
          <p className="mt-8 max-w-[36ch] text-[1.15rem] leading-[1.65]">{project.description}</p>
          <div className="mt-8">
            <ArrowLink href={`/work/${project.slug}`}>View Project</ArrowLink>
          </div>
        </Reveal>
        <ProjectVisual project={project} priority={priority} mode="poster" />
      </article>
    </Frame>
  );
}

function Cinematic({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <article data-header-theme="dark" className="bg-dark text-paper">
      <Frame className="py-16 md:py-24">
        <div className="flex items-baseline justify-between gap-6">
          <p className="kicker text-mist">{project.number}</p>
          {project.year ? <p className="kicker text-mist">{project.year}</p> : null}
        </div>
        <h3 className="mt-5 text-[clamp(3.9rem,9.8vw,8.25rem)] font-medium uppercase leading-[0.84] tracking-[-0.05em]">
          {project.title}
        </h3>
        <p className="kicker mt-4 text-mist">{project.category}</p>
        <div className="mt-8 md:mt-10">
          <ProjectVisual project={project} priority={priority} mode="cinema" />
        </div>
        <Reveal className="mt-8 grid grid-cols-12 items-end gap-6">
          <p className="col-span-12 max-w-[42ch] text-[1.15rem] leading-[1.65] md:col-span-5">
            {project.description}
          </p>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:flex md:justify-end">
            <ArrowLink href={`/work/${project.slug}`}>View Project</ArrowLink>
          </div>
        </Reveal>
      </Frame>
    </article>
  );
}

function ProjectVisual({
  project,
  priority,
  mode,
}: {
  project: Project;
  priority: boolean;
  mode: "natural" | "cinema" | "poster";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const href = `/work/${project.slug}`;

  const play = () => {
    if (reduce || !project.video) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    videoRef.current?.play().catch(() => undefined);
  };

  const stop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <Link
      href={href}
      className="group block"
      aria-label={`View ${project.title}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      {mode === "cinema" ? (
        <CinemaFrame project={project} priority={priority} videoRef={videoRef} />
      ) : project.image ? (
        <div
          className={`overflow-hidden ${
            mode === "poster" ? "w-fit max-w-full border border-ink/10" : ""
          }`}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority={priority}
            sizes={
              mode === "poster"
                ? "(min-width: 1024px) 28vw, 80vw"
                : project.layout === "photographic"
                  ? "(min-width: 1680px) 1520px, 100vw"
                  : "(min-width: 1024px) 46vw, 100vw"
            }
            className={
              mode === "poster"
                ? "media-zoom h-auto max-h-[58vh] w-auto max-w-full"
                : "media-zoom h-auto w-full"
            }
          />
        </div>
      ) : (
        <Placeholder project={project} />
      )}
    </Link>
  );
}

function CinemaFrame({
  project,
  priority,
  videoRef,
}: {
  project: Project;
  priority: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  if (project.video) {
    return (
      <div className="relative aspect-video overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          poster={project.image?.src}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
        >
          <source src={project.video} />
        </video>
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="overflow-hidden bg-black">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          priority={priority}
          sizes="100vw"
          className="media-zoom h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video items-start border border-paper/20 p-5 transition-colors duration-300 group-hover:border-accent sm:p-8">
      <p className="kicker text-mist">Preview — {project.title}</p>
    </div>
  );
}

function Placeholder({ project }: { project: Project }) {
  return (
    <div className="flex aspect-[4/5] items-end border border-ink/15 p-5 sm:p-8">
      <p className="kicker text-muted">{project.title}</p>
    </div>
  );
}
