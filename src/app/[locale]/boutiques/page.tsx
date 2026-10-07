import { getTranslations, setRequestLocale } from "next-intl/server";
import { BoutiqueExplorer } from "@/components/sections/BoutiqueExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PageHero } from "@/components/ui/Section";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/boutiques">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boutiques" });
  return pageMetadata({ locale, key: "boutiques", path: "/boutiques", description: t("intro") });
}

export default async function BoutiquesPage({ params }: PageProps<"/[locale]/boutiques">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("boutiques");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("boutiques") }]} />
      </PageHero>
      <section className="container-luxe pb-28">
        <BoutiqueExplorer />
      </section>
      <ParallaxImage src={img("salon", 2400)} alt="" className="h-[60vh] min-h-[360px] w-full" strength={14} />
    </>
  );
}
