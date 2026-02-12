export type Currency = "USD" | "GBP" | "EUR" | "CAD";

export interface ExchangeRates {
  USD: number;
  GBP: number;
  EUR: number;
  CAD: number;
}

export type RateStatus = "live" | "cached" | "stale" | "fallback";

const FALLBACK_RATES: ExchangeRates = { USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.35 };
const CACHE_KEY = "flowaudit_exchange_rates";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CachedRates {
  rates: ExchangeRates;
  timestamp: number;
}

function getCachedRates(): CachedRates | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "rates" in parsed &&
      "timestamp" in parsed
    ) {
      return parsed as CachedRates;
    }
    return null;
  } catch {
    return null;
  }
}

function setCachedRates(rates: ExchangeRates): void {
  if (typeof window === "undefined") return;
  try {
    const data: CachedRates = { rates, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage may be full or unavailable
  }
}

export async function fetchExchangeRates(): Promise<{
  rates: ExchangeRates;
  status: RateStatus;
}> {
  // Check cache first
  const cached = getCachedRates();
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { rates: cached.rates, status: "cached" };
  }

  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=GBP,EUR,CAD",
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "rates" in data &&
      typeof (data as Record<string, unknown>).rates === "object"
    ) {
      const rawRates = (data as { rates: Record<string, number> }).rates;
      const rates: ExchangeRates = {
        USD: 1,
        GBP: rawRates["GBP"] ?? FALLBACK_RATES.GBP,
        EUR: rawRates["EUR"] ?? FALLBACK_RATES.EUR,
        CAD: rawRates["CAD"] ?? FALLBACK_RATES.CAD,
      };
      setCachedRates(rates);
      return { rates, status: "live" };
    }

    throw new Error("Unexpected API response shape");
  } catch {
    // Return stale cache if available, otherwise fallback
    if (cached) {
      return { rates: cached.rates, status: "stale" };
    }
    return { rates: FALLBACK_RATES, status: "fallback" };
  }
}

export function convertCurrency(
  usdAmount: number,
  rates: ExchangeRates,
  currency: Currency,
): number {
  return usdAmount * rates[currency];
}

export function formatCurrency(amount: number, currency: Currency): string {
  const localeMap: Record<Currency, string> = {
    USD: "en-US",
    GBP: "en-GB",
    EUR: "de-DE",
    CAD: "en-CA",
  };
  return new Intl.NumberFormat(localeMap[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  GBP: "\u00A3",
  EUR: "\u20AC",
  CAD: "C$",
};
