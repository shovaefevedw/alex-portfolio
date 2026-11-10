"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { birdById, readingOrder, type BirdImage } from "@/data/birds";

type ViewerContextValue = {
  open: (id: string) => void;
};

const ViewerContext = createContext<ViewerContextValue | null>(null);

export function useViewer() {
  const value = useContext(ViewerContext);
  if (!value) {
    throw new Error("Photographs must be opened from inside ImageViewer.");
  }
  return value;
}

export function ImageViewer({ children }: { children: ReactNode }) {
  const order = useMemo(() => readingOrder(), []);
  const [current, setCurrent] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image: BirdImage | null = current ? birdById[current] : null;
  const index = current ? order.indexOf(current) : -1;

  const open = useCallback((id: string) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setCurrent(id);
  }, []);

  const close = useCallback(() => {
    setCurrent(null);
    opener.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setCurrent((id) => {
        if (!id) return id;
        const at = order.indexOf(id);
        return order[(at + delta + order.length) % order.length];
      });
    },
    [order],
  );

  useEffect(() => {
    const root = document.documentElement;
    const measure = () => {
      root.style.setProperty("--scrollbar", `${window.innerWidth - root.clientWidth}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--scrollbar");
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const parked = Array.from(document.querySelectorAll<HTMLElement>("header, #content, footer"));
    parked.forEach((node) => {
      node.inert = true;
    });
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      parked.forEach((node) => {
        node.inert = false;
      });
      window.removeEventListener("keydown", onKey);
    };
  }, [current, close, step]);

  const label = String(index + 1).padStart(2, "0");
  const total = String(order.length).padStart(2, "0");

  return (
    <ViewerContext.Provider value={{ open }}>
      {children}
      {image ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-[80] flex flex-col bg-dark text-paper"
        >
          <div className="flex items-center justify-between px-[max(1.25rem,5vw)] py-5">
            <p className="kicker text-mist">
              {label} / {total}
            </p>
            <button ref={closeRef} type="button" onClick={close} className="link-line kicker">
              Close
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <Image
              src={image.src}
              alt=""
              fill
              sizes="92vw"
              quality={90}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-between px-[max(1.25rem,5vw)] py-5">
            <button type="button" onClick={() => step(-1)} className="link-line kicker">
              Previous
            </button>
            <button type="button" onClick={() => step(1)} className="link-line kicker">
              Next
            </button>
          </div>
        </div>
      ) : null}
    </ViewerContext.Provider>
  );
}
