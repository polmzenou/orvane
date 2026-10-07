"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const MovementScene = dynamic(() => import("@/components/three/MovementScene"), { ssr: false });

type Step = { title: string; text: string };

/** Sticky scrollytelling: the calibre explodes layer by layer as the reader scrolls. */
export function MovementStory() {
  const t = useTranslations("home");
  const steps = t.raw("movementSteps") as Step[];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  return (
    <section ref={ref} className="relative bg-coal" style={{ height: `${steps.length * 90 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />
        <div className="container-luxe relative grid h-full grid-rows-[auto_1fr_auto] items-center gap-6 py-24 lg:grid-cols-12 lg:grid-rows-1">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              {t("movementEyebrow")}
            </p>
            <h2 className="display text-4xl text-ivory md:text-6xl">{t("movementTitle")}</h2>
            <div className="mt-10 hidden h-1 w-full max-w-xs bg-line lg:block">
              <motion.div className="h-full origin-left bg-gold" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>

          <div className="relative h-full min-h-[300px] lg:col-span-5">
            <MovementScene progress={scrollYProgress} />
          </div>

          <ol className="relative lg:col-span-3">
            {steps.map((s, i) => (
              <li
                key={i}
                className={cn(
                  "transition-all duration-700 ease-[var(--ease-luxe)] lg:mb-8",
                  i === active ? "opacity-100" : "opacity-25",
                  i !== active && "hidden lg:block",
                )}
              >
                <p className="font-serif text-sm text-gold">0{i + 1} / 0{steps.length}</p>
                <h3 className="mt-2 font-serif text-2xl text-ivory md:text-3xl">{s.title}</h3>
                <p className={cn("mt-3 text-sm leading-relaxed text-ivory/65 transition-all duration-700", i === active ? "max-h-40" : "max-h-40 lg:max-h-0 lg:overflow-hidden")}>
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
