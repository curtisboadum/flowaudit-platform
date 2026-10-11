import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { industries, posts } from "@/lib/editorial-copy";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/solutions",
    "/phone-agent",
    "/web-design",
    "/revenue-recovery",
    "/demos",
    "/how-it-works",
    "/about",
    "/book",
    "/blog",
    "/careers",
    "/privacy",
    "/terms",
    ...Object.keys(industries).map((s) => `/industries/${s}`),
    ...Object.keys(posts).map((s) => `/blog/${s}`),
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-10-09"),
    changeFrequency: path.startsWith("/blog/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path === "/phone-agent" ? 0.9 : 0.7,
  }));
}
