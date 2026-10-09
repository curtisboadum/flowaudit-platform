import { ClientAccess } from "@/components/marketing/client-access";
export const metadata = {
  title: "Client access | FlowAudit",
  robots: { index: false, follow: false },
};
export default async function Page() {
  let available = false;
  try {
    const response = await fetch("https://revenue-recovery-web-ivory.vercel.app/client", {
      method: "HEAD",
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    available = response.ok;
  } catch {
    /* The support fallback stays available when the upstream cannot be reached. */
  }
  return <ClientAccess available={available} />;
}
