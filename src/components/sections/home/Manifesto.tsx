"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export function Manifesto() {
  const t = useTranslations("home");
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = t("introTitle").split(" ");

  return (
    <section className="container-luxe py-28 md:py-44">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            {t("introEyebrow")}
          </p>
        </Reveal>
        <div className="lg:col-span-9">
          <p ref={ref} className="display text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl lg:text-7xl" aria-label={t("introTitle")}>
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-xl text-base leading-relaxed text-ivory/60 md:ml-auto md:text-lg">{t("introText")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
