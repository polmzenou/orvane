"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { collections, metals, type Watch } from "@/data/watches";
import { img } from "@/lib/images";
import { cn, formatPrice, tr } from "@/lib/utils";

export function WatchCard({ watch, className, priority }: { watch: Watch; className?: string; priority?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <Link href={`/collections/${watch.slug}`} className={cn("group block", className)} data-cursor="hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-coal">
        <Image
          src={img(watch.images[0], 900)}
          alt={watch.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-all duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105 group-hover:opacity-0"
        />
        <Image
          src={img(watch.images[1], 900)}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="scale-110 object-cover opacity-0 transition-all duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-100 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="bg-ink/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold backdrop-blur">
            {collections[watch.collection].name}
          </span>
          {watch.limited && (
            <span className="border border-gold/50 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ivory backdrop-blur">
              {watch.limited} ex.
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-5 right-5 translate-y-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.62rem] uppercase tracking-[0.25em] text-ivory/80">{t("discover")} →</span>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-ivory transition-colors group-hover:text-gold-soft">{watch.name}</h3>
          <p className="mt-1 text-xs text-stone">
            {tr(metals[watch.look.metal].label, locale)} · {watch.diameter} mm
          </p>
        </div>
        <p className="shrink-0 text-sm text-ivory/80">{formatPrice(watch.price, locale)}</p>
      </div>
    </Link>
  );
}
