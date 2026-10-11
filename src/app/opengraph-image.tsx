import { ImageResponse } from "next/og";
export const alt = "FlowAudit. Better systems. Clearer next steps.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f7f5f3",
        color: "#37322f",
        padding: "64px",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", fontSize: 44, fontFamily: "serif" }}>FlowAudit.</div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          fontFamily: "serif",
          maxWidth: 960,
          lineHeight: 1.05,
        }}
      >
        Better systems. Clearer next steps.
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#605a57" }}>
        Phone handling · Operations · Revenue recovery · Websites
      </div>
    </div>,
    size,
  );
}
