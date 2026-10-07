import { getTranslations, setRequestLocale } from "next-intl/server";
import { articles } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { CollectionsShowcase } from "@/components/sections/home/CollectionsShowcase";
import { CraftParallax } from "@/components/sections/home/CraftParallax";
import { Hero } from "@/components/sections/home/Hero";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { MovementStory } from "@/components/sections/home/MovementStory";
import { SignatureCarousel } from "@/components/sections/home/SignatureCarousel";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "home" });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const c = await getTranslations("common");

  return (
    <>
      <Hero />
      <Marquee items={t.raw("marquee") as string[]} />
      <Manifesto />
      <CollectionsShowcase />
      <MovementStory />
      <CraftParallax />
      <SignatureCarousel />
      <Testimonials />
      <section className="container-luxe py-28 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={t("journalEyebrow")} title={t("journalTitle")} />
          <ButtonLink href="/journal" variant="ghost">
            {c("explore")}
          </ButtonLink>
        </div>
        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ArticleCard article={articles[0]} large />
          </Reveal>
          <div className="grid gap-14 lg:col-span-5">
            {articles.slice(1, 3).map((a, i) => (
              <Reveal key={a.slug} delay={0.1 * (i + 1)}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
