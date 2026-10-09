import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | FlowAudit`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | FlowAudit`,
      description,
      url: canonicalUrl(path),
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | FlowAudit`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
