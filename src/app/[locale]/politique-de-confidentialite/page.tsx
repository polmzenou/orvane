import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/politique-de-confidentialite">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "privacy", path: "/politique-de-confidentialite" });
}

export default async function Page({ params }: PageProps<"/[locale]/politique-de-confidentialite">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage docKey="privacy" locale={locale} />;
}
