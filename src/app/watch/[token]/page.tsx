/**
 * @file page.tsx
 * @description Token-gated personalized demo page (Loom-style watch link).
 *   Unknown, revoked, or expired tokens 404; the page never leaks the token
 *   (noindex, no-referrer) and fires funnel beacons against the resolved
 *   lead ref. Deliberately minimal: one message, one video, one CTA.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WatchBeacon } from "@/components/watch-beacon";
import { getWatchLink } from "@/lib/watch-link-store";
import {
  displayFirstName,
  displayPractice,
  isValidWatchToken,
  watchLeadRef,
  watchLinkState,
} from "@/lib/watch-links";

export const dynamic = "force-dynamic";

interface WatchPageProps {
  params: Promise<{ token: string }>;
}

async function loadValidRow(token: string) {
  if (!isValidWatchToken(token)) return null;
  const row = await getWatchLink(token);
  if (!row || watchLinkState(row, new Date()) !== "valid") return null;
  return row;
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { token } = await params;
  const row = await loadValidRow(token);
  const noindex: Metadata["robots"] = { index: false, follow: false, nocache: true };
  if (!row) return { title: "Your demo call | FlowAudit", robots: noindex };
  const first = displayFirstName(row);
  return {
    title: first ? `${first}, your demo call | FlowAudit` : "Your demo call | FlowAudit",
    description: "A short demo of the FlowAudit AI phone agent handling a real call.",
    robots: noindex,
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { token } = await params;
  const row = await loadValidRow(token);
  if (!row) notFound();

  const first = displayFirstName(row);
  const practice = displayPractice(row);
  const leadRef = watchLeadRef(row);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#FCFBF9] px-4 py-12 sm:px-6 sm:py-16">
      {leadRef ? <WatchBeacon leadRef={leadRef} /> : null}
      <div className="flex w-full max-w-[900px] flex-col items-center">
        <p className="font-serif text-lg tracking-tight text-[#37322F]">FlowAudit</p>

        <h1 className="mt-10 max-w-[760px] text-center font-serif text-3xl leading-[1.15] font-normal text-[#37322F] sm:text-4xl">
          {first ? `${first}, here is the demo I mentioned` : "Here is the demo I mentioned"}
        </h1>
        <p className="mt-4 max-w-[620px] text-center font-sans text-base leading-7 text-[rgba(55,50,47,0.72)]">
          {practice
            ? `A quick look at the phone agent for ${practice}.`
            : "A quick look at the phone agent."}
        </p>

        <div className="mt-10 w-full overflow-hidden rounded-2xl border border-[rgba(55,50,47,0.08)] bg-black shadow-[0px_1px_2px_rgba(55,50,47,0.08)]">
          <video
            className="h-auto w-full"
            width={1288}
            height={706}
            controls
            playsInline
            preload="metadata"
            poster="/assets/watch/phone-agent-demo2-poster.jpg"
          >
            <source src="/assets/watch/phone-agent-demo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-4 max-w-[620px] text-center font-sans text-xs leading-5 text-[rgba(55,50,47,0.75)]">
          This is a real call handled by the agent. The caller details are masked for privacy.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          {leadRef ? (
            <Button size="lg" asChild>
              <Link href={`/book?ref=${leadRef}`}>Book a 15 minute call</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link href="/book">Book a 15 minute call</Link>
            </Button>
          )}
          <p className="font-sans text-xs text-[rgba(55,50,47,0.75)]">
            Any questions? Just reply to me on LinkedIn.
          </p>
        </div>

        <p className="mt-16 font-sans text-[11px] text-[rgba(55,50,47,0.72)]">
          FlowAudit. This page is just for you.
        </p>
      </div>
    </div>
  );
}
