"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { watches } from "@/data/watches";
import { WatchCard } from "@/components/sections/WatchCard";
import { ButtonLink } from "@/components/ui/Button";

/** Draggable rail of watches with arrow controls. */
export function SignatureCarousel() {
  const c = useTranslations("common");
  const locale = useLocale();
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return;
      const overflow = track.current.scrollWidth - viewport.current.clientWidth;
      setBounds({ left: -Math.max(0, overflow), right: 0 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const step = (dir: 1 | -1) => {
    const card = track.current?.firstElementChild as HTMLElement | null;
    const w = card ? card.offsetWidth + 32 : 400;
    const next = Math.min(bounds.right, Math.max(bounds.left, x.get() - dir * w));
    animate(x, next, { type: "spring", stiffness: 120, damping: 22 });
  };

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="container-luxe mb-14 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            {c("allWatches")}
          </p>
          <h2 className="display text-4xl text-ivory md:text-6xl">
            {watches.length} <span className="italic text-gold-soft">{locale === "en" ? "references" : "références"}</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={c("previous")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={c("next")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            →
          </button>
          <ButtonLink href="/collections" variant="ghost" className="ml-4 hidden sm:inline-flex">
            {c("explore")}
          </ButtonLink>
        </div>
      </div>
      <div ref={viewport} className="container-luxe">
        <motion.div
          ref={track}
          className="flex cursor-grab gap-8 active:cursor-grabbing"
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.08}
          style={{ x }}
          data-cursor="drag"
        >
          {watches.map((w) => (
            <div key={w.slug} className="w-[78vw] shrink-0 sm:w-[44vw] lg:w-[27vw]" onDragStart={(e) => e.preventDefault()}>
              <WatchCard watch={w} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
