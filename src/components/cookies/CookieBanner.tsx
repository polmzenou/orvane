"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

function Switch({ checked, onChange, disabled, label }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300",
        checked ? "border-gold bg-gold" : "border-line bg-smoke",
        disabled && "opacity-60",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-300",
          checked ? "left-[22px] bg-ink" : "left-[3px] bg-stone",
        )}
      />
    </button>
  );
}

function Preferences() {
  const t = useTranslations("cookies");
  const { consent, save, preferencesOpen, closePreferences } = useConsent();
  const toast = useToast();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  const commit = (a: boolean, m: boolean) => {
    save({ analytics: a, marketing: m });
    toast(t("saved"));
  };

  const rows = [
    { key: "necessary", value: true, set: undefined, locked: true },
    { key: "analytics", value: analytics, set: setAnalytics, locked: false },
    { key: "marketing", value: marketing, set: setMarketing, locked: false },
  ] as const;

  return (
    <Modal open={preferencesOpen} onClose={closePreferences} title={t("modalTitle")}>
      <p className="eyebrow mb-4">{t("title")}</p>
      <h2 className="display mb-4 text-4xl text-ivory">{t("modalTitle")}</h2>
      <p className="mb-8 text-sm leading-relaxed text-ivory/65">{t("modalText")}</p>
      <ul className="divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <li key={row.key} className="flex items-start justify-between gap-6 py-5">
            <div>
              <p className="font-serif text-xl text-ivory">{t(`categories.${row.key}.title`)}</p>
              <p className="mt-1 text-sm text-ivory/55">{t(`categories.${row.key}.text`)}</p>
              {row.locked && <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-gold">{t("alwaysOn")}</p>}
            </div>
            <Switch checked={row.value} onChange={row.set} disabled={row.locked} label={t(`categories.${row.key}.title`)} />
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => commit(false, false)} className="flex-1 border border-line px-5 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ivory transition-colors hover:border-gold">
          {t("rejectAll")}
        </button>
        <button type="button" onClick={() => commit(analytics, marketing)} className="flex-1 border border-gold px-5 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-ink">
          {t("save")}
        </button>
        <button type="button" onClick={() => commit(true, true)} className="flex-1 bg-gold px-5 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold-soft">
          {t("acceptAll")}
        </button>
      </div>
    </Modal>
  );
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const { bannerOpen, save, openPreferences, preferencesOpen, consent } = useConsent();

  return (
    <>
      <AnimatePresence>
        {bannerOpen && !preferencesOpen && (
          <motion.div
            role="region"
            aria-label={t("title")}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-[80] border border-line bg-coal/95 p-6 shadow-2xl backdrop-blur-md md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-7"
          >
            <p className="eyebrow mb-3">{t("title")}</p>
            <p className="text-sm leading-relaxed text-ivory/70">
              {t("text")}{" "}
              <Link href="/politique-cookies" className="text-gold-soft underline underline-offset-4">
                {t("learnMore")}
              </Link>
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => save({ analytics: false, marketing: false })}
                className="border border-line px-4 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ivory transition-colors hover:border-gold"
              >
                {t("rejectAll")}
              </button>
              <button
                type="button"
                onClick={() => save({ analytics: true, marketing: true })}
                className="bg-gold px-4 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold-soft"
              >
                {t("acceptAll")}
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="col-span-2 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-gold underline-offset-4 hover:underline"
              >
                {t("customize")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Re-mount on open so toggles reflect the stored choice */}
      {preferencesOpen && <Preferences key={consent?.date ?? "new"} />}
    </>
  );
}
