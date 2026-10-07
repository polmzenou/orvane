import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/cgv">) {
  const { locale } = await params;
  return pageMetadata({ locale, key: "sales", path: "/cgv" });
}

export default async function Page({ params }: PageProps<"/[locale]/cgv">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage docKey="sales" locale={locale} />;
}
