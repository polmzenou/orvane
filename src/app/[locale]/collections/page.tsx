import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/collections">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  return pageMetadata({ locale, key: "collections", path: "/collections", description: t("intro") });
}

export default async function CollectionsPage({ params }: PageProps<"/[locale]/collections">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("collections");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("collections") }]} />
      </PageHero>
      <section className="container-luxe pb-32">
        <Suspense fallback={<div className="h-40" />}>
          <CollectionGrid />
        </Suspense>
      </section>
      <CtaBand />
    </>
  );
}
