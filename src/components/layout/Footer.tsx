"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useConsent } from "@/components/cookies/ConsentProvider";
import { Logo } from "@/components/ui/Logo";
import { legalLinks, site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const legal = useTranslations("legalLinks");
  const { openPreferences } = useConsent();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("discover"),
      links: [
        { href: "/collections", label: nav("collections") },
        { href: "/collections/celeste-phase-de-lune", label: "Céleste" },
        { href: "/collections/heritage-email-grand-feu", label: "Héritage" },
        { href: "/collections/abysse-300", label: "Abysse" },
      ],
    },
    {
      title: t("maison"),
      links: [
        { href: "/maison", label: nav("maison") },
        { href: "/savoir-faire", label: nav("craft") },
        { href: "/journal", label: nav("journal") },
        { href: "/salon-prive", label: nav("private") },
      ],
    },
    {
      title: t("help"),
      links: [
        { href: "/contact", label: nav("appointment") },
        { href: "/boutiques", label: nav("boutiques") },
        { href: "/faq", label: nav("faq") },
        { href: "/plan-du-site", label: legal("sitemap") },
      ],
    },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-coal">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none font-serif text-[26vw] leading-none tracking-[0.08em] text-ivory/[0.025]">
        ORVANE
      </div>
      <div className="container-luxe relative grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/60">{t("tagline")}</p>
          <div className="mt-12 max-w-md">
            <p className="font-serif text-2xl text-ivory">{t("newsletterTitle")}</p>
            <p className="mt-2 text-sm text-ivory/55">{t("newsletterText")}</p>
            <NewsletterForm className="mt-6" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-6">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ivory/70 transition-colors hover:text-gold-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow mb-6">{t("follow")}</p>
            <ul className="space-y-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ivory/70 transition-colors hover:text-gold-soft">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-8 text-sm not-italic leading-relaxed text-ivory/50">
              {site.address.street}
              <br />
              {site.address.city}
              <br />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold-soft">
                {site.phone}
              </a>
            </address>
          </div>
        </div>
      </div>
      <div className="container-luxe relative flex flex-col gap-6 border-t border-line py-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
        <p>{t("rights", { year })}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-gold-soft">
                {legal(l.key)}
              </Link>
            </li>
          ))}
          <li>
            <button type="button" onClick={openPreferences} className="transition-colors hover:text-gold-soft">
              {t("manageCookies")}
            </button>
          </li>
        </ul>
        <p className="tracking-[0.2em] uppercase">{t("madeIn")}</p>
      </div>
    </footer>
  );
}
