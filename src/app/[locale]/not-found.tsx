import { getTranslations } from "next-intl/server";
import { ErrorView } from "@/components/sections/ErrorView";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "404", robots: { index: false } };

export default async function NotFound() {
  const t = await getTranslations("errors");
  const c = await getTranslations("common");
  return (
    <ErrorView
      code={t("notFoundCode")}
      title={t("notFoundTitle")}
      text={t("notFoundText")}
      actions={
        <>
          <ButtonLink href="/">{c("backHome")}</ButtonLink>
          <ButtonLink href="/collections" variant="ghost">
            {c("allWatches")}
          </ButtonLink>
        </>
      }
    />
  );
}
