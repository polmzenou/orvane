import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { cormorant, manrope } from "@/lib/fonts";
import { site } from "@/lib/site";
import { ConsentProvider } from "@/components/cookies/ConsentProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ToastProvider } from "@/components/ui/Toast";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: site.fullName, template: `%s · ${site.fullName}` },
    description: t("siteDescription"),
    applicationName: site.fullName,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    url: site.url,
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: "Genève",
      postalCode: "1204",
      addressCountry: "CH",
    },
  };

  return (
    <html lang={locale} className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="grain flex min-h-dvh flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider>
          <ConsentProvider>
            <ToastProvider>
              <SmoothScroll>
                <Preloader />
                <CustomCursor />
                <Header />
                <main id="main" className="flex-1">
                  {children}
                </main>
                <Footer />
                <CookieBanner />
              </SmoothScroll>
            </ToastProvider>
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
