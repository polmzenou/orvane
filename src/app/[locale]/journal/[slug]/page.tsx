import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { articles, getArticle } from "@/data/content";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ReadingProgress } from "@/components/sections/ReadingProgress";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { tr } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/journal/${slug}`,
    title: tr(article.title, locale),
    description: tr(article.excerpt, locale),
    image: img(article.image, 1200),
  });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations("journal");
  const c = await getTranslations("common");
  const nav = await getTranslations("nav");
  const body = locale === "en" ? article.body.en : article.body.fr;
  const more = articles.filter((a) => a.slug !== slug).slice(0, 2);
  const date = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(article.date),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tr(article.title, locale),
    datePublished: article.date,
    image: img(article.image, 1200),
    publisher: { "@type": "Organization", name: site.fullName },
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <article>
        <header className="container-luxe pb-14 pt-36 md:pt-44">
          <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: nav("journal"), href: "/journal" }, { label: tr(article.category, locale) }]} />
          <div className="mt-10 flex flex-wrap items-center gap-4 text-[0.65rem] uppercase tracking-[0.25em] text-stone">
            <span className="text-gold">{tr(article.category, locale)}</span>
            <span className="h-px w-6 bg-line" />
            <time dateTime={article.date}>{date}</time>
            <span className="h-px w-6 bg-line" />
            <span>{c("minRead", { count: article.readTime })}</span>
          </div>
          <h1 className="display mt-8 max-w-5xl text-5xl text-ivory md:text-7xl lg:text-8xl">{tr(article.title, locale)}</h1>
          <p className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-gold-soft">{tr(article.excerpt, locale)}</p>
        </header>
        <ParallaxImage src={img(article.image, 2400)} alt="" className="h-[70vh] min-h-[380px] w-full" priority strength={12} />
        <div className="container-luxe py-20 md:py-28">
          <div className="prose-luxe mx-auto max-w-2xl text-[1.06rem]">
            {body.map((p, i) => (
              <Reveal key={i} y={20}>
                <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold" : undefined}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl items-center justify-between border-t border-line pt-8">
            <ButtonLink href="/journal" variant="ghost">
              ← {t("back")}
            </ButtonLink>
            <span className="font-serif text-xl italic text-stone">ORVANE</span>
          </div>
        </div>
      </article>
      <section className="border-t border-line bg-coal py-24">
        <div className="container-luxe">
          <p className="eyebrow mb-12">{t("more")}</p>
          <div className="grid gap-16 md:grid-cols-2">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
