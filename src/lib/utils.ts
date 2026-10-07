import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export type L = { fr: string; en: string };
export type Lang = keyof L;

export function tr(value: L, locale: string): string {
  return locale === "en" ? value.en : value.fr;
}

export function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-CH" : "fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}
