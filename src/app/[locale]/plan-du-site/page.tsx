import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { articles } from "@/data/content";
import { watches } from "@/data/watches";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { legalLinks, navLinks } from "@/lib/site";
import { tr } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/plan-du-site">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "sitemap", path: "/plan-du-site" });
}

export default async function SitemapPage({ params }: PageProps<"/[locale]/plan-du-site">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sitemap");
  const nav = await getTranslations("nav");
  const legal = await getTranslations("legalLinks");

  const groups = [
    {
      title: t("main"),
      links: [{ href: "/", label: nav("home") }, ...navLinks.map((l) => ({ href: l.href, label: nav(l.key) })), { href: "/faq", label: nav("faq") }],
    },
    { title: t("watches"), links: watches.map((w) => ({ href: `/collections/${w.slug}`, label: w.name })) },
    { title: t("articles"), links: articles.map((a) => ({ href: `/journal/${a.slug}`, label: tr(a.title, locale) })) },
    { title: t("legal"), links: legalLinks.map((l) => ({ href: l.href, label: legal(l.key) })) },
  ];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")}>
        <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("title") }]} />
      </PageHero>
      <section className="container-luxe grid gap-16 pb-32 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="eyebrow mb-6 border-b border-line pb-4">{g.title}</h2>
            <ul className="space-y-3">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/75 transition-colors hover:text-gold-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
