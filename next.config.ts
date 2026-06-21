/**
 * @file next.config.ts
 * @description Next.js config. Redirects the retired /calculator route (pricing
 *   was removed from the site) to the solutions page so old links don't 404.
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
};

export default nextConfig;
