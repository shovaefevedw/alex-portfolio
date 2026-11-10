"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import imageLoader from "@/image-loader";

export type PresentationSlide = {
  src: string;
  alt: string;
};

export function PresentationViewer({
  slides,
  width,
  height,
}: {
  slides: PresentationSlide[];
  width: number;
  height: number;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ current: 0, previous: 0 });
  const [expanded, setExpanded] = useState(false);
  const { current, previous } = frame;

  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      setFrame((state) => {
        if (next < 0 || next >= total || next === state.current) return state;
        return { current: next, previous: state.current };
      });
    },
    [total],
  );

  useEffect(() => {
    const next = slides[current + 1];
    if (!next) return;
    const image = new window.Image();
    image.src = imageLoader({ src: next.src });
  }, [current, slides]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(current + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  useEffect(() => {
    const onChange = () => setExpanded(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const node = rootRef.current;
    if (!node) return;
    if (document.fullscreenElement === node) {
      void document.exitFullscreen();
      return;
    }
    void node.requestFullscreen();
  };

  if (total === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center border border-ink/15">
        <p className="kicker text-muted">No slides</p>
      </div>
    );
  }

  const label = String(current + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");
  const slide = slides[current];
  const under = slides[previous];

  return (
    <div
      ref={rootRef}
      className="flex min-h-0 flex-1 flex-col [&:fullscreen]:bg-paper [&:fullscreen]:px-[4vw] [&:fullscreen]:py-6"
    >
      <style>{`@keyframes eyeball-fade{from{opacity:0}to{opacity:1}}`}</style>
      <div className="relative w-full [container-type:size] max-lg:aspect-video lg:min-h-0 lg:flex-1">
        <div className="absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              aspectRatio: `${width} / ${height}`,
              width: `min(100cqw, calc(100cqh * ${width} / ${height}))`,
            }}
          >
            {previous !== current ? (
              <Image
                src={under.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, 62vw"
                className="object-contain"
              />
            ) : null}
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={current === 0}
              sizes="(max-width: 1024px) 92vw, 62vw"
              className={`object-contain ${reduce ? "" : "animate-[eyeball-fade_200ms_ease-out_both]"}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex h-8 shrink-0 items-center justify-between gap-3 whitespace-nowrap">
        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          className="link-line kicker shrink-0 disabled:pointer-events-none disabled:opacity-30"
        >
          ← Prev
        </button>
        <p className="kicker shrink-0 tabular-nums text-muted" aria-live="polite">
          {label}
          <span className="px-2" aria-hidden="true">
            /
          </span>
          {count}
        </p>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => go(current + 1)}
            disabled={current === total - 1}
            className="link-line kicker disabled:pointer-events-none disabled:opacity-30"
          >
            Next →
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-pressed={expanded}
            className="link-line kicker w-16 text-right"
          >
            {expanded ? "Close" : "Expand"}
          </button>
        </div>
      </div>
    </div>
  );
}
