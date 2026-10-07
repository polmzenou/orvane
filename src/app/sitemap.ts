import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { articles } from "@/data/content";
import { watches } from "@/data/watches";
import { site } from "@/lib/site";

const staticPaths = [
  "",
  "/collections",
  "/maison",
  "/savoir-faire",
  "/boutiques",
  "/journal",
  "/contact",
  "/faq",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/politique-cookies",
  "/cgu",
  "/cgv",
  "/plan-du-site",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...watches.map((w) => `/collections/${w.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}/fr${path}`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
    },
  }));
}
