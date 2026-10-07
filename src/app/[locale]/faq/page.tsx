import { getTranslations, setRequestLocale } from "next-intl/server";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return pageMetadata({ locale, key: "faq", path: "/faq", description: t("intro") });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const nav = await getTranslations("nav");
  const items = t.raw("items") as { q: string; a: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("faq") }]} />
      </PageHero>
      <section className="container-luxe grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Accordion items={items.map((i) => ({ title: i.q, content: i.a }))} defaultOpen={0} />
        </div>
        <div className="lg:col-span-3 lg:col-start-10">
          <div className="border border-line bg-coal p-8 lg:sticky lg:top-28">
            <p className="font-serif text-2xl text-ivory">{nav("contact")}</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/60">{t("intro")}</p>
            <ButtonLink href="/contact" variant="outline" className="mt-8 w-full">
              {nav("appointment")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
