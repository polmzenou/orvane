import { getTranslations } from "next-intl/server";
import { getLegal, type LegalKey } from "@/data/legal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/Section";
import { LegalDocument } from "./LegalDocument";

export async function LegalPage({ docKey, locale }: { docKey: LegalKey; locale: string }) {
  const meta = await getTranslations("meta");
  const nav = await getTranslations("nav");
  const doc = getLegal(docKey, locale);
  return (
    <>
      <PageHero eyebrow="ORVANE Genève SA" title={meta(docKey)}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: meta(docKey) }]} />
      </PageHero>
      <section className="container-luxe pb-32">
        <LegalDocument doc={doc} />
      </section>
    </>
  );
}
