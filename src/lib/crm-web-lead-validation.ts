import type {
  BrandStyle,
  BuildStage,
  CreateWebLeadInput,
  GeneratedContent,
  ResearchData,
  UpdateWebLeadInput,
  WebLeadBudget,
  WebLeadGoal,
  WebLeadPriority,
  WebLeadService,
  WebLeadTeamMember,
  WebLeadTestimonial,
  WebLeadTimeline,
} from "@/lib/crm-web-store";

const BUILD_STAGES: BuildStage[] = [
  "intake",
  "researching",
  "content_gen",
  "building",
  "review",
  "live",
  "cancelled",
];

const PRIORITIES: WebLeadPriority[] = ["low", "medium", "high", "urgent"];
const BUDGETS: WebLeadBudget[] = ["unknown", "0-500", "500-1000", "1000-3000", "3000+"];
const TIMELINES: WebLeadTimeline[] = ["asap", "1month", "3months", "flexible"];
const GOALS: WebLeadGoal[] = ["leads", "bookings", "sales", "showcase", "info"];
const BRAND_STYLES: BrandStyle[] = [
  "modern",
  "traditional",
  "minimalist",
  "bold",
  "playful",
  "professional",
  "creative",
];

const PAGE_OPTIONS = [
  "home",
  "about",
  "services",
  "contact",
  "gallery",
  "blog",
  "booking",
  "faq",
  "portfolio",
  "testimonials",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asRecord(data: unknown): Record<string, unknown> | null {
  if (typeof data !== "object" || data === null) return null;
  return data as Record<string, unknown>;
}

function sanitizeString(input: string): string {
  const withoutScripts = input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");

  return withoutScripts.replace(/<[^>]*>/g, "").replace(/\u0000/g, "").trim();
}

function hasKey(record: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function readString(record: Record<string, unknown>, camelKey: string, snakeKey?: string): unknown {
  if (hasKey(record, camelKey)) return record[camelKey];
  if (snakeKey && hasKey(record, snakeKey)) return record[snakeKey];
  return undefined;
}

function parseRequiredString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const sanitized = sanitizeString(value);
  return sanitized.length > 0 ? sanitized : null;
}

function parseOptionalString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return sanitizeString(value);
}

function parseEmail(value: unknown): string | null {
  const email = parseRequiredString(value);
  if (!email) return null;
  return EMAIL_REGEX.test(email) ? email : null;
}

function parseEnum<T extends string>(
  value: unknown,
  options: T[],
  allowEmpty = false,
): T | "" | null {
  if (typeof value !== "string") return null;
  const cleaned = sanitizeString(value);
  if (allowEmpty && cleaned === "") return "";
  return options.includes(cleaned as T) ? (cleaned as T) : null;
}

function parseBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function parseStringArray(value: unknown): string[] | null {
  if (Array.isArray(value)) {
    const parsed: string[] = [];
    for (const item of value) {
      if (typeof item !== "string") return null;
      const sanitized = sanitizeString(item);
      if (sanitized.length > 0) parsed.push(sanitized);
    }
    return parsed;
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => sanitizeString(item))
      .filter((item) => item.length > 0);
  }

  return null;
}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function parseHexColorArray(value: unknown): string[] | null {
  const parsed = parseStringArray(value);
  if (!parsed) return null;

  for (const color of parsed) {
    if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)) {
      return null;
    }
  }

  return parsed;
}

function parseUrlArray(value: unknown): string[] | null {
  const parsed = parseStringArray(value);
  if (!parsed) return null;

  for (const url of parsed) {
    if (!isValidHttpUrl(url)) return null;
  }

  return parsed;
}

function parsePagesNeeded(value: unknown): string[] | null {
  const parsed = parseStringArray(value);
  if (!parsed) return null;

  for (const page of parsed) {
    if (!PAGE_OPTIONS.includes(page as (typeof PAGE_OPTIONS)[number])) return null;
  }

  return parsed;
}

function parseServices(value: unknown): WebLeadService[] | null {
  if (!Array.isArray(value)) return null;

  const parsed: WebLeadService[] = [];
  for (const item of value) {
    const record = asRecord(item);
    if (!record) return null;

    const name = parseRequiredString(record.name);
    const description = parseOptionalString(record.description);
    const price = parseOptionalString(record.price);
    if (!name || description === null || price === null) return null;

    parsed.push({ name, description, price });
  }

  return parsed;
}

function parseTestimonials(value: unknown): WebLeadTestimonial[] | null {
  if (!Array.isArray(value)) return null;

  const parsed: WebLeadTestimonial[] = [];
  for (const item of value) {
    const record = asRecord(item);
    if (!record) return null;

    const customerName = parseRequiredString(record.customerName);
    const quote = parseRequiredString(record.quote);
    const rating = record.rating;

    if (!customerName || !quote || typeof rating !== "number") return null;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return null;

    parsed.push({ customerName, quote, rating });
  }

  return parsed;
}

function parseTeamMembers(value: unknown): WebLeadTeamMember[] | null {
  if (!Array.isArray(value)) return null;

  const parsed: WebLeadTeamMember[] = [];
  for (const item of value) {
    const record = asRecord(item);
    if (!record) return null;

    const name = parseRequiredString(record.name);
    const role = parseRequiredString(record.role);
    const bio = parseOptionalString(record.bio);
    if (!name || !role || bio === null) return null;

    parsed.push({ name, role, bio });
  }

  return parsed;
}

function parseResearchData(value: unknown): ResearchData | null {
  if (value === null) return null;

  const record = asRecord(value);
  if (!record) return null;
  return record;
}

function parseGeneratedContent(value: unknown): GeneratedContent | null {
  if (value === null) return null;

  const record = asRecord(value);
  if (!record) return null;

  const headline = parseOptionalString(record.headline);
  const subheadline = parseOptionalString(record.subheadline);
  const aboutText = parseOptionalString(record.aboutText);
  const metaDescription = parseOptionalString(record.metaDescription);
  const ctaText = parseOptionalString(record.ctaText);

  if (
    headline === null ||
    subheadline === null ||
    aboutText === null ||
    metaDescription === null ||
    ctaText === null
  ) {
    return null;
  }

  return {
    headline,
    subheadline,
    aboutText,
    metaDescription,
    ctaText,
  };
}

function parseBasePayload(data: unknown, requireBusinessAndEmail: boolean): UpdateWebLeadInput | null {
  const payload = asRecord(data);
  if (!payload) return null;

  const update: UpdateWebLeadInput = {};

  const businessNameValue = readString(payload, "businessName", "business_name");
  if (businessNameValue !== undefined) {
    const businessName = parseRequiredString(businessNameValue);
    if (!businessName) return null;
    update.businessName = businessName;
  } else if (requireBusinessAndEmail) {
    return null;
  }

  const emailValue = readString(payload, "email");
  if (emailValue !== undefined) {
    const email = parseEmail(emailValue);
    if (!email) return null;
    update.email = email;
  } else if (requireBusinessAndEmail) {
    return null;
  }

  const ownerNameValue = readString(payload, "ownerName", "owner_name");
  if (ownerNameValue !== undefined) {
    const ownerName = parseOptionalString(ownerNameValue);
    if (ownerName === null) return null;
    update.ownerName = ownerName;
  }

  const phoneValue = readString(payload, "phone");
  if (phoneValue !== undefined) {
    const phone = parseOptionalString(phoneValue);
    if (phone === null) return null;
    update.phone = phone;
  }

  const industryValue = readString(payload, "industry");
  if (industryValue !== undefined) {
    const industry = parseOptionalString(industryValue);
    if (industry === null) return null;
    update.industry = industry;
  }

  const locationValue = readString(payload, "location");
  if (locationValue !== undefined) {
    const location = parseOptionalString(locationValue);
    if (location === null) return null;
    update.location = location;
  }

  const socialFacebookValue = readString(payload, "socialFacebook", "social_facebook");
  if (socialFacebookValue !== undefined) {
    const socialFacebook = parseOptionalString(socialFacebookValue);
    if (socialFacebook === null) return null;
    update.socialFacebook = socialFacebook;
  }

  const socialInstagramValue = readString(payload, "socialInstagram", "social_instagram");
  if (socialInstagramValue !== undefined) {
    const socialInstagram = parseOptionalString(socialInstagramValue);
    if (socialInstagram === null) return null;
    update.socialInstagram = socialInstagram;
  }

  const socialLinkedinValue = readString(payload, "socialLinkedin", "social_linkedin");
  if (socialLinkedinValue !== undefined) {
    const socialLinkedin = parseOptionalString(socialLinkedinValue);
    if (socialLinkedin === null) return null;
    update.socialLinkedin = socialLinkedin;
  }

  const socialTwitterValue = readString(payload, "socialTwitter", "social_twitter");
  if (socialTwitterValue !== undefined) {
    const socialTwitter = parseOptionalString(socialTwitterValue);
    if (socialTwitter === null) return null;
    update.socialTwitter = socialTwitter;
  }

  const socialTiktokValue = readString(payload, "socialTiktok", "social_tiktok");
  if (socialTiktokValue !== undefined) {
    const socialTiktok = parseOptionalString(socialTiktokValue);
    if (socialTiktok === null) return null;
    update.socialTiktok = socialTiktok;
  }

  const brandColorsValue = readString(payload, "brandColors", "brand_colors");
  if (brandColorsValue !== undefined) {
    const brandColors = parseHexColorArray(brandColorsValue);
    if (!brandColors) return null;
    update.brandColors = brandColors;
  }

  const brandStyleValue = readString(payload, "brandStyle", "brand_style");
  if (brandStyleValue !== undefined) {
    const brandStyle = parseEnum(brandStyleValue, BRAND_STYLES, true);
    if (brandStyle === null) return null;
    update.brandStyle = brandStyle;
  }

  const fontPreferenceValue = readString(payload, "fontPreference", "font_preference");
  if (fontPreferenceValue !== undefined) {
    const fontPreference = parseOptionalString(fontPreferenceValue);
    if (fontPreference === null) return null;
    update.fontPreference = fontPreference;
  }

  const inspirationUrlsValue = readString(payload, "inspirationUrls", "inspiration_urls");
  if (inspirationUrlsValue !== undefined) {
    const inspirationUrls = parseUrlArray(inspirationUrlsValue);
    if (!inspirationUrls) return null;
    update.inspirationUrls = inspirationUrls;
  }

  const descriptionValue = readString(payload, "description");
  if (descriptionValue !== undefined) {
    const description = parseOptionalString(descriptionValue);
    if (description === null) return null;
    update.description = description;
  }

  const uspValue = readString(payload, "usp");
  if (uspValue !== undefined) {
    const usp = parseOptionalString(uspValue);
    if (usp === null) return null;
    update.usp = usp;
  }

  const targetAudienceValue = readString(payload, "targetAudience", "target_audience");
  if (targetAudienceValue !== undefined) {
    const targetAudience = parseOptionalString(targetAudienceValue);
    if (targetAudience === null) return null;
    update.targetAudience = targetAudience;
  }

  const yearsInBusinessValue = readString(payload, "yearsInBusiness", "years_in_business");
  if (yearsInBusinessValue !== undefined) {
    const yearsInBusiness = parseOptionalString(yearsInBusinessValue);
    if (yearsInBusiness === null) return null;
    update.yearsInBusiness = yearsInBusiness;
  }

  const servicesValue = readString(payload, "services");
  if (servicesValue !== undefined) {
    const services = parseServices(servicesValue);
    if (!services) return null;
    update.services = services;
  }

  const testimonialsValue = readString(payload, "testimonials");
  if (testimonialsValue !== undefined) {
    const testimonials = parseTestimonials(testimonialsValue);
    if (!testimonials) return null;
    update.testimonials = testimonials;
  }

  const reviewUrlsValue = readString(payload, "reviewUrls", "review_urls");
  if (reviewUrlsValue !== undefined) {
    const reviewUrls = parseUrlArray(reviewUrlsValue);
    if (!reviewUrls) return null;
    update.reviewUrls = reviewUrls;
  }

  const certificationsValue = readString(payload, "certifications");
  if (certificationsValue !== undefined) {
    const certifications = parseOptionalString(certificationsValue);
    if (certifications === null) return null;
    update.certifications = certifications;
  }

  const teamMembersValue = readString(payload, "teamMembers", "team_members");
  if (teamMembersValue !== undefined) {
    const teamMembers = parseTeamMembers(teamMembersValue);
    if (!teamMembers) return null;
    update.teamMembers = teamMembers;
  }

  const primaryGoalValue = readString(payload, "primaryGoal", "primary_goal");
  if (primaryGoalValue !== undefined) {
    const primaryGoal = parseEnum(primaryGoalValue, GOALS, true);
    if (primaryGoal === null) return null;
    update.primaryGoal = primaryGoal;
  }

  const ctaTextValue = readString(payload, "ctaText", "cta_text");
  if (ctaTextValue !== undefined) {
    const ctaText = parseOptionalString(ctaTextValue);
    if (ctaText === null) return null;
    update.ctaText = ctaText;
  }

  const pagesNeededValue = readString(payload, "pagesNeeded", "pages_needed");
  if (pagesNeededValue !== undefined) {
    const pagesNeeded = parsePagesNeeded(pagesNeededValue);
    if (!pagesNeeded) return null;
    update.pagesNeeded = pagesNeeded;
  }

  const domainNameValue = readString(payload, "domainName", "domain_name");
  if (domainNameValue !== undefined) {
    const domainName = parseOptionalString(domainNameValue);
    if (domainName === null) return null;
    update.domainName = domainName;
  }

  const budgetValue = readString(payload, "budget");
  if (budgetValue !== undefined) {
    const budget = parseEnum(budgetValue, BUDGETS, true);
    if (budget === null) return null;
    update.budget = budget;
  }

  const timelineValue = readString(payload, "timeline");
  if (timelineValue !== undefined) {
    const timeline = parseEnum(timelineValue, TIMELINES, true);
    if (timeline === null) return null;
    update.timeline = timeline;
  }

  const hasLogoValue = readString(payload, "hasLogo", "has_logo");
  if (hasLogoValue !== undefined) {
    const hasLogo = parseBoolean(hasLogoValue);
    if (hasLogo === null) return null;
    update.hasLogo = hasLogo;
  }

  const hasPhotosValue = readString(payload, "hasPhotos", "has_photos");
  if (hasPhotosValue !== undefined) {
    const hasPhotos = parseBoolean(hasPhotosValue);
    if (hasPhotos === null) return null;
    update.hasPhotos = hasPhotos;
  }

  const hasVideosValue = readString(payload, "hasVideos", "has_videos");
  if (hasVideosValue !== undefined) {
    const hasVideos = parseBoolean(hasVideosValue);
    if (hasVideos === null) return null;
    update.hasVideos = hasVideos;
  }

  const assetNotesValue = readString(payload, "assetNotes", "asset_notes");
  if (assetNotesValue !== undefined) {
    const assetNotes = parseOptionalString(assetNotesValue);
    if (assetNotes === null) return null;
    update.assetNotes = assetNotes;
  }

  const buildStageValue = readString(payload, "buildStage", "build_stage");
  if (buildStageValue !== undefined) {
    const buildStage = parseEnum(buildStageValue, BUILD_STAGES);
    if (!buildStage) return null;
    update.buildStage = buildStage;
  }

  const aiNotesValue = readString(payload, "aiNotes", "ai_notes");
  if (aiNotesValue !== undefined) {
    const aiNotes = parseOptionalString(aiNotesValue);
    if (aiNotes === null) return null;
    update.aiNotes = aiNotes;
  }

  const researchDataValue = readString(payload, "researchData", "research_data");
  if (researchDataValue !== undefined) {
    const researchData = parseResearchData(researchDataValue);
    if (researchDataValue !== null && !researchData) return null;
    update.researchData = researchData;
  }

  const generatedContentValue = readString(payload, "generatedContent", "generated_content");
  if (generatedContentValue !== undefined) {
    const generatedContent = parseGeneratedContent(generatedContentValue);
    if (generatedContentValue !== null && !generatedContent) return null;
    update.generatedContent = generatedContent;
  }

  const previewUrlValue = readString(payload, "previewUrl", "preview_url");
  if (previewUrlValue !== undefined) {
    const previewUrl = parseOptionalString(previewUrlValue);
    if (previewUrl === null) return null;
    if (previewUrl.length > 0 && !isValidHttpUrl(previewUrl)) return null;
    update.previewUrl = previewUrl;
  }

  const liveUrlValue = readString(payload, "liveUrl", "live_url");
  if (liveUrlValue !== undefined) {
    const liveUrl = parseOptionalString(liveUrlValue);
    if (liveUrl === null) return null;
    if (liveUrl.length > 0 && !isValidHttpUrl(liveUrl)) return null;
    update.liveUrl = liveUrl;
  }

  const sourceValue = readString(payload, "source");
  if (sourceValue !== undefined) {
    const source = parseOptionalString(sourceValue);
    if (source === null) return null;
    update.source = source;
  }

  const assignedToValue = readString(payload, "assignedTo", "assigned_to");
  if (assignedToValue !== undefined) {
    const assignedTo = parseOptionalString(assignedToValue);
    if (assignedTo === null) return null;
    update.assignedTo = assignedTo;
  }

  const priorityValue = readString(payload, "priority");
  if (priorityValue !== undefined) {
    const priority = parseEnum(priorityValue, PRIORITIES);
    if (!priority) return null;
    update.priority = priority;
  }

  const notesValue = readString(payload, "notes");
  if (notesValue !== undefined) {
    const notes = parseOptionalString(notesValue);
    if (notes === null) return null;
    update.notes = notes;
  }

  return update;
}

export function parseCreateWebLeadPayload(body: unknown): CreateWebLeadInput | null {
  const parsed = parseBasePayload(body, true);
  if (!parsed || !parsed.businessName || !parsed.email) return null;

  return {
    businessName: parsed.businessName,
    email: parsed.email,
    ownerName: parsed.ownerName,
    phone: parsed.phone,
    industry: parsed.industry,
    location: parsed.location,
    socialFacebook: parsed.socialFacebook,
    socialInstagram: parsed.socialInstagram,
    socialLinkedin: parsed.socialLinkedin,
    socialTwitter: parsed.socialTwitter,
    socialTiktok: parsed.socialTiktok,
    brandColors: parsed.brandColors,
    brandStyle: parsed.brandStyle,
    fontPreference: parsed.fontPreference,
    inspirationUrls: parsed.inspirationUrls,
    description: parsed.description,
    usp: parsed.usp,
    targetAudience: parsed.targetAudience,
    yearsInBusiness: parsed.yearsInBusiness,
    services: parsed.services,
    testimonials: parsed.testimonials,
    reviewUrls: parsed.reviewUrls,
    certifications: parsed.certifications,
    teamMembers: parsed.teamMembers,
    primaryGoal: parsed.primaryGoal,
    ctaText: parsed.ctaText,
    pagesNeeded: parsed.pagesNeeded,
    domainName: parsed.domainName,
    budget: parsed.budget,
    timeline: parsed.timeline,
    hasLogo: parsed.hasLogo,
    hasPhotos: parsed.hasPhotos,
    hasVideos: parsed.hasVideos,
    assetNotes: parsed.assetNotes,
    buildStage: parsed.buildStage,
    aiNotes: parsed.aiNotes,
    researchData: parsed.researchData,
    generatedContent: parsed.generatedContent,
    previewUrl: parsed.previewUrl,
    liveUrl: parsed.liveUrl,
    source: parsed.source,
    assignedTo: parsed.assignedTo,
    priority: parsed.priority,
    notes: parsed.notes,
  };
}

export function parseUpdateWebLeadPayload(body: unknown): UpdateWebLeadInput | null {
  return parseBasePayload(body, false);
}

const AGENT_ALLOWED_KEYS = new Set([
  "build_stage",
  "ai_notes",
  "research_data",
  "generated_content",
  "preview_url",
  "live_url",
]);

export function parseAgentUpdatePayload(body: unknown): UpdateWebLeadInput | null {
  const payload = asRecord(body);
  if (!payload) return null;

  for (const key of Object.keys(payload)) {
    if (!AGENT_ALLOWED_KEYS.has(key)) {
      return null;
    }
  }

  const update: UpdateWebLeadInput = {};

  if (hasKey(payload, "build_stage")) {
    const buildStage = parseEnum(payload.build_stage, BUILD_STAGES);
    if (!buildStage) return null;
    update.buildStage = buildStage;
  }

  if (hasKey(payload, "ai_notes")) {
    const aiNotes = parseOptionalString(payload.ai_notes);
    if (aiNotes === null) return null;
    update.aiNotes = aiNotes;
  }

  if (hasKey(payload, "research_data")) {
    const researchData = parseResearchData(payload.research_data);
    if (payload.research_data !== null && !researchData) return null;
    update.researchData = researchData;
  }

  if (hasKey(payload, "generated_content")) {
    const generatedContent = parseGeneratedContent(payload.generated_content);
    if (payload.generated_content !== null && !generatedContent) return null;
    update.generatedContent = generatedContent;
  }

  if (hasKey(payload, "preview_url")) {
    const previewUrl = parseOptionalString(payload.preview_url);
    if (previewUrl === null) return null;
    if (previewUrl.length > 0 && !isValidHttpUrl(previewUrl)) return null;
    update.previewUrl = previewUrl;
  }

  if (hasKey(payload, "live_url")) {
    const liveUrl = parseOptionalString(payload.live_url);
    if (liveUrl === null) return null;
    if (liveUrl.length > 0 && !isValidHttpUrl(liveUrl)) return null;
    update.liveUrl = liveUrl;
  }

  return update;
}
