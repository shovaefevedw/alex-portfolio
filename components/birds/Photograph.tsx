"use client";

import Image from "next/image";
import { birdById } from "@/data/birds";
import { useViewer } from "@/components/birds/ImageViewer";

export function Photograph({
  id,
  sizes,
  priority = false,
  className = "",
}: {
  id: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const image = birdById[id];
  const { open } = useViewer();

  return (
    <button
      type="button"
      onClick={() => open(id)}
      aria-label={`View photograph: ${image.alt}`}
      className={`block w-full cursor-zoom-in text-left leading-none ${className}`}
    >
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </button>
  );
}
