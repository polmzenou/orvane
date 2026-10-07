"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [pending, startTransition] = useTransition();

  return (
    <div role="group" aria-label={t("language")} className={cn("flex items-center gap-1 text-[0.68rem] tracking-[0.2em]", pending && "opacity-60", className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          <button
            type="button"
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            onClick={() => startTransition(() => router.replace(pathname, { locale: l, scroll: false }))}
            className={cn("px-1 py-1 uppercase transition-colors", l === locale ? "text-gold" : "text-ivory/50 hover:text-ivory")}
          >
            {l}
          </button>
          {i < routing.locales.length - 1 && <span className="text-ivory/25">/</span>}
        </span>
      ))}
    </div>
  );
}
