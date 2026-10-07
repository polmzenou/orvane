"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/data/content";
import { cn, tr } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, [paused]);

  const item = testimonials[index];

  return (
    <section
      className="relative border-y border-line bg-coal py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-luxe text-center">
        <p className="eyebrow mb-12 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold" />
          {t("testimonialsEyebrow")}
          <span className="h-px w-10 bg-gold" />
        </p>
        <div className="relative mx-auto min-h-[300px] max-w-4xl md:min-h-[260px]" aria-live="polite">
          <span aria-hidden="true" className="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[9rem] leading-none text-gold/20">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display text-3xl italic leading-snug text-ivory md:text-5xl">{tr(item.quote, locale)}</blockquote>
              <figcaption className="mt-10 text-sm">
                <span className="text-gold-soft">{item.author}</span>
                <span className="mx-3 text-line">—</span>
                <span className="text-ivory/50">{tr(item.role, locale)}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1} / ${testimonials.length}`}
              aria-current={i === index}
              className="group relative h-6 w-12"
            >
              <span className={cn("absolute inset-x-0 top-1/2 h-px transition-colors", i === index ? "bg-gold" : "bg-line group-hover:bg-stone")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
