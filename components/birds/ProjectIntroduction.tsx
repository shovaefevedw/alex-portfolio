import { TextPhoto } from "@/components/birds/EditorialLayouts";
import { book } from "@/data/birds";

export function ProjectIntroduction() {
  return (
    <header className="pt-24">
      <div className="mx-auto w-full max-w-[1720px] px-[max(1.25rem,5vw)]">
        <p className="kicker text-muted">{book.category}</p>
        <div className="mt-3 flex items-end justify-between gap-8">
          <h1 className="text-[clamp(2.6rem,5.2vw,4.5rem)] font-medium uppercase leading-[0.82] tracking-[-0.05em]">
            Birds in
            <span className="block">the Cage</span>
          </h1>
          <p className="max-w-[14ch] pb-1 text-right text-[clamp(0.95rem,1.45vw,1.25rem)] font-medium uppercase leading-[0.95] tracking-[-0.04em]">
            {book.subtitle}
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-5">
          {book.pairs.map((pair, index) => (
            <TextPhoto key={pair.image} pair={pair} index={index} priority={index === 0} />
          ))}
        </div>
      </div>
    </header>
  );
}
