import { forbidden } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/salon-prive">) {
  const { locale } = await params;
  return { ...(await pageMetadata({ locale, key: "private", path: "/salon-prive" })), robots: { index: false } };
}

/** Members-only area: without a membership session, access is always denied (403). */
export default async function PrivateSalon({ params }: PageProps<"/[locale]/salon-prive">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const member = false;
  if (!member) forbidden();
  return null;
}
