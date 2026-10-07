"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { boutiques } from "@/data/content";
import { cn, tr } from "@/lib/utils";

const W = 1000;
const H = 520;
// Cropped equirectangular frame around the salons (lon -95..155, lat 66..-12).
const LON0 = -95;
const LON1 = 155;
const LAT0 = 66;
const LAT1 = -12;
const project = (lat: number, lon: number) => ({
  x: ((lon - LON0) / (LON1 - LON0)) * W,
  y: ((LAT0 - lat) / (LAT0 - LAT1)) * H,
});

/** Constellation-style map: each salon is a star linked to Geneva. */
export function BoutiqueExplorer() {
  const t = useTranslations("boutiques");
  const locale = useLocale();
  const [active, setActive] = useState(boutiques[0].id);
  const origin = project(boutiques[0].lat, boutiques[0].lon);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden border border-line bg-[radial-gradient(ellipse_at_center,#17150f_0%,#0b0b0c_75%)] lg:sticky lg:top-28">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={t("mapLabel")}>
            <defs>
              <radialGradient id="star-glow">
                <stop offset="0%" stopColor="#e6d3a3" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e6d3a3" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* graticule */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v${i}`} x1={(i * W) / 10} x2={(i * W) / 10} y1={0} y2={H} stroke="#2a2926" strokeWidth={0.6} />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} y1={(i * H) / 6} y2={(i * H) / 6} x1={0} x2={W} stroke="#2a2926" strokeWidth={0.6} />
            ))}
            <line x1={0} x2={W} y1={project(0, 0).y} y2={project(0, 0).y} stroke="#9c7c43" strokeOpacity={0.4} strokeDasharray="2 6" />
            <text x={8} y={project(0, 0).y - 8} fill="#9c7c43" fontSize={11} letterSpacing={3} opacity={0.6}>
              0°
            </text>
            {/* background stars */}
            {Array.from({ length: 140 }).map((_, i) => (
              <circle key={i} cx={(i * 373) % W} cy={(i * 197) % H} r={((i * 7) % 3) * 0.35 + 0.3} fill="#f3eee4" opacity={0.08 + ((i * 13) % 10) / 40} />
            ))}
            {/* arcs from Geneva */}
            {boutiques.slice(1).map((b, i) => {
              const p = project(b.lat, b.lon);
              const mx = (origin.x + p.x) / 2;
              const my = Math.min(origin.y, p.y) - Math.abs(p.x - origin.x) * 0.25 - 20;
              const on = active === b.id;
              return (
                <motion.path
                  key={b.id}
                  d={`M${origin.x},${origin.y} Q${mx},${my} ${p.x},${p.y}`}
                  fill="none"
                  stroke={on ? "#e6d3a3" : "#c9a86a"}
                  strokeOpacity={on ? 1 : 0.4}
                  strokeWidth={on ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
            {boutiques.map((b) => {
              const p = project(b.lat, b.lon);
              const on = active === b.id;
              return (
                <g key={b.id} className="cursor-pointer" onClick={() => setActive(b.id)}>
                  <circle cx={p.x} cy={p.y} r={on ? 30 : 16} fill="url(#star-glow)" opacity={on ? 0.8 : 0.45} />
                  <circle cx={p.x} cy={p.y} r={on ? 6 : 4} fill={b.flagship ? "#e6d3a3" : "#c9a86a"} />
                  {on && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={8}
                      fill="none"
                      strokeWidth={1.5}
                      stroke="#e6d3a3"
                      initial={{ r: 4, opacity: 1 }}
                      animate={{ r: 36, opacity: 0 }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}
                  <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
                  {(on || b.flagship) && (
                    <text
                      x={p.x + (p.x > W * 0.8 ? -14 : 14)}
                      y={p.y - 14}
                      textAnchor={p.x > W * 0.8 ? "end" : "start"}
                      fill={on ? "#f3eee4" : "#8a8580"}
                      fontSize={on ? 30 : 20}
                      fontFamily="var(--font-cormorant), serif"
                    >
                      {tr(b.city, locale)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <ul className="space-y-3 lg:col-span-5">
        {boutiques.map((b) => {
          const on = active === b.id;
          return (
            <li key={b.id}>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={on}
                onMouseEnter={() => setActive(b.id)}
                onFocus={() => setActive(b.id)}
                onClick={() => setActive(b.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(b.id)}
                className={cn(
                  "block border p-6 text-left transition-all duration-500",
                  on ? "border-gold/60 bg-coal" : "border-line hover:border-stone",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.25em] text-stone">{tr(b.country, locale)}</p>
                    <h3 className="mt-1 font-serif text-3xl text-ivory">{tr(b.city, locale)}</h3>
                  </div>
                  {b.flagship && (
                    <span className="border border-gold/50 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold">{t("flagship")}</span>
                  )}
                </div>
                <motion.div initial={false} animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }} className="overflow-hidden">
                  <p className="mt-4 text-sm text-ivory/70">{b.address}</p>
                  <p className="mt-1 text-sm text-ivory/50">{tr(b.hours, locale)}</p>
                  <div className="mt-5 flex flex-wrap gap-5 text-[0.65rem] uppercase tracking-[0.22em]">
                    <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-gold hover:text-gold-soft">
                      {t("call")}
                    </a>
                    <a
                      href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(b.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-soft"
                    >
                      {t("directions")} ↗
                    </a>
                    <Link href={`/contact?boutique=${b.id}`} className="text-gold hover:text-gold-soft">
                      {t("book")}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
