/**
 * @file next.config.ts
 * @description Next.js config. (1) Redirects the retired /calculator route
 *   (pricing was removed) to /solutions. (2) Proxies the Revenue Recovery
 *   sub-app: /revenue-recovery/* is rewritten to the separately deployed
 *   revenue-recovery-web app. Uses afterFiles so filesystem routes win first —
 *   the bare /revenue-recovery marketing landing (a real page here) is served
 *   locally and never shadowed; only sub-paths with no local route are proxied.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* typedRoutes requires a build to generate route types - disabled for marketing site */
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/solutions",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          // Proxy Revenue Recovery sub-app pages (onboarding, vault, oauth-start,
          // offboard, etc.). afterFiles => the local /revenue-recovery landing
          // page takes precedence; only unmatched sub-paths reach this rule.
          source: "/revenue-recovery/:path*",
          destination:
            "https://revenue-recovery-web-ivory.vercel.app/:path*",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
