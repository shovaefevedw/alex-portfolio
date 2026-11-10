"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { hero } = site;

  return (
    <section id="top" className="flex min-h-[100svh] flex-col pb-7 pt-20 sm:pt-24">
      <Frame className="flex flex-1 flex-col">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <p className="kicker text-muted">{hero.eyebrow}</p>
          <p className="kicker text-muted">{hero.location}</p>
        </div>

        <h1 className="hero-title mt-6 font-medium uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(3.6rem,10.2vw,10.75rem)] sm:mt-8">
          {hero.lines.map((line, index) => (
            <motion.span
              key={line}
              className={`block ${index === hero.lines.length - 1 ? "md:pl-[11vw]" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 + index * 0.1, ease }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="mt-8 grid flex-1 grid-cols-12 items-end gap-x-6 gap-y-8 sm:mt-10">
          <motion.figure
            className="col-span-9 max-w-[420px] sm:col-span-5 lg:col-span-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.42, ease }}
          >
            <Link href={hero.image.href} className="group block">
              <div className="overflow-hidden border border-ink/10">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  priority
                  sizes="(min-width: 1024px) 420px, 70vw"
                  className="media-zoom h-auto max-h-[30vh] w-auto max-w-full"
                />
              </div>
              <span className="link-line kicker mt-3 inline-block text-muted">
                {hero.image.caption}
              </span>
            </Link>
          </motion.figure>

          <motion.p
            className="col-span-12 max-w-[34ch] text-[1.125rem] leading-[1.65] sm:col-span-6 sm:col-start-7 lg:col-span-4 lg:col-start-9"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            {hero.supporting}
          </motion.p>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-ink/15 pt-4 sm:mt-8">
          <p className="kicker text-muted">{hero.status}</p>
          <a href="#work" className="group kicker inline-flex items-center gap-2">
            Scroll to explore
            <span className="nudge-down" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </Frame>
    </section>
  );
}
