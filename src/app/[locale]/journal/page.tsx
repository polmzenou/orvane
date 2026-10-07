import { getTranslations, setRequestLocale } from "next-intl/server";
import { articles } from "@/data/content";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journal" });
  return pageMetadata({ locale, key: "journal", path: "/journal", description: t("intro") });
}

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");
  const nav = await getTranslations("nav");
  const [first, ...rest] = articles;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("journal") }]} />
      </PageHero>
      <section className="container-luxe pb-32">
        <Reveal>
          <ArticleCard article={first} large />
        </Reveal>
        <div className="mt-24 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
