"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Block, LegalDoc } from "@/data/legal";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

function renderBlock(block: Block, key: number) {
  if (typeof block === "string") return <p key={key}>{block}</p>;
  if ("list" in block)
    return (
      <ul key={key}>
        {block.list.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    );
  const [head, ...rows] = block.table;
  return (
    <div key={key} className="overflow-x-auto" data-lenis-prevent>
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const lenis = useLenis();
  const [active, setActive] = useState(doc.sections[0]?.id);
  const updated = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { dateStyle: "long" }).format(new Date(doc.updated));

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.3;
        let current = els[0]?.id;
        for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
        if (current) setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [doc.sections]);

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <nav aria-label={t("summary")} className="lg:sticky lg:top-28">
          <p className="eyebrow mb-6">{t("summary")}</p>
          <ol className="space-y-1 border-l border-line">
            {doc.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    if (!lenis) return;
                    e.preventDefault();
                    lenis.scrollTo(`#${s.id}`, { offset: -110 });
                    history.replaceState(null, "", `#${s.id}`);
                  }}
                  className={cn(
                    "-ml-px block border-l py-2 pl-5 text-sm transition-colors",
                    active === s.id ? "border-gold text-ivory" : "border-transparent text-ivory/50 hover:text-ivory/80",
                  )}
                >
                  <span className="mr-2 font-serif text-gold/70">{i + 1}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <div className="lg:col-span-8 lg:col-start-5">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">{t("updated", { date: updated })}</p>
        <div className="prose-luxe mt-8">
          <p className="font-serif text-2xl leading-snug text-ivory/90">{doc.intro}</p>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>
                <span className="mr-3 text-gold/60">{i + 1}.</span>
                {s.title}
              </h2>
              {s.blocks.map(renderBlock)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
