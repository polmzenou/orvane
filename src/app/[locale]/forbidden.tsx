import { getTranslations } from "next-intl/server";
import { ErrorView } from "@/components/sections/ErrorView";
import { ButtonLink } from "@/components/ui/Button";

export default async function Forbidden() {
  const t = await getTranslations("errors");
  const c = await getTranslations("common");
  return (
    <ErrorView
      code={t("forbiddenCode")}
      title={t("forbiddenTitle")}
      text={t("forbiddenText")}
      mode="frozen"
      actions={
        <>
          <ButtonLink href="/contact">{t("forbiddenCta")}</ButtonLink>
          <ButtonLink href="/" variant="ghost">
            {c("backHome")}
          </ButtonLink>
        </>
      }
    />
  );
}
