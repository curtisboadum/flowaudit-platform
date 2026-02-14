export const SITE_URL = "https://flowaudit-platform.vercel.app";
export const SITE_NAME = "FlowAudit";

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
