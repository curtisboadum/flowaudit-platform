import type { NextConfig } from "next";

const revenueRecoveryDestination = "https://revenue-recovery-web-ivory.vercel.app";
const revenueRecoveryProxyVersion = "20260623-client-dashboard-loginfix";

const nextConfig: NextConfig = {
  /* typedRoutes requires a build to generate route types - disabled for marketing site */
  async headers() {
    return [
      {
        source: "/revenue-recovery/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/revenue-recovery/privacy", destination: "/privacy", permanent: true },
      { source: "/revenue-recovery/terms", destination: "/terms", permanent: true },
    ];
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
