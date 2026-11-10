"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("index");
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (pathname === "/") {
        const marker = window.scrollY + 96;
        let current = "index";
        for (const id of ["work", "about", "contact"]) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= marker) current = id;
        }
        setActive((prev) => (prev === current ? prev : current));
      }

      const headerLine = 80;
      let dark = false;
      document.querySelectorAll("[data-header-theme='dark']").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < headerLine && rect.bottom > 12) dark = true;
      });
      setOverDark((prev) => (prev === dark ? prev : dark));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const hrefFor = (hash: string) =>
    pathname === "/" ? hash : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${hash}`;

  const isActive = (id: string) => {
    if (pathname.startsWith("/work")) return id === "work";
    if (pathname.startsWith("/about")) return id === "about";
    if (pathname !== "/") return false;
    return active === id;
  };

  const darkHeader = overDark && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        darkHeader
          ? "border-paper/15 bg-dark text-paper"
          : "border-ink/10 bg-paper text-ink"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1680px] items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-12">
        <Link href="/" className="kicker font-medium">
          Alex.
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.id} href={hrefFor(item.hash)} className="kicker">
              <span className="link-line" data-active={isActive(item.id) ? "true" : "false"}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="kicker md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="site-menu"
            aria-label="Mobile"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pt-24 text-ink sm:px-8 md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.hash)}
                    className="block py-1 font-medium uppercase leading-[0.92] tracking-[-0.045em] text-[clamp(3rem,14vw,4.75rem)]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="kicker mt-auto pb-10 text-muted">
              Interdisciplinary creative, New York City
            </p>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
