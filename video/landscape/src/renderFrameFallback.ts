import { getRemotionEnvironment } from "remotion";

// Some macOS headless sessions stop issuing paint callbacks after inactivity.
// This wrapper guarantees each request is delivered once; it never drives film time.
// Geometry remains evaluated exclusively from Remotion's absolute frame number.
if (typeof window !== "undefined" && getRemotionEnvironment().isRendering) {
  const nativeRequest = window.requestAnimationFrame.bind(window);
  const nativeCancel = window.cancelAnimationFrame.bind(window);
  const pending = new Map<number, number>();
  window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    let delivered = false;
    let timer: number;
    const deliver = (timestamp: number) => {
      if (delivered) return;
      delivered = true;
      window.clearTimeout(timer);
      pending.delete(id);
      callback(timestamp);
    };
    const id = nativeRequest(deliver);
    timer = window.setTimeout(() => {
      nativeCancel(id);
      deliver(performance.now());
    }, 100);
    pending.set(id, timer);
    return id;
  };
  window.cancelAnimationFrame = (id: number) => {
    nativeCancel(id);
    window.clearTimeout(pending.get(id));
    pending.delete(id);
  };
}
