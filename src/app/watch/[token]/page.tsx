/**
 * @file page.tsx
 * @description Token-gated personalized demo page. The watch_links row owns
 *   the demo decision; this page only renders it. Unknown, revoked, expired,
 *   malformed, or trade-mismatched tokens 404. No hub, no library, no list of
 *   five demos, one video, one primary CTA.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WatchBeacon } from "@/components/watch-beacon";
import { WatchMeasurementNotice } from "@/components/watch-measurement-notice";
import { getDemo } from "@/lib/demo-registry";
import { getWatchLink } from "@/lib/watch-link-store";
import {
  displayCompany,
  displayFirstName,
  isValidWatchToken,
  resolveDemoId,
  watchLeadRef,
  watchLinkState,
} from "@/lib/watch-links";
import {
  watchContext,
  watchHeadline,
  watchNote,
  watchSubhead,
  watchTitle,
} from "@/lib/watch-copy";

export const dynamic = "force-dynamic";

interface WatchPageProps {
  params: Promise<{ token: string }>;
}

async function loadValidRow(token: string) {
  if (!isValidWatchToken(token)) return null;
  const row = await getWatchLink(token);
  if (!row || watchLinkState(row, new Date()) !== "valid") return null;
  if (!resolveDemoId(row)) return null;
  if (!watchLeadRef(row)) return null;
  return row;
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { token } = await params;
  const row = await loadValidRow(token);
  const noindex: Metadata["robots"] = { index: false, follow: false, nocache: true };
  if (!row) return { title: "Your demo | FlowAudit", robots: noindex };
  const first = displayFirstName(row);
  return {
    title: watchTitle(first),
    description:
      "A short recorded demonstration of the FlowAudit phone agent, with the outcome and limits explained.",
    robots: noindex,
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { token } = await params;
  const row = await loadValidRow(token);
  if (!row) notFound();

  const first = displayFirstName(row);
  const company = displayCompany(row);
  const demoId = resolveDemoId(row);
  if (!demoId) notFound();
  const demo = getDemo(demoId);
  const leadRef = watchLeadRef(row);
  if (!leadRef || !row.link_ref) notFound();

  const ctaHref = `/book?service=phone-agent&ref=${encodeURIComponent(
    leadRef,
  )}&demo=${encodeURIComponent(demoId)}`;
  const measurementMode =
    process.env.WATCH_MEASUREMENT_MODE === "consent" ? "consent" : "first_party";
  const measurementOff = Boolean(row.measurement_off_at);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#FCFBF9] px-4 py-12 sm:px-6 sm:py-16">
      <WatchBeacon
        leadRef={leadRef}
        demoId={demoId}
        linkRef={row.link_ref}
        measurementMode={measurementMode}
        measurementOff={measurementOff}
      />
      <div className="flex w-full max-w-[900px] flex-col items-center">
        <p className="font-serif text-lg tracking-tight text-[#37322F]">FlowAudit</p>

        <h1 className="mt-10 max-w-[760px] text-center font-serif text-3xl leading-[1.15] font-normal text-[#37322F] text-balance sm:text-4xl">
          {watchHeadline(first, company)}
        </h1>
        <p className="mt-4 max-w-[620px] text-center font-sans text-base leading-7 text-[rgba(55,50,47,0.72)]">
          {watchSubhead(company)}
        </p>
        <p className="mt-3 max-w-[640px] text-center font-sans text-sm leading-6 text-[rgba(55,50,47,0.72)]">
          {watchContext(demoId)}
        </p>

        <div className="mt-10 w-full overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-black shadow-[0px_1px_2px_rgba(55,50,47,0.08)]">
          <video
            id="watch-video"
            className="h-auto w-full"
            width={1920}
            height={1080}
            controls
            playsInline
            preload="metadata"
            poster={demo.poster}
          >
            <source src={demo.src} type="video/mp4" />
            <track
              kind="captions"
              src={demo.captions}
              srcLang="en"
              label="English (larger captions)"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <p className="mt-4 max-w-[640px] text-center font-sans text-xs leading-5 text-[rgba(55,50,47,0.75)]">
          {watchNote(demoId)}
        </p>

        <details className="mt-4 w-full max-w-[640px] rounded-xl border border-[rgba(55,50,47,0.08)] px-5 py-4">
          <summary className="cursor-pointer font-sans text-xs font-medium text-[#37322F]">
            What this recording does and does not show
          </summary>
          <p className="mt-3 font-sans text-xs leading-5 text-[rgba(55,50,47,0.72)]">
            {demo.outcome.en}
          </p>
          <p className="mt-2 font-sans text-xs leading-5 text-[rgba(55,50,47,0.72)]">
            {demo.limitations.en}
          </p>
        </details>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button size="lg" asChild>
            <Link href={ctaHref}>Book a 15 minute call</Link>
          </Button>
          <p className="font-sans text-xs text-[rgba(55,50,47,0.75)]">
            Any questions? Just reply to this email.
          </p>
          <a
            href={demo.transcript}
            data-watch-transcript
            className="font-sans text-xs text-[rgba(55,50,47,0.75)] underline underline-offset-4"
          >
            Read the transcript if the video cannot play
          </a>
        </div>

        <WatchMeasurementNotice
          leadRef={leadRef}
          linkRef={row.link_ref}
          demoId={demoId}
          mode={measurementMode}
          measurementOff={measurementOff}
        />

        <p className="mt-12 font-sans text-[11px] text-[rgba(55,50,47,0.72)]">
          FlowAudit. This page is just for you.
        </p>
      </div>
    </div>
  );
}
