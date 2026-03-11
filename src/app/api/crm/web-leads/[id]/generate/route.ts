import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { getWebLead, updateWebLead, type UpdateWebLeadInput } from "@/lib/crm-web-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const REQUIRED_BRIEF_KEYS = [
  "sitemap",
  "brand",
  "pageContent",
  "seo",
  "competitors",
  "design",
  "buildInstructions",
] as const;

const SYSTEM_PROMPT =
  "You are an expert web design strategist, brand consultant, and copywriter specialising in small business websites. You produce comprehensive, actionable website briefs that AI agents can use to build professional websites from scratch. All copy you write is production-ready - never use placeholders. Always fill gaps using industry best practices when data is missing.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringifyOrFallback(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback;
  try {
    return JSON.stringify(value);
  } catch {
    return fallback;
  }
}

function buildUserPrompt(lead: {
  businessName: string;
  industry: string;
  location: string;
  ownerName: string;
  description: string;
  usp: string;
  targetAudience: string;
  yearsInBusiness: string;
  brandStyle: string;
  fontPreference: string;
  primaryGoal: string;
  ctaText: string;
  pagesNeeded: string[];
  services: unknown;
  testimonials: unknown[];
  teamMembers: unknown[];
  budget: string;
  timeline: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  hasLogo: boolean;
  hasPhotos: boolean;
  inspirationUrls: string[];
  brandColors: string[];
}): string {
  const pagesRequested = lead.pagesNeeded.length > 0 ? lead.pagesNeeded.join(", ") : "standard pages";
  const services = Array.isArray(lead.services)
    ? stringifyOrFallback(lead.services, "Not listed - infer from industry")
    : "Not listed - infer from industry";
  const teamMembers =
    lead.teamMembers.length > 0 ? stringifyOrFallback(lead.teamMembers, "Not provided") : "Not provided";
  const testimonialsSummary =
    lead.testimonials.length > 0 ? `${lead.testimonials.length} testimonials available` : "None yet";
  const inspirationUrls =
    lead.inspirationUrls.length > 0 ? lead.inspirationUrls.join(", ") : "None provided";
  const brandColors =
    lead.brandColors.length > 0
      ? lead.brandColors.join(", ")
      : "Not specified - recommend industry-appropriate colors";

  return `
Generate a complete website brief for the following business. Return ONLY valid JSON matching the schema below.

BUSINESS DATA:
- Business Name: ${lead.businessName}
- Industry: ${lead.industry || "Not specified"}
- Location: ${lead.location || "Not specified"}
- Owner: ${lead.ownerName || "Not specified"}
- Description: ${lead.description || "Not provided - infer from industry"}
- USP: ${lead.usp || "Not provided - suggest one based on industry"}
- Target Audience: ${lead.targetAudience || "Not specified"}
- Years in Business: ${lead.yearsInBusiness || "Not specified"}
- Brand Style Preference: ${lead.brandStyle || "modern"}
- Font Preference: ${lead.fontPreference || "Not specified"}
- Primary Goal: ${lead.primaryGoal || "leads"}
- Preferred CTA: ${lead.ctaText || "Not specified"}
- Pages Requested: ${pagesRequested}
- Services: ${services}
- Testimonials: ${testimonialsSummary}
- Team: ${teamMembers}
- Budget: ${lead.budget || "unknown"}
- Timeline: ${lead.timeline || "flexible"}
- Social Media: Facebook:${lead.socialFacebook || "none"}, Instagram:${lead.socialInstagram || "none"}, LinkedIn:${lead.socialLinkedin || "none"}
- Has Logo: ${String(lead.hasLogo)}
- Has Photos: ${String(lead.hasPhotos)}
- Inspiration URLs: ${inspirationUrls}
- Brand Colors (if specified): ${brandColors}

REQUIRED JSON SCHEMA:
{
  "sitemap": [
    {
      "page": "string (page name)",
      "slug": "string (URL path, e.g. /about)",
      "purpose": "string (1 sentence - what this page achieves)",
      "sections": ["string array of section names"],
      "priority": "high | medium | low"
    }
  ],
  "brand": {
    "primaryColor": "string (hex code)",
    "secondaryColor": "string (hex code)",
    "accentColor": "string (hex code)",
    "colorRationale": "string (why these colors suit this business)",
    "recommendedFonts": {
      "heading": "string (Google Font name)",
      "body": "string (Google Font name)"
    },
    "tone": "string (3-5 adjectives, e.g. Professional, Warm, Trustworthy)",
    "voiceGuidelines": "string (2-3 sentences on how to write for this brand)",
    "brandArchetype": "string (e.g. The Expert, The Caregiver, The Hero)"
  },
  "pageContent": {
    "home": {
      "heroHeadline": "string (compelling, benefit-focused, max 10 words)",
      "heroSubheadline": "string (supporting statement, max 20 words)",
      "heroCTA": "string (CTA button text, max 5 words)",
      "whyUsHeadline": "string",
      "whyUsPoints": ["string", "string", "string"],
      "aboutPreview": "string (2 sentences for homepage about section)"
    },
    "about": {
      "headline": "string",
      "story": "string (3-4 sentences - origin, mission, values)",
      "mission": "string (1 sentence mission statement)",
      "values": [{"title": "string", "description": "string"}]
    },
    "services": [
      {
        "name": "string",
        "headline": "string",
        "description": "string (2-3 sentences)",
        "benefits": ["string", "string", "string"],
        "cta": "string"
      }
    ],
    "contact": {
      "headline": "string",
      "subtext": "string (1-2 sentences encouraging contact)",
      "formFields": ["string array of recommended form fields"]
    }
  },
  "seo": {
    "metaTitle": "string (max 60 chars, includes business name and primary keyword)",
    "metaDescription": "string (max 160 chars, compelling, includes location if relevant)",
    "h1": "string (primary page heading for homepage)",
    "primaryKeywords": ["string array of 5 main keywords"],
    "secondaryKeywords": ["string array of 8-10 long-tail keywords"],
    "localSeoTips": "string (specific advice for this business and location)",
    "schemaType": "string (e.g. LocalBusiness, ProfessionalService, Restaurant)"
  },
  "competitors": {
    "likelyTypes": ["string array of likely competitor types/categories"],
    "differentiators": ["string array of 3-4 ways to stand out"],
    "positioning": "string (1-2 sentence positioning statement)"
  },
  "design": {
    "layoutRecommendation": "string (e.g. Single-page with sticky nav, Multi-page clean grid)",
    "imageryStyle": "string (what kind of photos/images to use)",
    "navigationStyle": "string (e.g. Minimal top nav with CTA button)",
    "colorUsage": "string (how to apply the color palette)",
    "uniqueDesignElements": ["string array of 2-3 design ideas specific to this business"],
    "mobileFirst": true
  },
  "buildInstructions": {
    "recommendedTechStack": "string",
    "estimatedPages": number,
    "buildOrder": ["string array - pages in recommended build order"],
    "mustHaveFeatures": ["string array of essential features"],
    "niceToHaveFeatures": ["string array of optional features"],
    "estimatedBuildTime": "string (e.g. 2-3 days for an experienced developer)"
  }
}
`.trim();
}

function parseDeepSeekBrief(data: unknown): Record<string, unknown> | null {
  if (!isRecord(data) || !Array.isArray(data.choices) || data.choices.length === 0) {
    return null;
  }

  const firstChoice = data.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    return null;
  }

  const content = firstChoice.message.content;
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as unknown;
      return isRecord(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  return isRecord(content) ? content : null;
}

function hasRequiredBriefKeys(brief: Record<string, unknown>): boolean {
  return REQUIRED_BRIEF_KEYS.every((key) => key in brief);
}

export async function POST(request: Request, context: RouteParams) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;
  if (typeof id !== "string" || id.trim().length === 0) {
    return NextResponse.json({ error: "Invalid web lead id" }, { status: 400 });
  }

  let lead;
  try {
    lead = await getWebLead(id);
  } catch {
    return NextResponse.json({ error: "Failed to load web lead" }, { status: 500 });
  }

  if (!lead) {
    return NextResponse.json({ error: "Web lead not found" }, { status: 404 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI generation not configured" }, { status: 503 });
  }

  const userPrompt = buildUserPrompt(lead);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  let deepSeekResponse: Response;
  try {
    deepSeekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000,
      }),
      signal: controller.signal,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const timeoutSuffix = error instanceof Error && error.name === "AbortError" ? " (timeout)" : "";
    console.error(`DeepSeek request failed${timeoutSuffix}:`, errorMessage);
    clearTimeout(timeout);
    return NextResponse.json({ error: "Brief generation failed" }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }

  if (!deepSeekResponse.ok) {
    let responseText = "";
    try {
      responseText = await deepSeekResponse.text();
    } catch {
      responseText = "";
    }
    console.error("DeepSeek request returned non-OK status:", deepSeekResponse.status, responseText);
    return NextResponse.json({ error: "Brief generation failed" }, { status: 500 });
  }

  let deepSeekData: unknown;
  try {
    deepSeekData = (await deepSeekResponse.json()) as unknown;
  } catch {
    return NextResponse.json({ error: "Brief generation failed" }, { status: 500 });
  }

  const parsedBrief = parseDeepSeekBrief(deepSeekData);
  if (!parsedBrief || !hasRequiredBriefKeys(parsedBrief)) {
    return NextResponse.json({ error: "Brief generation failed" }, { status: 500 });
  }

  const pageContent = isRecord(parsedBrief.pageContent) ? parsedBrief.pageContent : null;
  const home = pageContent && isRecord(pageContent.home) ? pageContent.home : null;
  const about = pageContent && isRecord(pageContent.about) ? pageContent.about : null;
  const seo = isRecord(parsedBrief.seo) ? parsedBrief.seo : null;
  const generatedAt = new Date().toISOString();
  const existingAiNotes = readString(lead.aiNotes);
  const aiNote = `[${generatedAt}] Brief generated by AI.`;
  const aiNotes = existingAiNotes.length > 0 ? `${existingAiNotes}\n${aiNote}` : aiNote;

  const updatePayload: UpdateWebLeadInput = {
    researchData: {
      ...parsedBrief,
      generatedAt,
    },
    generatedContent: {
      headline: home ? readString(home.heroHeadline) : "",
      subheadline: home ? readString(home.heroSubheadline) : "",
      aboutText: about ? readString(about.story) : "",
      metaDescription: seo ? readString(seo.metaDescription) : "",
      ctaText: home ? readString(home.heroCTA) : "",
    },
    aiNotes,
  };

  if (lead.buildStage === "intake" || lead.buildStage === "researching") {
    updatePayload.buildStage = "content_gen";
  }

  try {
    const updatedLead = await updateWebLead(id, updatePayload);
    if (!updatedLead) {
      return NextResponse.json({ error: "Web lead not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      brief: parsedBrief,
      lead: updatedLead,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to store generated brief:", errorMessage);
    return NextResponse.json({ error: "Brief generation failed" }, { status: 500 });
  }
}
