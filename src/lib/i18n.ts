export type Locale = "en" | "es";

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
