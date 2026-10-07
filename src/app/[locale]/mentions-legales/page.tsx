import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "legal", path: "/mentions-legales" });
}

export default async function Page({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage docKey="legal" locale={locale} />;
}
