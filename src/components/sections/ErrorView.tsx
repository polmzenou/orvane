"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const LostTimeScene = dynamic(() => import("@/components/three/LostTimeScene"), { ssr: false });

type Props = {
  code: string;
  title: string;
  text: string;
  mode?: "reverse" | "frozen";
  actions: ReactNode;
};

export function ErrorView({ code, title, text, mode = "reverse", actions }: Props) {
  const nav = useTranslations("nav");
  const e = useTranslations("errors");
  const suggestions = [
    { href: "/collections", label: nav("collections") },
    { href: "/maison", label: nav("maison") },
    { href: "/boutiques", label: nav("boutiques") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pb-20 pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[42vw] leading-none text-ivory/[0.03] md:text-[30vw]">
        {code}
      </div>
      <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="h-px w-10 bg-gold" />
            {code}
          </motion.p>
          <motion.h1
            className="display text-5xl text-ivory sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-8 max-w-lg text-lg leading-relaxed text-ivory/65"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            {text}
          </motion.p>
          <motion.div className="mt-12 flex flex-wrap items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            {actions}
          </motion.div>
          <div className="mt-16 border-t border-line pt-8">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-stone">{e("suggestions")}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="font-serif text-xl italic text-ivory/80 transition-colors hover:text-gold-soft">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-1 h-[42vh] min-h-[300px] lg:order-2 lg:h-[70vh]">
          <LostTimeScene mode={mode} />
        </div>
      </div>
    </section>
  );
}
