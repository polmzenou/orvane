"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { collections, watches, type CollectionId } from "@/data/watches";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { img } from "@/lib/images";
import { cn, tr } from "@/lib/utils";

const order: CollectionId[] = ["celeste", "heritage", "abysse"];

export function CollectionsShowcase() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="container-luxe py-24 md:py-36">
      <SectionHeading eyebrow={t("collectionsEyebrow")} title={t("collectionsTitle")} />
      <div className="mt-20 space-y-28 md:space-y-40">
        {order.map((id, i) => {
          const col = collections[id];
          const first = watches.find((w) => w.collection === id)!;
          const count = watches.filter((w) => w.collection === id).length;
          const reverse = i % 2 === 1;
          return (
            <article key={id} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <Link
                href={`/collections?collection=${id}`}
                className={cn("group relative block md:col-span-7", reverse && "md:order-2")}
                data-cursor="hover"
              >
                <ParallaxImage
                  src={img(col.image, 1600)}
                  alt={col.name}
                  className="aspect-[4/3] w-full transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[0.98]"
                  sizes="(min-width: 768px) 58vw, 100vw"
                />
                <span className="absolute bottom-6 left-6 font-serif text-[5rem] leading-none text-ivory/90 md:text-[8rem]">0{i + 1}</span>
              </Link>
              <div className={cn("md:col-span-5", reverse && "md:order-1")}>
                <Reveal>
                  <p className="eyebrow mb-5">
                    {count} {locale === "en" ? "references" : "références"}
                  </p>
                  <h3 className="display text-6xl text-ivory md:text-7xl">{col.name}</h3>
                  <p className="mt-4 font-serif text-2xl italic text-gold-soft">{tr(col.tagline, locale)}</p>
                  <p className="mt-8 max-w-md leading-relaxed text-ivory/60">{tr(col.description, locale)}</p>
                  <div className="mt-10 flex flex-wrap items-center gap-8">
                    <Link
                      href={`/collections?collection=${id}`}
                      className="group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-ivory"
                    >
                      <span className="relative">
                        {c("viewCollection")}
                        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                      </span>
                    </Link>
                    <Link href={`/collections/${first.slug}`} className="text-[0.7rem] uppercase tracking-[0.28em] text-stone transition-colors hover:text-gold">
                      {first.name}
                    </Link>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
