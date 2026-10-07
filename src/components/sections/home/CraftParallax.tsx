"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/Section";
import { img } from "@/lib/images";

export function CraftParallax() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const stats = t.raw("stats") as { value: number; label: string }[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["30%", "-45%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["50%", "-70%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-44">
      <div className="container-luxe grid items-center gap-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("craftEyebrow")} title={t("craftTitle")} text={t("craftText")} />
          <div className="mt-12">
            <ButtonLink href="/savoir-faire" variant="outline">
              {nav("craft")} <Arrow />
            </ButtonLink>
          </div>
        </div>
        <div className="relative h-[560px] md:h-[680px]">
          <motion.div className="absolute left-0 top-0 h-[70%] w-[62%] overflow-hidden" style={reduce ? undefined : { y: y1 }}>
            <Image src={img("watchDark", 1000)} alt="" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 z-10 h-[55%] w-[52%] overflow-hidden border-8 border-ink"
            style={reduce ? undefined : { y: y2 }}
          >
            <Image src={img("watchChrono", 900)} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute right-[8%] top-[6%] z-20 flex h-32 w-32 items-center justify-center rounded-full border border-gold/60 bg-ink/40 backdrop-blur md:h-40 md:w-40"
            style={reduce ? undefined : { y: y3, rotate }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
              <defs>
                <path id="circle-text" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text fill="#c9a86a" fontSize="7.4" letterSpacing="3.2">
                <textPath href="#circle-text">VALLÉE DE JOUX · SWISS MADE · DEPUIS 1891 ·</textPath>
              </text>
            </svg>
            <span className="font-serif text-3xl italic text-ivory">O</span>
          </motion.div>
        </div>
      </div>

      <div className="container-luxe mt-28 grid grid-cols-2 gap-px bg-line md:mt-40 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink p-8 md:p-12">
            <Counter value={s.value} locale={locale} className="display block text-5xl text-gold-soft md:text-7xl" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ivory/55">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
