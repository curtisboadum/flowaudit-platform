// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { WatchBeacon } from "@/components/watch-beacon";
import { CONSENT_KEY } from "@/lib/funnel-client";

const SESSION = "12345678-1234-4234-8234-123456789012";
const LINK = "wl_abcdef1234567890";

async function sentBodies(): Promise<Record<string, unknown>[]> {
  const calls = vi.mocked(navigator.sendBeacon).mock.calls;
  const blobs = calls.map((call) => call[1] as Blob);
  return Promise.all(
    blobs.map(async (blob) => JSON.parse(await blob.text()) as Record<string, unknown>),
  );
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.body.innerHTML = "";
  vi.stubGlobal("crypto", { randomUUID: () => SESSION });
  Object.defineProperty(navigator, "sendBeacon", {
    configurable: true,
    value: vi.fn(() => true),
  });
  Object.defineProperty(navigator, "webdriver", { configurable: true, value: false });
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("WatchBeacon", () => {
  it("sends one watch_open after the page has been visible, with link and demo but no token", async () => {
    vi.useFakeTimers();
    render(
      <WatchBeacon
        leadRef="fa-sdr-chris"
        demoId="smart-street"
        linkRef={LINK}
        measurementMode="first_party"
        measurementOff={false}
      />,
    );
    await vi.advanceTimersByTimeAsync(1600);
    const sent = await sentBodies();
    const open = sent.find((row) => row.event === "watch_open");
    expect(open).toBeTruthy();
    expect(open?.surface).toBe("watch");
    expect(open?.link_ref).toBe(LINK);
    expect(open?.demo_id).toBe("smart-street");
    expect(open?.session_id).toBe(SESSION);
    expect(JSON.stringify(sent)).not.toContain("token");
  });

  it("stays silent when measurement is off or consent is missing", async () => {
    vi.useFakeTimers();
    const { unmount } = render(
      <WatchBeacon
        leadRef="fa-sdr-chris"
        demoId="smart-street"
        linkRef={LINK}
        measurementMode="first_party"
        measurementOff
      />,
    );
    await vi.advanceTimersByTimeAsync(2000);
    expect(navigator.sendBeacon).not.toHaveBeenCalled();
    unmount();

    render(
      <WatchBeacon
        leadRef="fa-sdr-chris"
        demoId="smart-street"
        linkRef={LINK}
        measurementMode="consent"
        measurementOff={false}
      />,
    );
    await vi.advanceTimersByTimeAsync(2000);
    expect(navigator.sendBeacon).not.toHaveBeenCalled();

    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("fa-consent-change"));
    await vi.advanceTimersByTimeAsync(2000);
    expect(navigator.sendBeacon).toHaveBeenCalled();
  });

  it("counts covered playback to 50 percent but not a seek to the end", async () => {
    const video = document.createElement("video");
    video.id = "watch-video";
    Object.defineProperty(video, "duration", { configurable: true, value: 100 });
    Object.defineProperty(video, "paused", { configurable: true, value: false });
    Object.defineProperty(video, "seeking", { configurable: true, value: false });
    document.body.append(video);

    let clock = 0;
    vi.spyOn(performance, "now").mockImplementation(() => clock);
    render(
      <WatchBeacon
        leadRef="fa-sdr-chris"
        demoId="smart-street"
        linkRef={LINK}
        measurementMode="first_party"
        measurementOff={false}
      />,
    );
    video.currentTime = 0;
    video.dispatchEvent(new Event("timeupdate"));
    for (let i = 1; i <= 55; i += 1) {
      clock += 1000;
      video.currentTime = i * 1.1;
      video.dispatchEvent(new Event("timeupdate"));
    }
    const sent = await sentBodies();
    expect(sent.some((row) => row.event === "video_25")).toBe(true);
    expect(sent.some((row) => row.event === "video_50")).toBe(true);
    expect(sent.some((row) => row.event === "video_75")).toBe(false);

    vi.mocked(navigator.sendBeacon).mockClear();
    video.currentTime = 99;
    video.dispatchEvent(new Event("seeking"));
    video.dispatchEvent(new Event("timeupdate"));
    expect(navigator.sendBeacon).not.toHaveBeenCalled();
  });

  it("fires cta_click and transcript_click", async () => {
    const cta = document.createElement("a");
    cta.href = "/book?service=phone-agent";
    cta.textContent = "Book";
    cta.addEventListener("click", (event) => event.preventDefault());
    const transcript = document.createElement("a");
    transcript.href = "/media/demos/smart-street-transcript.txt";
    transcript.setAttribute("data-watch-transcript", "");
    transcript.textContent = "Transcript";
    transcript.addEventListener("click", (event) => event.preventDefault());
    document.body.append(cta, transcript);
    render(
      <WatchBeacon
        leadRef="fa-sdr-chris"
        demoId="smart-street"
        linkRef={LINK}
        measurementMode="first_party"
        measurementOff={false}
      />,
    );
    cta.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    transcript.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    const sent = await sentBodies();
    expect(sent.some((row) => row.event === "cta_click")).toBe(true);
    expect(sent.some((row) => row.event === "transcript_click")).toBe(true);
  });
});
