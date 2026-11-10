"use client";

import Image from "next/image";
import { Photograph } from "@/components/birds/Photograph";
import { useViewer } from "@/components/birds/ImageViewer";
import { birdById, type BirdPair } from "@/data/birds";

const photoWidth = {
  s: "w-[18%]",
  m: "w-[26%]",
  l: "w-[34%]",
} as const;

const photoSizes = {
  s: "18vw",
  m: "26vw",
  l: "34vw",
} as const;

const photoNudge = ["", "translate-y-3", "-translate-y-2", "translate-y-5"] as const;

export function TextPhoto({
  pair,
  index,
  priority = false,
}: {
  pair: BirdPair;
  index: number;
  priority?: boolean;
}) {
  const photo = (
    <div className={`${photoWidth[pair.size]} shrink-0 ${photoNudge[index % photoNudge.length]}`}>
      <Photograph id={pair.image} sizes={photoSizes[pair.size]} priority={priority} />
    </div>
  );
  const text = <p className="max-w-[32ch] text-[0.95rem] leading-[1.55]">{pair.text}</p>;
  const inset =
    pair.place === "left"
      ? ["", "pl-[5%]", "pl-[11%]", "pl-[2%]"][index % 4]
      : ["", "pr-[6%]", "pr-[12%]", "pr-[3%]"][index % 4];

  return (
    <div className={`flex items-center gap-6 ${pair.place === "right" ? "justify-end" : ""} ${inset}`}>
      {pair.place === "right" ? (
        <>
          {text}
          {photo}
        </>
      ) : (
        <>
          {photo}
          {text}
        </>
      )}
    </div>
  );
}

export function PhotoTiles({ ids }: { ids: string[] }) {
  const { open } = useViewer();

  return (
    <ul className="mt-6 grid grid-cols-8 gap-1">
      {ids.map((id) => {
        const image = birdById[id];
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => open(id)}
              aria-label={`View photograph: ${image.alt}`}
              className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden"
            >
              <Image src={image.src} alt="" fill sizes="12vw" className="object-cover" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
