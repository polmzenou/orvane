"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ErrorView } from "@/components/sections/ErrorView";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");
  const c = useTranslations("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      code={t("errorCode")}
      title={t("errorTitle")}
      text={t("errorText")}
      mode="frozen"
      actions={
        <>
          <Button onClick={() => reset()}>{t("retry")}</Button>
          <ButtonLink href="/" variant="ghost">
            {c("backHome")}
          </ButtonLink>
        </>
      }
    />
  );
}
