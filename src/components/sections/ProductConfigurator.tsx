"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { collections, dialPresets, metals, straps, type MetalId, type StrapId, type Watch } from "@/data/watches";
import { Arrow, Button, ButtonLink } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn, formatPrice, tr } from "@/lib/utils";

const ProductViewer = dynamic(() => import("@/components/three/ProductViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <span className="h-10 w-10 animate-spin rounded-full border border-gold/30 border-t-gold" />
    </div>
  ),
});

const metalOptions: MetalId[] = ["rose-gold", "yellow-gold", "white-gold", "platinum", "steel", "titanium"];
const strapOptions: StrapId[] = ["alligator-black", "alligator-brown", "alligator-navy", "rubber-black", "bracelet"];

function Swatch({ color, active, label, onClick, ring }: { color: string; active: boolean; label: string; onClick: () => void; ring?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn(
        "relative h-10 w-10 rounded-full border transition-all duration-300",
        active ? "scale-110 border-gold" : "border-line hover:border-stone",
      )}
    >
      <span
        className="absolute inset-1 rounded-full"
        style={{
          background: ring
            ? `conic-gradient(from 200deg, ${color}, #ffffff66, ${color}, #00000055, ${color})`
            : `radial-gradient(circle at 35% 30%, #ffffff33, ${color} 60%)`,
        }}
      />
    </button>
  );
}

export function ProductConfigurator({ watch }: { watch: Watch }) {
  const t = useTranslations("product");
  const c = useTranslations("common");
  const locale = useLocale();
  const toast = useToast();
  const [metal, setMetal] = useState<MetalId>(watch.look.metal);
  const [dial, setDial] = useState({ color: watch.look.dial, accent: watch.look.dialAccent, label: tr(watch.dialLabel, locale) });
  const [strap, setStrap] = useState<StrapId>(watch.look.strap);
  const look = { ...watch.look, metal, dial: dial.color, dialAccent: dial.accent, strap };
  const isDefault = metal === watch.look.metal && dial.color === watch.look.dial && strap === watch.look.strap;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="relative lg:col-span-7">
        <div className="relative h-[58vh] min-h-[380px] overflow-hidden border border-line bg-[radial-gradient(circle_at_50%_40%,#1d1a14_0%,#0b0b0c_70%)] lg:sticky lg:top-24 lg:h-[78vh]">
          <ProductViewer look={look} scale={watch.diameter / 40} />
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.25em] text-ivory/50">
            <span>{c("dragToRotate")}</span>
            <span>{watch.reference}</span>
          </div>
          {watch.limited && (
            <span className="absolute left-5 top-5 border border-gold/60 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.25em] text-gold">
              {c("limited", { count: watch.limited })}
            </span>
          )}
        </div>
      </div>

      <div className="lg:col-span-5">
        <p className="eyebrow">{collections[watch.collection].name}</p>
        <motion.h1
          className="display mt-4 text-5xl text-ivory md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {watch.name}
        </motion.h1>
        <p className="mt-4 font-serif text-2xl italic text-gold-soft">{tr(watch.tagline, locale)}</p>
        <p className="mt-8 leading-relaxed text-ivory/65">{tr(watch.description, locale)}</p>

        <div className="mt-10 flex items-baseline justify-between border-y border-line py-6">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.25em] text-stone">{c("reference")}</p>
            <p className="mt-1 text-sm text-ivory">{watch.reference}</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-3xl text-ivory">{formatPrice(watch.price, locale)}</p>
            <p className="mt-1 text-[0.65rem] text-stone">{c("priceOnRequest")}</p>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <p className="eyebrow">{t("configurator")}</p>
          <div>
            <p className="mb-4 flex justify-between text-sm">
              <span className="text-ivory/60">{t("case")}</span>
              <span className="text-ivory">{tr(metals[metal].label, locale)}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {metalOptions.map((m) => (
                <Swatch key={m} ring color={metals[m].color} active={metal === m} label={tr(metals[m].label, locale)} onClick={() => setMetal(m)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 flex justify-between text-sm">
              <span className="text-ivory/60">{t("dial")}</span>
              <span className="text-ivory">{dial.label}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Swatch
                color={watch.look.dial}
                active={dial.color === watch.look.dial}
                label={tr(watch.dialLabel, locale)}
                onClick={() => setDial({ color: watch.look.dial, accent: watch.look.dialAccent, label: tr(watch.dialLabel, locale) })}
              />
              {dialPresets
                .filter((d) => d.color.toLowerCase() !== watch.look.dial.toLowerCase())
                .map((d) => (
                  <Swatch
                    key={d.id}
                    color={d.color}
                    active={dial.color === d.color}
                    label={tr(d.label, locale)}
                    onClick={() => setDial({ color: d.color, accent: d.accent, label: tr(d.label, locale) })}
                  />
                ))}
            </div>
          </div>
          <div>
            <p className="mb-4 flex justify-between text-sm">
              <span className="text-ivory/60">{t("strap")}</span>
              <span className="text-ivory">{tr(straps[strap].label, locale)}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {strapOptions.map((s) => (
                <Swatch
                  key={s}
                  color={straps[s].color || metals[metal].color}
                  ring={straps[s].kind === "metal"}
                  active={strap === s}
                  label={tr(straps[s].label, locale)}
                  onClick={() => setStrap(s)}
                />
              ))}
            </div>
          </div>
          <p className="text-xs leading-relaxed text-stone">{t("configHint")}</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href={`/contact?watch=${watch.slug}`} className="w-full sm:w-auto">
            {t("cta")} <Arrow />
          </ButtonLink>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                toast(t("copied"));
              } catch {
                /* clipboard unavailable */
              }
            }}
          >
            {t("share")}
          </Button>
        </div>
        {!isDefault && (
          <button
            type="button"
            onClick={() => {
              setMetal(watch.look.metal);
              setStrap(watch.look.strap);
              setDial({ color: watch.look.dial, accent: watch.look.dialAccent, label: tr(watch.dialLabel, locale) });
            }}
            className="mt-6 text-[0.65rem] uppercase tracking-[0.25em] text-gold underline-offset-8 hover:underline"
          >
            ↺ {watch.reference}
          </button>
        )}
      </div>
    </div>
  );
}
