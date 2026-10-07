import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { img, type ImageKey } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const stepImages: ImageKey[] = ["hourglass", "watchStones", "watchDark", "watchVintage", "watchChrono", "watchBlueSun"];

export async function generateMetadata({ params }: PageProps<"/[locale]/savoir-faire">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "craft" });
  return pageMetadata({ locale, key: "craft", path: "/savoir-faire", description: t("intro") });
}

export default async function CraftPage({ params }: PageProps<"/[locale]/savoir-faire">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("craft");
  const nav = await getTranslations("nav");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("craft") }]} />
      </PageHero>

      <Marquee items={t.raw("crafts") as string[]} />

      <section className="container-luxe py-24 md:py-36">
        <ol className="space-y-24 md:space-y-36">
          {steps.map((s, i) => (
            <li key={s.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <Reveal className={cn("relative aspect-[5/4] overflow-hidden md:col-span-6", i % 2 && "md:order-2 md:col-start-7")}>
                <Image src={img(stepImages[i], 1200)} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-5 top-5 bg-ink/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
              </Reveal>
              <Reveal delay={0.15} className={cn("md:col-span-5", i % 2 ? "md:order-1" : "md:col-start-8")}>
                <span className="display block text-[6rem] leading-none text-ivory/[0.06] md:text-[9rem]">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="-mt-10 font-serif text-4xl text-ivory md:-mt-14 md:text-5xl">{s.title}</h2>
                <p className="mt-6 max-w-md leading-relaxed text-ivory/65">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-coal py-24 md:py-36">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={t("compareEyebrow")} title={t("compareTitle")} text={t("compareText")} />
          </div>
          <Reveal className="lg:col-span-8">
            <BeforeAfter
              before={img("watchDark", 1600)}
              after={img("watchDark", 1600)}
              beforeLabel={t("before")}
              afterLabel={t("after")}
              alt={t("compareTitle")}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
