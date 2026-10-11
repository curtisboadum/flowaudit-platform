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
        source: "/revenue-recovery/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return {
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
