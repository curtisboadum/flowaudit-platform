import type { NextConfig } from "next";

const revenueRecoveryDestination = "https://revenue-recovery-web-ivory.vercel.app";
const revenueRecoveryProxyVersion = "20260702-google-reviewer-flow";

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  outputFileTracingRoot: process.cwd(),
  /* typedRoutes requires a build to generate route types - disabled for marketing site */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'",
          },
        ],
      },
      {
        source: "/demo/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        // FlowAudit showcase pages served locally: never cache, never index,
        // and never leak the token via the Referer header to any third party.
        source: "/showcase",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        source: "/showcase/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        source: "/revenue-recovery/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      {
        // Personal, token-gated demo pages: never cache, never index, and
        // never leak the token via the Referer header to any third party.
        source: "/watch/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // FlowAudit showcase: multi-demo pages served by this deployment,
        // ahead of the /demo proxy to the dedicated demo app.
        { source: "/demo/showcase", destination: "/showcase/index.html" },
        { source: "/demo/showcase/dental", destination: "/showcase/dental.html" },
        { source: "/demo/showcase/dental/urgent", destination: "/showcase/dental-urgent.html" },
        { source: "/demo/showcase/dental/checkup", destination: "/showcase/dental-checkup.html" },
        { source: "/demo/showcase/trades", destination: "/showcase/trades.html" },
        { source: "/demo/showcase/walkthrough", destination: "/showcase/walkthrough.html" },
        { source: "/demo/showcase/agile-tech", destination: "/showcase/agile-tech.html" },
        // Tracked VSL and private reporting, hosted by the dedicated demo app.
        // Keep the existing homepage, /demos gallery and /watch links intact.
        { source: "/demo", destination: "https://flowaudit-demo.vercel.app/demo" },
        { source: "/demo/:path*", destination: "https://flowaudit-demo.vercel.app/demo/:path*" },
        // R2Q channel: per-niche offer pages served on their own subdomains.
        // Canonicals stay on the main domain (see SITE_URL), and these hosts
        // resolve only once the Vercel domains + DNS records exist.
        ...(
          [
            ["trades.flowaudit.co.uk", "/industries/trades"],
            ["property.flowaudit.co.uk", "/industries/property"],
            ["clinics.flowaudit.co.uk", "/industries/clinics"],
          ] as Array<[string, string]>
        ).map(([host, destination]) => ({
          source: "/",
          has: [{ type: "host" as const, value: host }],
          destination,
        })),
      ],
      afterFiles: [
        // Keep /revenue-recovery available for the FlowAudit marketing page.
        // Only proxy client-operation subroutes to the standalone RRD web app.
        ...[
          "onboarding",
          "desk",
          "vault",
          "oauth-start",
          "oauth-callback",
          "offboard",
          "offboarded",
          "sop-review",
          "readiness",
          "mapping",
          "go-live",
          "client",
          "postal-portal",
          "reviewer",
        ].map((path) => ({
          source: `/revenue-recovery/${path}`,
          destination: `${revenueRecoveryDestination}/${path}?rrd_proxy_v=${revenueRecoveryProxyVersion}`,
        })),
        ...["theme.css", "logo.svg", "vault-crypto.js"].map((asset) => ({
          source: `/revenue-recovery/${asset}`,
          destination: `${revenueRecoveryDestination}/${asset}?rrd_proxy_v=${revenueRecoveryProxyVersion}`,
        })),
        {
          source: "/revenue-recovery/api/:path*",
          destination: `${revenueRecoveryDestination}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
