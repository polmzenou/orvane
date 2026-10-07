import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/cgu">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "terms", path: "/cgu" });
}

export default async function Page({ params }: PageProps<"/[locale]/cgu">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage docKey="terms" locale={locale} />;
}
