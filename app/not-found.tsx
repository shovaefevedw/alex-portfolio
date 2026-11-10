import Link from "next/link";
import { Frame } from "@/components/Frame";

export default function NotFound() {
  return (
    <main id="content" className="flex min-h-[100svh] flex-col justify-end px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <Frame className="!px-0">
        <p className="kicker text-muted">404</p>
        <h1 className="mt-5 max-w-[10ch] text-[clamp(3rem,8vw,6.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em]">
          This page isn&apos;t here.
        </h1>
        <Link href="/" className="link-line kicker mt-10 inline-block">
          Back to index
        </Link>
      </Frame>
    </main>
  );
}
