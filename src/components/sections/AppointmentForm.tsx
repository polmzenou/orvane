"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { boutiques } from "@/data/content";
import { watches } from "@/data/watches";
import { Arrow, Button } from "@/components/ui/Button";
import { cn, tr } from "@/lib/utils";

const reasons = ["discovery", "purchase", "service", "bespoke"] as const;
const times = ["morning", "afternoon", "evening"] as const;

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const schema = z.object({
  reason: z.enum(reasons, { error: "required" }),
  watch: z.string().optional(),
  boutique: z.string().min(1, "required"),
  date: z
    .string()
    .min(1, "required")
    .refine((v) => new Date(v) >= today(), "date"),
  time: z.enum(times, { error: "required" }),
  firstName: z.string().trim().min(1, "required"),
  lastName: z.string().trim().min(1, "required"),
  email: z.email("email"),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^[+()\d\s.-]{6,20}$/.test(v), "phone"),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { error: "consent" }),
});

type FormValues = z.input<typeof schema>;

const stepFields: (keyof FormValues)[][] = [
  ["reason", "watch"],
  ["boutique", "date", "time"],
  ["firstName", "lastName", "email", "phone", "message", "consent"],
];

function FieldError({ message }: { message?: string }) {
  const t = useTranslations("contact.errors");
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-xs text-danger">
      {t(message as "required")}
    </p>
  );
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[0.62rem] uppercase tracking-[0.25em] text-stone">
      {children}
    </label>
  );
}

export function AppointmentForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<{ name: string; city: string } | null>(null);

  const initialWatch = params.get("watch");
  const initialBoutique = params.get("boutique");

  const {
    register,
    handleSubmit,
    trigger,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      watch: watches.some((w) => w.slug === initialWatch) ? initialWatch! : "",
      boutique: boutiques.some((b) => b.id === initialBoutique) ? initialBoutique! : "geneve",
      reason: initialWatch ? "purchase" : undefined,
      date: "",
      phone: "",
      message: "",
    },
  });

  const next = async () => {
    const ok = await trigger(stepFields[step]);
    if (ok) setStep((s) => Math.min(2, s + 1));
  };

  const onSubmit = async (values: FormValues) => {
    // Front-end only: simulate network latency, nothing is sent.
    await new Promise((r) => setTimeout(r, 1400));
    const b = boutiques.find((x) => x.id === values.boutique)!;
    setSent({ name: values.firstName, city: tr(b.city, locale) });
  };

  const selectedReason = useWatch({ control, name: "reason" });
  const selectedTime = useWatch({ control, name: "time" });
  const steps = [t("step1"), t("step2"), t("step3")];

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gold/40 bg-coal p-10 text-center md:p-16"
        role="status"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" aria-hidden="true">
            <motion.path
              d="M4 12.5l5 5L20 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </svg>
        </div>
        <h2 className="display mt-8 text-4xl text-ivory md:text-5xl">{t("successTitle", { name: sent.name })}</h2>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-ivory/65">{t("successText", { city: sent.city })}</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStep(0);
            setSent(null);
          }}
          className="mt-10 text-[0.7rem] uppercase tracking-[0.25em] text-gold underline underline-offset-8"
        >
          {t("again")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-line bg-coal p-6 sm:p-10 md:p-14">
      <div className="mb-12">
        <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.25em]">
          <span className="text-gold">{t("step", { current: step + 1, total: 3 })}</span>
          <span className="text-ivory/70">{steps[step]}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {steps.map((s, i) => (
            <div key={s} className="h-px bg-line">
              <motion.div className="h-full bg-gold" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} style={{ originX: 0 }} transition={{ duration: 0.6 }} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          {step === 0 && (
            <>
              <fieldset>
                <legend className="text-[0.62rem] uppercase tracking-[0.25em] text-stone">{t("reason")}</legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 border px-5 py-4 text-sm transition-colors",
                        selectedReason === r ? "border-gold text-ivory" : "border-line text-ivory/70 hover:border-stone",
                      )}
                    >
                      <input type="radio" value={r} {...register("reason")} className="sr-only" />
                      <span className={cn("h-2 w-2 rotate-45 border border-gold", selectedReason === r && "bg-gold")} />
                      {t(`reasons.${r}`)}
                    </label>
                  ))}
                </div>
                <FieldError message={errors.reason?.message} />
              </fieldset>
              <div>
                <Label htmlFor="watch">{t("watch")}</Label>
                <select id="watch" {...register("watch")} className="field bg-coal">
                  <option value="">{t("watchNone")}</option>
                  {watches.map((w) => (
                    <option key={w.slug} value={w.slug}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <Label htmlFor="boutique">{t("boutique")}</Label>
                <select id="boutique" {...register("boutique")} className="field bg-coal" aria-invalid={!!errors.boutique}>
                  {boutiques.map((b) => (
                    <option key={b.id} value={b.id}>
                      {tr(b.city, locale)} — {b.address}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.boutique?.message} />
              </div>
              <div>
                <Label htmlFor="date">{t("date")}</Label>
                <input id="date" type="date" {...register("date")} className="field [color-scheme:dark]" aria-invalid={!!errors.date} />
                <FieldError message={errors.date?.message} />
              </div>
              <fieldset>
                <legend className="text-[0.62rem] uppercase tracking-[0.25em] text-stone">{t("time")}</legend>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {times.map((slot) => (
                    <label
                      key={slot}
                      className={cn(
                        "cursor-pointer border px-3 py-4 text-center text-sm transition-colors",
                        selectedTime === slot ? "border-gold bg-gold text-ink" : "border-line text-ivory/70 hover:border-stone",
                      )}
                    >
                      <input type="radio" value={slot} {...register("time")} className="sr-only" />
                      {t(`times.${slot}`)}
                    </label>
                  ))}
                </div>
                <FieldError message={errors.time?.message} />
              </fieldset>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">{t("firstName")}</Label>
                  <input id="firstName" autoComplete="given-name" {...register("firstName")} className="field" aria-invalid={!!errors.firstName} />
                  <FieldError message={errors.firstName?.message} />
                </div>
                <div>
                  <Label htmlFor="lastName">{t("lastName")}</Label>
                  <input id="lastName" autoComplete="family-name" {...register("lastName")} className="field" aria-invalid={!!errors.lastName} />
                  <FieldError message={errors.lastName?.message} />
                </div>
              </div>
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <input id="email" type="email" autoComplete="email" {...register("email")} className="field" aria-invalid={!!errors.email} />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <input id="phone" type="tel" autoComplete="tel" {...register("phone")} className="field" aria-invalid={!!errors.phone} />
                  <FieldError message={errors.phone?.message} />
                </div>
              </div>
              <div>
                <Label htmlFor="message">{t("message")}</Label>
                <textarea id="message" rows={4} {...register("message")} className="field resize-none" data-lenis-prevent />
              </div>
              <div>
                <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-ivory/65">
                  <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 shrink-0 accent-[#c9a86a]" />
                  <span>
                    {t("consent")}{" "}
                    <Link href="/politique-de-confidentialite" className="text-gold-soft underline underline-offset-4">
                      ↗
                    </Link>
                  </span>
                </label>
                <FieldError message={errors.consent?.message} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="text-[0.7rem] uppercase tracking-[0.25em] text-ivory/60 hover:text-ivory">
            ← {t("back")}
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <Button type="button" onClick={next}>
            {t("continue")} <Arrow />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("sending") : t("submit")}
          </Button>
        )}
      </div>
    </form>
  );
}
