import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/politique-cookies">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "cookies", path: "/politique-cookies" });
}

export default async function Page({ params }: PageProps<"/[locale]/politique-cookies">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage docKey="cookies" locale={locale} />;
}
