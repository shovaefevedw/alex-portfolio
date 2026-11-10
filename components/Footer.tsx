"use client";

import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { Frame } from "@/components/Frame";
import { site } from "@/data/site";

export function Footer() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (pathname === "/work/birds-in-the-cage" || pathname === "/work/eyeball") return null;

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer data-header-theme="dark" className="bg-dark text-paper">
      <Frame className="flex flex-col gap-5 border-t border-paper/15 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="kicker">{site.footer.copyright}</p>
        <p className="kicker text-mist">{site.footer.note}</p>
        <button type="button" onClick={toTop} className="group kicker inline-flex items-center gap-2 self-start sm:self-auto">
          <span className="link-line">Back to top</span>
          <span className="nudge-up" aria-hidden="true">
            ↑
          </span>
        </button>
      </Frame>
    </footer>
  );
}
