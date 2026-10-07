"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { collections, metals, watches, type CollectionId, type MetalId } from "@/data/watches";
import { WatchCard } from "./WatchCard";
import { cn, tr } from "@/lib/utils";

type Size = "all" | "small" | "medium" | "large";
type Sort = "featured" | "priceAsc" | "priceDesc" | "size";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "whitespace-nowrap border px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] transition-all duration-300",
        active ? "border-gold bg-gold text-ink" : "border-line text-ivory/70 hover:border-gold/60 hover:text-ivory",
      )}
    >
      {children}
    </button>
  );
}

export function CollectionGrid() {
  const t = useTranslations("collections");
  const locale = useLocale();
  const params = useSearchParams();
  const initial = params.get("collection");
  const [collection, setCollection] = useState<CollectionId | "all">(
    initial && initial in collections ? (initial as CollectionId) : "all",
  );
  const [metal, setMetal] = useState<MetalId | "all">("all");
  const [size, setSize] = useState<Size>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const usedMetals = useMemo(() => Array.from(new Set(watches.map((w) => w.look.metal))), []);

  const results = useMemo(() => {
    const list = watches.filter((w) => {
      if (collection !== "all" && w.collection !== collection) return false;
      if (metal !== "all" && w.look.metal !== metal) return false;
      if (size === "small" && w.diameter > 38) return false;
      if (size === "medium" && (w.diameter < 39 || w.diameter > 40)) return false;
      if (size === "large" && w.diameter < 41) return false;
      return true;
    });
    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (sort === "size") list.sort((a, b) => a.diameter - b.diameter);
    return list;
  }, [collection, metal, size, sort]);

  const reset = () => {
    setCollection("all");
    setMetal("all");
    setSize("all");
    setSort("featured");
  };

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-4 border-y border-line bg-ink/85 px-4 py-5 backdrop-blur-xl md:mx-0 md:px-0">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
          <div className="flex min-w-0 max-w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
            <fieldset className="flex items-center gap-3 overflow-x-auto pb-1 xl:pb-0">
              <legend className="sr-only">{t("filterCollection")}</legend>
              <span className="mr-1 shrink-0 text-[0.62rem] uppercase tracking-[0.25em] text-stone">{t("filterCollection")}</span>
              <Chip active={collection === "all"} onClick={() => setCollection("all")}>
                {t("all")}
              </Chip>
              {(Object.keys(collections) as CollectionId[]).map((id) => (
                <Chip key={id} active={collection === id} onClick={() => setCollection(id)}>
                  {collections[id].name}
                </Chip>
              ))}
            </fieldset>
            <fieldset className="flex items-center gap-3 overflow-x-auto pb-1 xl:pb-0">
              <legend className="sr-only">{t("filterSize")}</legend>
              <span className="mr-1 shrink-0 text-[0.62rem] uppercase tracking-[0.25em] text-stone">{t("filterSize")}</span>
              {(["all", "small", "medium", "large"] as Size[]).map((s) => (
                <Chip key={s} active={size === s} onClick={() => setSize(s)}>
                  {s === "all" ? t("all") : t(`size${s.charAt(0).toUpperCase()}${s.slice(1)}` as "sizeSmall")}
                </Chip>
              ))}
            </fieldset>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.25em] text-stone">
              {t("filterMetal")}
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value as MetalId | "all")}
                className="border border-line bg-ink px-3 py-2 text-[0.7rem] normal-case tracking-normal text-ivory focus:border-gold focus:outline-none"
              >
                <option value="all">{t("all")}</option>
                {usedMetals.map((m) => (
                  <option key={m} value={m}>
                    {tr(metals[m].label, locale)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.25em] text-stone">
              {t("sort")}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border border-line bg-ink px-3 py-2 text-[0.7rem] normal-case tracking-normal text-ivory focus:border-gold focus:outline-none"
              >
                <option value="featured">{t("sortFeatured")}</option>
                <option value="priceAsc">{t("sortPriceAsc")}</option>
                <option value="priceDesc">{t("sortPriceDesc")}</option>
                <option value="size">{t("sortSize")}</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-stone" aria-live="polite">
        {t("results", { count: results.length })}
      </p>

      {results.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-serif text-3xl text-ivory/80">{t("empty")}</p>
          <button type="button" onClick={reset} className="mt-8 text-[0.7rem] uppercase tracking-[0.25em] text-gold underline underline-offset-8">
            {t("reset")}
          </button>
        </div>
      ) : (
        <motion.ul layout className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((w, i) => (
              <motion.li
                key={w.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <WatchCard watch={w} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
