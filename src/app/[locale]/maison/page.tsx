import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { HorizontalTimeline } from "@/components/sections/HorizontalTimeline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/maison">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maison" });
  return pageMetadata({ locale, key: "maison", path: "/maison", description: t("intro") });
}

export default async function MaisonPage({ params }: PageProps<"/[locale]/maison">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("maison");
  const nav = await getTranslations("nav");
  const values = t.raw("values") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("maison") }]} />
      </PageHero>

      <ParallaxImage src={img("valley", 2400)} alt="Vallée de Joux" className="h-[70vh] min-h-[420px] w-full" priority strength={15} />

      <section className="container-luxe py-28 md:py-40">
        <figure className="mx-auto max-w-5xl text-center">
          <span aria-hidden="true" className="font-serif text-8xl leading-none text-gold/40">
            “
          </span>
          <RevealText as="p" text={t("quote")} className="display -mt-6 text-4xl italic text-ivory md:text-6xl" stagger={0.04} />
          <Reveal delay={0.3}>
            <figcaption className="mt-10 text-xs uppercase tracking-[0.3em] text-gold">{t("quoteAuthor")}</figcaption>
          </Reveal>
        </figure>
      </section>

      <HorizontalTimeline eyebrow={t("timelineEyebrow")} title={t("timelineTitle")} />

      <section className="container-luxe py-28 md:py-40">
        <SectionHeading eyebrow={t("valuesEyebrow")} title={values.map((v) => v.title).join(" · ")} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="flex h-full flex-col border border-line bg-coal p-8 transition-colors duration-500 hover:border-gold/50">
                  <span className="font-serif text-5xl text-gold/70">0{i + 1}</span>
                  <h3 className="mt-10 font-serif text-3xl text-ivory">{v.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/60">{v.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line py-28 md:py-40">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <div className="relative h-[520px]">
            <ParallaxImage src={img("alps", 1400)} alt="" className="absolute left-0 top-0 h-[78%] w-[80%]" strength={10} sizes="40vw" />
            <Reveal className="absolute bottom-0 right-0 h-[48%] w-[48%] border-8 border-ink" delay={0.2}>
              <Image src={img("hourglass", 800)} alt="" fill sizes="25vw" className="object-cover" />
            </Reveal>
          </div>
          <SectionHeading eyebrow={t("familyEyebrow")} title={t("familyTitle")} text={t("familyText")} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
