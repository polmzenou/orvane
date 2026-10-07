"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/Reveal";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

function GenevaClock() {
  const locale = useLocale();
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-CH", {
      timeZone: "Europe/Zurich",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [locale]);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

export function Hero() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[10%] h-[70vh] w-[70vh] rounded-full bg-gold/15 blur-[160px]" />
        <div className="absolute bottom-0 left-[-10%] h-[50vh] w-[50vh] rounded-full bg-[#1c2d63]/30 blur-[140px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0H0V80" fill="none" stroke="#c9a86a" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <motion.div className="absolute inset-0 lg:left-[38%]" style={{ y: sceneY, opacity: fade }}>
        <HeroScene />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="container-luxe pointer-events-none relative flex min-h-[100svh] flex-col justify-end pb-24 pt-40 lg:justify-center lg:pb-0"
      >
        <div className="pointer-events-auto max-w-2xl">
          <motion.p
            className="eyebrow mb-8 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="h-px w-12 bg-gold" />
            {t("heroEyebrow")}
          </motion.p>
          <h1 className="display text-[3.2rem] text-ivory sm:text-7xl md:text-8xl xl:text-[7.25rem]">
            <RevealText as="span" text={t("heroTitle1")} immediate delay={0.4} className="block" />
            <RevealText as="span" text={t("heroTitle2")} immediate delay={0.6} className="block italic text-gold-gradient animate-shimmer" />
          </h1>
          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-ivory/65 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {t("heroText")}
          </motion.p>
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <ButtonLink href="/collections">
              {t("heroCta")} <Arrow />
            </ButtonLink>
            <ButtonLink href="/savoir-faire" variant="ghost">
              {t("heroCta2")}
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      <div className="container-luxe pointer-events-none absolute inset-x-0 bottom-8 hidden items-end justify-between text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 md:flex">
        <span className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          {t("heroTime")} · <GenevaClock />
        </span>
        <span className="flex flex-col items-center gap-3">
          {c("scroll")}
          <span className="relative block h-12 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-1/2 w-px bg-gold"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </span>
        <span>46°12′N · 6°09′E</span>
      </div>
    </section>
  );
}
