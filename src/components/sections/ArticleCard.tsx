"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/data/content";
import { img } from "@/lib/images";
import { cn, tr } from "@/lib/utils";

export function ArticleCard({ article, large = false, className }: { article: Article; large?: boolean; className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const date = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(article.date),
  );
  return (
    <Link href={`/journal/${article.slug}`} className={cn("group block", className)} data-cursor="hover">
      <div className={cn("relative overflow-hidden", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={img(article.image, large ? 1600 : 900)}
          alt=""
          fill
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/20 transition-colors duration-700 group-hover:bg-transparent" />
      </div>
      <div className="mt-6 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.22em] text-stone">
        <span className="text-gold">{tr(article.category, locale)}</span>
        <span className="h-px w-6 bg-line" />
        <time dateTime={article.date}>{date}</time>
        <span className="h-px w-6 bg-line" />
        <span>{t("minRead", { count: article.readTime })}</span>
      </div>
      <h3 className={cn("mt-4 font-serif leading-tight text-ivory transition-colors group-hover:text-gold-soft", large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl")}>
        {tr(article.title, locale)}
      </h3>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/60">{tr(article.excerpt, locale)}</p>
    </Link>
  );
}
