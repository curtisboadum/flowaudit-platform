"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { getLocaleFromCookie, setLocaleCookie } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    const chosen = requested === "en" || requested === "es" ? requested : getLocaleFromCookie();
    if (requested === "en" || requested === "es") setLocaleCookie(chosen);
    setLocaleState(chosen);
    document.documentElement.lang = chosen;
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleCookie(newLocale);
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
