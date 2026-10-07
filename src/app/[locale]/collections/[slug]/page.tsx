import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { collections, getWatch, metals, straps, watches } from "@/data/watches";
import { ProductConfigurator } from "@/components/sections/ProductConfigurator";
import { WatchCard } from "@/components/sections/WatchCard";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { tr } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => watches.map((w) => ({ locale, slug: w.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/collections/[slug]">) {
  const { locale, slug } = await params;
  const watch = getWatch(slug);
  if (!watch) return {};
  return pageMetadata({
    locale,
    path: `/collections/${slug}`,
    title: watch.name,
    description: tr(watch.description, locale).slice(0, 158),
    image: img(watch.images[0], 1200),
  });
}

export default async function WatchPage({ params }: PageProps<"/[locale]/collections/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const watch = getWatch(slug);
  if (!watch) notFound();

  const t = await getTranslations("product");
  const nav = await getTranslations("nav");
  const manual = watch.calibre.includes("MANUEL");
  const related = watches.filter((w) => w.collection === watch.collection && w.slug !== watch.slug);
  const fallbackRelated = related.length ? related : watches.filter((w) => w.slug !== watch.slug).slice(0, 2);

  const specs = [
    { label: t("diameter"), value: t("mm", { count: watch.diameter }) },
    { label: t("thickness"), value: t("mm", { count: watch.thickness }) },
    { label: t("water"), value: t("meters", { count: watch.waterResistance }) },
    { label: t("reserve"), value: t("hours", { count: watch.powerReserve }) },
    { label: t("calibre"), value: watch.calibre },
    { label: t("frequency"), value: watch.frequency },
    { label: t("jewels"), value: String(watch.jewels) },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: watch.name,
    sku: watch.reference,
    brand: { "@type": "Brand", name: site.fullName },
    description: tr(watch.description, locale),
    image: watch.images.map((i) => img(i, 1200)),
    offers: { "@type": "Offer", priceCurrency: "CHF", price: watch.price, availability: "https://schema.org/InStoreOnly" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-luxe pb-24 pt-32 md:pt-36">
        <div className="mb-10">
          <Breadcrumbs
            items={[
              { label: nav("home"), href: "/" },
              { label: nav("collections"), href: "/collections" },
              { label: collections[watch.collection].name, href: `/collections?collection=${watch.collection}` },
              { label: watch.name },
            ]}
          />
        </div>
        <ProductConfigurator watch={watch} />
      </section>

      <section className="border-t border-line bg-coal py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t("specs")} title={watch.reference} />
            <dl className="mt-12 divide-y divide-line border-y border-line">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="text-ivory/55">{s.label}</dt>
                  <dd className="text-right text-ivory">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Accordion
              defaultOpen={0}
              items={[
                {
                  title: t("movementTitle"),
                  content: t("movementText", {
                    calibre: watch.calibre,
                    type: manual ? t("manual") : t("automatic"),
                    jewels: watch.jewels,
                    frequency: watch.frequency,
                  }),
                },
                {
                  title: t("caseTitle"),
                  content: t("caseText", {
                    metal: tr(metals[watch.look.metal].label, locale),
                    diameter: watch.diameter,
                    thickness: watch.thickness,
                    water: watch.waterResistance,
                  }),
                },
                { title: t("strapTitle"), content: t("strapText", { strap: tr(straps[watch.look.strap].label, locale) }) },
                { title: t("warrantyTitle"), content: t("warrantyText") },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("galleryTitle")} title={tr(watch.tagline, locale)} />
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            <ParallaxImage src={img(watch.images[1], 1800)} alt={watch.name} className="aspect-[4/3] md:col-span-8" sizes="(min-width: 768px) 66vw, 100vw" />
            <div className="grid gap-6 md:col-span-4">
              <Reveal className="relative aspect-square overflow-hidden md:aspect-auto md:h-full">
                <Image src={img(watch.images[0], 900)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </Reveal>
              <Reveal delay={0.1} className="relative aspect-square overflow-hidden md:aspect-auto md:h-full">
                <Image src={img(watch.images[2], 900)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow={collections[watch.collection].name} title={t("relatedTitle")} />
          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackRelated.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.08}>
                <WatchCard watch={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
