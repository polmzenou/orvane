import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "./site";

type MetaKey =
  | "home" | "collections" | "maison" | "craft" | "boutiques" | "journal" | "contact"
  | "faq" | "legal" | "privacy" | "cookies" | "terms" | "sales" | "sitemap" | "private";

export async function pageMetadata({
  locale,
  key,
  path = "",
  title,
  description,
  image,
}: {
  locale: string;
  key?: MetaKey;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const pageTitle = title ?? (key ? t(key) : site.fullName);
  const desc = description ?? t("siteDescription");
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`]));
  return {
    title: key === "home" ? { absolute: `${site.fullName} — ${pageTitle}` } : pageTitle,
    description: desc,
    alternates: { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/fr${path}` } },
    openGraph: {
      title: pageTitle,
      description: desc,
      url: `/${locale}${path}`,
      siteName: site.fullName,
      locale: locale === "fr" ? "fr_CH" : "en_GB",
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: pageTitle, description: desc },
  };
}
