import { en } from "./translations/en";
import { es } from "./translations/es";

export type Locale = "en" | "es";

const translations: Record<Locale, typeof en> = { en, es };

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en;
}

/** Read locale from cookie (client-side only) */
export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
  const val = match?.[1];
  if (val === "es") return "es";
  return "en";
}

/** Set locale cookie (client-side only) */
export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `locale=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

/**
 * Agency discount for Spanish locale (Paraguay).
 * 42.8571% off — ONLY for agency products, NOT web design arm.
 */
export const AGENCY_DISCOUNT = 0.428571;

export function applyAgencyDiscount(price: number): number {
  return Math.round(price * (1 - AGENCY_DISCOUNT));
}
