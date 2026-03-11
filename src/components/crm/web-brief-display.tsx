"use client";

import { FileText, Hammer, Loader2, Map, Palette, Search, Target } from "lucide-react";

interface BriefSitemapPage {
  page: string;
  slug: string;
  purpose: string;
  sections: string[];
  priority: string;
}

interface BriefBrand {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorRationale: string;
  recommendedFonts: {
    heading: string;
    body: string;
  };
  tone: string;
  voiceGuidelines: string;
  brandArchetype: string;
}

interface BriefPageContent {
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    heroCTA: string;
    whyUsHeadline: string;
    whyUsPoints: string[];
    aboutPreview: string;
  };
  about: {
    headline: string;
    story: string;
    mission: string;
    values: Array<{ title: string; description: string }>;
  };
  services: Array<{
    name: string;
    headline: string;
    description: string;
    benefits: string[];
    cta: string;
  }>;
  contact: {
    headline: string;
    subtext: string;
    formFields: string[];
  };
}

interface BriefSeo {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  localSeoTips: string;
  schemaType: string;
}

interface BriefCompetitors {
  likelyTypes: string[];
  differentiators: string[];
  positioning: string;
}

interface BriefDesign {
  layoutRecommendation: string;
  imageryStyle: string;
  navigationStyle: string;
  colorUsage: string;
  uniqueDesignElements: string[];
  mobileFirst: boolean;
}

interface BriefBuildInstructions {
  recommendedTechStack: string;
  estimatedPages: number;
  buildOrder: string[];
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
  estimatedBuildTime: string;
}

export interface GeneratedBrief {
  sitemap: BriefSitemapPage[];
  brand: BriefBrand;
  pageContent: BriefPageContent;
  seo: BriefSeo;
  competitors: BriefCompetitors;
  design: BriefDesign;
  buildInstructions: BriefBuildInstructions;
  generatedAt?: string;
}

interface WebBriefDisplayProps {
  brief: GeneratedBrief;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

function isValidHex(color: string | undefined): boolean {
  if (!color) return false;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color);
}

function renderDate(value?: string): string {
  if (!value) return "Date unavailable";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

function priorityBadgeClass(priority: string | undefined): string {
  const normalized = (priority ?? "").toLowerCase();
  if (normalized === "high") return "bg-green-100 text-green-800 border-green-200";
  if (normalized === "medium") return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
}

export function WebBriefDisplay({ brief, onRegenerate, isRegenerating }: WebBriefDisplayProps) {
  const sitemap = Array.isArray(brief?.sitemap) ? brief.sitemap : [];
  const brand = brief?.brand;
  const pageContent = brief?.pageContent;
  const seo = brief?.seo;
  const competitors = brief?.competitors;
  const design = brief?.design;
  const buildInstructions = brief?.buildInstructions;

  return (
    <section className="rounded-xl border border-[rgba(55,50,47,0.12)] bg-white shadow-[0px_2px_8px_rgba(55,50,47,0.08)]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(55,50,47,0.12)] px-4 py-3">
        <div>
          <h4 className="font-serif text-xl text-[#37322F]">Website Brief</h4>
          <p className="text-xs text-[#7C7571]">Generated {renderDate(brief?.generatedAt)}</p>
        </div>
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="inline-flex items-center gap-2 rounded-md border border-[rgba(55,50,47,0.2)] px-3 py-1.5 text-xs font-medium text-[#37322F] hover:bg-[rgba(55,50,47,0.05)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRegenerating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {isRegenerating ? "Generating brief..." : "Regenerate"}
        </button>
      </header>

      <div className="space-y-6 px-4 py-4">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Palette className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">Brand</h5>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[brand?.primaryColor, brand?.secondaryColor, brand?.accentColor].map((color, index) => (
              <div
                key={`swatch-${index}`}
                className="rounded-lg border border-[rgba(55,50,47,0.12)] bg-[#F7F5F3] p-3 text-center"
              >
                <div
                  className="mx-auto mb-2 h-12 w-12 rounded-full border border-[rgba(55,50,47,0.15)]"
                  style={{ backgroundColor: isValidHex(color) ? color : "#E5E7EB" }}
                />
                <p className="text-xs text-[#605A57]">{color ?? "N/A"}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3 text-sm text-[#4f4946]">
              <p>
                <span className="font-medium text-[#37322F]">Heading Font:</span>{" "}
                {brand?.recommendedFonts?.heading ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-[#37322F]">Body Font:</span>{" "}
                {brand?.recommendedFonts?.body ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-[#37322F]">Tone:</span> {brand?.tone ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-[#37322F]">Archetype:</span>{" "}
                {brand?.brandArchetype ?? "N/A"}
              </p>
            </div>
            <div className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3 text-sm text-[#4f4946]">
              <p className="font-medium text-[#37322F]">Voice Guidelines</p>
              <p className="mt-1">{brand?.voiceGuidelines ?? "N/A"}</p>
              <p className="mt-2 font-medium text-[#37322F]">Color Rationale</p>
              <p className="mt-1">{brand?.colorRationale ?? "N/A"}</p>
            </div>
          </div>
        </section>

        <div className="border-t border-[rgba(55,50,47,0.12)]" />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Map className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">Sitemap</h5>
          </div>
          <div className="grid gap-3">
            {sitemap.length === 0 && <p className="text-xs text-[#7C7571]">No sitemap data available.</p>}
            {sitemap.map((page, index) => (
              <article key={`${page?.slug ?? "sitemap"}-${index}`} className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-[#37322F]">
                    {page?.page ?? "Untitled page"} <span className="text-xs text-[#7C7571]">{page?.slug ?? ""}</span>
                  </p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${priorityBadgeClass(page?.priority)}`}
                  >
                    {(page?.priority ?? "low").toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#4f4946]">{page?.purpose ?? "No purpose provided."}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(page?.sections ?? []).map((section, sectionIndex) => (
                    <span
                      key={`${section}-${sectionIndex}`}
                      className="rounded-md bg-[rgba(55,50,47,0.08)] px-2 py-0.5 text-[11px] text-[#4f4946]"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="border-t border-[rgba(55,50,47,0.12)]" />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">Page Content</h5>
          </div>
          <div className="space-y-2">
            <details open className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
              <summary className="cursor-pointer text-sm font-medium text-[#37322F]">Home</summary>
              <div className="mt-2 space-y-1 text-sm text-[#4f4946]">
                <p>
                  <span className="font-medium text-[#37322F]">Headline:</span>{" "}
                  {pageContent?.home?.heroHeadline ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#37322F]">Subheadline:</span>{" "}
                  {pageContent?.home?.heroSubheadline ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#37322F]">CTA:</span> {pageContent?.home?.heroCTA ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#37322F]">Why Us:</span>{" "}
                  {pageContent?.home?.whyUsHeadline ?? "N/A"}
                </p>
                <ul className="list-disc space-y-0.5 pl-4">
                  {(pageContent?.home?.whyUsPoints ?? []).map((point, index) => (
                    <li key={`${point}-${index}`}>{point}</li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
              <summary className="cursor-pointer text-sm font-medium text-[#37322F]">About</summary>
              <div className="mt-2 space-y-1 text-sm text-[#4f4946]">
                <p>
                  <span className="font-medium text-[#37322F]">Headline:</span> {pageContent?.about?.headline ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#37322F]">Story:</span> {pageContent?.about?.story ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#37322F]">Mission:</span> {pageContent?.about?.mission ?? "N/A"}
                </p>
                <div className="space-y-1">
                  {(pageContent?.about?.values ?? []).map((value, index) => (
                    <div key={`${value?.title ?? "value"}-${index}`} className="rounded-md bg-[#F7F5F3] p-2">
                      <p className="font-medium text-[#37322F]">{value?.title ?? "Untitled value"}</p>
                      <p>{value?.description ?? ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <details className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
              <summary className="cursor-pointer text-sm font-medium text-[#37322F]">Services</summary>
              <div className="mt-2 grid gap-2">
                {(pageContent?.services ?? []).length === 0 && (
                  <p className="text-xs text-[#7C7571]">No service content generated.</p>
                )}
                {(pageContent?.services ?? []).map((service, index) => (
                  <article key={`${service?.name ?? "service"}-${index}`} className="rounded-md border border-[rgba(55,50,47,0.1)] p-2 text-sm text-[#4f4946]">
                    <p className="font-medium text-[#37322F]">{service?.name ?? "Untitled service"}</p>
                    <p className="mt-1">{service?.headline ?? ""}</p>
                    <p className="mt-1">{service?.description ?? ""}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4">
                      {(service?.benefits ?? []).map((benefit, benefitIndex) => (
                        <li key={`${benefit}-${benefitIndex}`}>{benefit}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </details>

            <details className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
              <summary className="cursor-pointer text-sm font-medium text-[#37322F]">Contact</summary>
              <div className="mt-2 space-y-1 text-sm text-[#4f4946]">
                <p>
                  <span className="font-medium text-[#37322F]">Headline:</span>{" "}
                  {pageContent?.contact?.headline ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-[#37322F]">Subtext:</span>{" "}
                  {pageContent?.contact?.subtext ?? "N/A"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(pageContent?.contact?.formFields ?? []).map((field, index) => (
                    <span
                      key={`${field}-${index}`}
                      className="rounded-md bg-[rgba(55,50,47,0.08)] px-2 py-0.5 text-[11px] text-[#4f4946]"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </section>

        <div className="border-t border-[rgba(55,50,47,0.12)]" />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">SEO</h5>
          </div>
          <div className="space-y-2">
            <div className="rounded-md border border-[rgba(55,50,47,0.12)] bg-[#F7F5F3] p-2 font-mono text-xs text-[#4f4946]">
              {seo?.metaTitle ?? "No meta title"}
            </div>
            <div className="rounded-md border border-[rgba(55,50,47,0.12)] bg-[#F7F5F3] p-2 font-mono text-xs text-[#4f4946]">
              {seo?.metaDescription ?? "No meta description"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(seo?.primaryKeywords ?? []).map((keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(seo?.secondaryKeywords ?? []).map((keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className="rounded-md bg-[rgba(55,50,47,0.08)] px-2 py-0.5 text-[11px] text-[#4f4946]"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#4f4946]">{seo?.localSeoTips ?? "No local SEO tips provided."}</p>
            <span className="inline-flex rounded-full bg-[#F7F5F3] px-2.5 py-1 text-xs font-medium text-[#37322F]">
              {seo?.schemaType ?? "Schema type unavailable"}
            </span>
          </div>
        </section>

        <div className="border-t border-[rgba(55,50,47,0.12)]" />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">Competitors & Positioning</h5>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {(competitors?.likelyTypes ?? []).map((type, index) => (
                <span
                  key={`${type}-${index}`}
                  className="rounded-md bg-[rgba(55,50,47,0.08)] px-2 py-0.5 text-[11px] text-[#4f4946]"
                >
                  {type}
                </span>
              ))}
            </div>
            <ul className="space-y-1 text-sm text-[#4f4946]">
              {(competitors?.differentiators ?? []).map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-700">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-md border border-[rgba(55,50,47,0.12)] bg-[#F7F5F3] p-3 text-sm text-[#4f4946]">
              {competitors?.positioning ?? "No positioning statement provided."}
            </div>
          </div>
        </section>

        <div className="border-t border-[rgba(55,50,47,0.12)]" />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Palette className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">Design Recommendations</h5>
          </div>
          <div className="space-y-2 text-sm text-[#4f4946]">
            <p>
              <span className="font-medium text-[#37322F]">Layout:</span>{" "}
              {design?.layoutRecommendation ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-[#37322F]">Imagery:</span> {design?.imageryStyle ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-[#37322F]">Navigation:</span>{" "}
              {design?.navigationStyle ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-[#37322F]">Color Usage:</span>{" "}
              {design?.colorUsage ?? "N/A"}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(design?.uniqueDesignElements ?? []).map((item, index) => (
                <article key={`${item}-${index}`} className="rounded-md border border-[rgba(55,50,47,0.12)] bg-[#F7F5F3] p-2">
                  {item}
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-[rgba(55,50,47,0.12)]" />

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Hammer className="h-4 w-4 text-[#37322F]" />
            <h5 className="text-sm font-semibold text-[#37322F]">Build Instructions</h5>
          </div>
          <div className="space-y-2 text-sm text-[#4f4946]">
            <p>
              <span className="font-medium text-[#37322F]">Estimated Pages:</span>{" "}
              {buildInstructions?.estimatedPages ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-[#37322F]">Build Time:</span>{" "}
              {buildInstructions?.estimatedBuildTime ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-[#37322F]">Tech Stack:</span>{" "}
              {buildInstructions?.recommendedTechStack ?? "N/A"}
            </p>
            <p className="font-medium text-[#37322F]">Must-have features</p>
            <ul className="space-y-1">
              {(buildInstructions?.mustHaveFeatures ?? []).map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-700">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium text-[#37322F]">Nice-to-have features</p>
            <ul className="space-y-1">
              {(buildInstructions?.niceToHaveFeatures ?? []).map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#9CA3AF]">○</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium text-[#37322F]">Build order</p>
            <ol className="list-decimal space-y-1 pl-4">
              {(buildInstructions?.buildOrder ?? []).map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </section>
  );
}
