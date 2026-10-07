import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({ locale, key: "contact", path: "/contact", description: t("intro") });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} text={t("intro")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("contact") }]} />
      </PageHero>
      <section className="container-luxe grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Suspense fallback={<div className="h-[600px] border border-line bg-coal" />}>
            <AppointmentForm />
          </Suspense>
        </div>
        <aside className="space-y-12 lg:col-span-4">
          <Reveal>
            <p className="eyebrow mb-5">{t("directTitle")}</p>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block font-serif text-3xl text-ivory transition-colors hover:text-gold-soft">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-2 block text-ivory/70 transition-colors hover:text-gold-soft">
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">{t("hoursTitle")}</p>
            <p className="leading-relaxed text-ivory/65">{t("hoursText")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="eyebrow mb-5">ORVANE Genève</p>
            <address className="not-italic leading-relaxed text-ivory/65">
              {site.address.street}
              <br />
              {site.address.city}
              <br />
              {site.address.country}
            </address>
            <Link href="/boutiques" className="mt-4 inline-block text-[0.68rem] uppercase tracking-[0.25em] text-gold hover:text-gold-soft">
              {nav("boutiques")} →
            </Link>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/faq" className="group block border border-line p-6 transition-colors hover:border-gold/50">
              <p className="eyebrow">{nav("faq")}</p>
              <p className="mt-3 font-serif text-2xl text-ivory group-hover:text-gold-soft">→</p>
            </Link>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
