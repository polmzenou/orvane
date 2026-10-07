"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations("footer");
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form
      noValidate
      className={cn("w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL.test(email)) {
          setError(true);
          return;
        }
        setError(false);
        setLoading(true);
        // Front-end only: simulate the request.
        setTimeout(() => {
          setLoading(false);
          setDone(true);
          setEmail("");
          toast(t("subscribed"));
        }, 900);
      }}
    >
      <div className="flex items-end gap-4 border-b border-line focus-within:border-gold">
        <label className="flex-1">
          <span className="sr-only">{t("emailPlaceholder")}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            aria-invalid={error}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="w-full bg-transparent py-4 text-ivory placeholder:text-stone focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="pb-4 text-[0.68rem] uppercase tracking-[0.25em] text-gold transition-colors hover:text-gold-soft disabled:opacity-50"
        >
          {loading ? "…" : t("subscribe")}
        </button>
      </div>
      <p id="newsletter-error" className={cn("mt-3 text-xs", error ? "text-danger" : done ? "text-gold-soft" : "text-stone")}>
        {error ? t("invalidEmail") : done ? t("subscribed") : t("consent")}
      </p>
    </form>
  );
}
