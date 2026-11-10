import Image from "next/image";
import { sticky } from "@/data/sticky";

export function SelectedFrames() {
  const [first, second, third, last] = sticky.frames;
  if (!first || !second || !third || !last) return null;

  return (
    <section aria-labelledby="frames" className="mt-16 md:mt-20">
      <h2 id="frames" className="kicker text-[#999999]">
        03 / Selected Frames
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        <Image
          src={first.src}
          alt={first.alt}
          width={first.width}
          height={first.height}
          sizes="(min-width: 1440px) 1280px, 92vw"
          className="h-auto w-full"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[second, third].map((frame) => (
            <Image
              key={frame.src}
              src={frame.src}
              alt={frame.alt}
              width={frame.width}
              height={frame.height}
              sizes="(min-width: 1440px) 640px, 92vw"
              className="h-auto w-full"
            />
          ))}
        </div>
        <Image
          src={last.src}
          alt={last.alt}
          width={last.width}
          height={last.height}
          sizes="(min-width: 1440px) 1280px, 92vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
