import { createClient } from "@supabase/supabase-js";

export type BuildStage =
  | "intake"
  | "researching"
  | "content_gen"
  | "building"
  | "review"
  | "live"
  | "cancelled";

export type WebLeadPriority = "low" | "medium" | "high" | "urgent";
export type WebLeadBudget = "unknown" | "0-500" | "500-1000" | "1000-3000" | "3000+";
export type WebLeadTimeline = "asap" | "1month" | "3months" | "flexible";
export type WebLeadGoal = "leads" | "bookings" | "sales" | "showcase" | "info";
export type BrandStyle =
  | "modern"
  | "traditional"
  | "minimalist"
  | "bold"
  | "playful"
  | "professional"
  | "creative";

export interface WebLeadService {
  name: string;
  description: string;
  price: string;
}

export interface WebLeadTestimonial {
  customerName: string;
  quote: string;
  rating: number;
}

export interface WebLeadTeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface ResearchData {
  competitors: string[];
  keywords: string[];
  insights: string;
}

export interface GeneratedContent {
  headline: string;
  subheadline: string;
  aboutText: string;
  metaDescription: string;
  ctaText: string;
}

export interface WebLead {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialTwitter: string;
  socialTiktok: string;
  brandColors: string[];
  brandStyle: BrandStyle | "";
  fontPreference: string;
  inspirationUrls: string[];
  description: string;
  usp: string;
  targetAudience: string;
  yearsInBusiness: string;
  services: WebLeadService[];
  testimonials: WebLeadTestimonial[];
  reviewUrls: string[];
  certifications: string;
  teamMembers: WebLeadTeamMember[];
  primaryGoal: WebLeadGoal | "";
  ctaText: string;
  pagesNeeded: string[];
  domainName: string;
  budget: WebLeadBudget | "";
  timeline: WebLeadTimeline | "";
  hasLogo: boolean;
  hasPhotos: boolean;
  hasVideos: boolean;
  assetNotes: string;
  buildStage: BuildStage;
  aiNotes: string;
  researchData: ResearchData | null;
  generatedContent: GeneratedContent | null;
  previewUrl: string;
  liveUrl: string;
  source: string;
  assignedTo: string;
  priority: WebLeadPriority;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWebLeadInput
  extends Partial<Omit<WebLead, "id" | "createdAt" | "updatedAt" | "businessName" | "email">> {
  businessName: string;
  email: string;
}

export type UpdateWebLeadInput = Partial<Omit<WebLead, "id" | "createdAt" | "updatedAt">>;

interface DbWebLead {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  social_twitter: string;
  social_tiktok: string;
  brand_colors: unknown;
  brand_style: string;
  font_preference: string;
  inspiration_urls: unknown;
  description: string;
  usp: string;
  target_audience: string;
  years_in_business: string;
  services: unknown;
  testimonials: unknown;
  review_urls: unknown;
  certifications: string;
  team_members: unknown;
  primary_goal: string;
  cta_text: string;
  pages_needed: unknown;
  domain_name: string;
  budget: string;
  timeline: string;
  has_logo: boolean;
  has_photos: boolean;
  has_videos: boolean;
  asset_notes: string;
  build_stage: BuildStage;
  ai_notes: string;
  research_data: unknown;
  generated_content: unknown;
  preview_url: string;
  live_url: string;
  source: string;
  assigned_to: string;
  priority: WebLeadPriority;
  notes: string;
  created_at: string;
  updated_at: string;
}

function getSupabase() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("CRM_SUPABASE_URL and CRM_SUPABASE_SERVICE_ROLE_KEY must be set");
  return createClient(url, key, { auth: { persistSession: false } });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function readServices(value: unknown): WebLeadService[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      if (typeof item.name !== "string") return null;
      if (typeof item.description !== "string") return null;
      if (typeof item.price !== "string") return null;
      return {
        name: item.name,
        description: item.description,
        price: item.price,
      };
    })
    .filter((item): item is WebLeadService => item !== null);
}

function readTestimonials(value: unknown): WebLeadTestimonial[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      if (typeof item.customerName !== "string") return null;
      if (typeof item.quote !== "string") return null;
      if (typeof item.rating !== "number") return null;
      return {
        customerName: item.customerName,
        quote: item.quote,
        rating: item.rating,
      };
    })
    .filter((item): item is WebLeadTestimonial => item !== null);
}

function readTeamMembers(value: unknown): WebLeadTeamMember[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      if (typeof item.name !== "string") return null;
      if (typeof item.role !== "string") return null;
      if (typeof item.bio !== "string") return null;
      return {
        name: item.name,
        role: item.role,
        bio: item.bio,
      };
    })
    .filter((item): item is WebLeadTeamMember => item !== null);
}

function readResearchData(value: unknown): ResearchData | null {
  if (!isRecord(value)) return null;
  const competitors = readStringArray(value.competitors);
  const keywords = readStringArray(value.keywords);
  if (typeof value.insights !== "string") return null;

  return {
    competitors,
    keywords,
    insights: value.insights,
  };
}

function readGeneratedContent(value: unknown): GeneratedContent | null {
  if (!isRecord(value)) return null;
  if (typeof value.headline !== "string") return null;
  if (typeof value.subheadline !== "string") return null;
  if (typeof value.aboutText !== "string") return null;
  if (typeof value.metaDescription !== "string") return null;
  if (typeof value.ctaText !== "string") return null;

  return {
    headline: value.headline,
    subheadline: value.subheadline,
    aboutText: value.aboutText,
    metaDescription: value.metaDescription,
    ctaText: value.ctaText,
  };
}

function toWebLead(row: DbWebLead): WebLead {
  return {
    id: row.id,
    businessName: row.business_name,
    ownerName: row.owner_name,
    email: row.email,
    phone: row.phone,
    industry: row.industry,
    location: row.location,
    socialFacebook: row.social_facebook,
    socialInstagram: row.social_instagram,
    socialLinkedin: row.social_linkedin,
    socialTwitter: row.social_twitter,
    socialTiktok: row.social_tiktok,
    brandColors: readStringArray(row.brand_colors),
    brandStyle: row.brand_style as BrandStyle | "",
    fontPreference: row.font_preference,
    inspirationUrls: readStringArray(row.inspiration_urls),
    description: row.description,
    usp: row.usp,
    targetAudience: row.target_audience,
    yearsInBusiness: row.years_in_business,
    services: readServices(row.services),
    testimonials: readTestimonials(row.testimonials),
    reviewUrls: readStringArray(row.review_urls),
    certifications: row.certifications,
    teamMembers: readTeamMembers(row.team_members),
    primaryGoal: row.primary_goal as WebLeadGoal | "",
    ctaText: row.cta_text,
    pagesNeeded: readStringArray(row.pages_needed),
    domainName: row.domain_name,
    budget: row.budget as WebLeadBudget | "",
    timeline: row.timeline as WebLeadTimeline | "",
    hasLogo: row.has_logo,
    hasPhotos: row.has_photos,
    hasVideos: row.has_videos,
    assetNotes: row.asset_notes,
    buildStage: row.build_stage,
    aiNotes: row.ai_notes,
    researchData: readResearchData(row.research_data),
    generatedContent: readGeneratedContent(row.generated_content),
    previewUrl: row.preview_url,
    liveUrl: row.live_url,
    source: row.source,
    assignedTo: row.assigned_to,
    priority: row.priority,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function setIfDefined(patch: Record<string, unknown>, key: string, value: unknown): void {
  if (value !== undefined) {
    patch[key] = value;
  }
}

function toDbCreate(input: CreateWebLeadInput): Record<string, unknown> {
  const patch: Record<string, unknown> = {
    business_name: input.businessName,
    email: input.email,
  };

  setIfDefined(patch, "owner_name", input.ownerName);
  setIfDefined(patch, "phone", input.phone);
  setIfDefined(patch, "industry", input.industry);
  setIfDefined(patch, "location", input.location);
  setIfDefined(patch, "social_facebook", input.socialFacebook);
  setIfDefined(patch, "social_instagram", input.socialInstagram);
  setIfDefined(patch, "social_linkedin", input.socialLinkedin);
  setIfDefined(patch, "social_twitter", input.socialTwitter);
  setIfDefined(patch, "social_tiktok", input.socialTiktok);
  setIfDefined(patch, "brand_colors", input.brandColors);
  setIfDefined(patch, "brand_style", input.brandStyle);
  setIfDefined(patch, "font_preference", input.fontPreference);
  setIfDefined(patch, "inspiration_urls", input.inspirationUrls);
  setIfDefined(patch, "description", input.description);
  setIfDefined(patch, "usp", input.usp);
  setIfDefined(patch, "target_audience", input.targetAudience);
  setIfDefined(patch, "years_in_business", input.yearsInBusiness);
  setIfDefined(patch, "services", input.services);
  setIfDefined(patch, "testimonials", input.testimonials);
  setIfDefined(patch, "review_urls", input.reviewUrls);
  setIfDefined(patch, "certifications", input.certifications);
  setIfDefined(patch, "team_members", input.teamMembers);
  setIfDefined(patch, "primary_goal", input.primaryGoal);
  setIfDefined(patch, "cta_text", input.ctaText);
  setIfDefined(patch, "pages_needed", input.pagesNeeded);
  setIfDefined(patch, "domain_name", input.domainName);
  setIfDefined(patch, "budget", input.budget);
  setIfDefined(patch, "timeline", input.timeline);
  setIfDefined(patch, "has_logo", input.hasLogo);
  setIfDefined(patch, "has_photos", input.hasPhotos);
  setIfDefined(patch, "has_videos", input.hasVideos);
  setIfDefined(patch, "asset_notes", input.assetNotes);
  setIfDefined(patch, "build_stage", input.buildStage);
  setIfDefined(patch, "ai_notes", input.aiNotes);
  setIfDefined(patch, "research_data", input.researchData);
  setIfDefined(patch, "generated_content", input.generatedContent);
  setIfDefined(patch, "preview_url", input.previewUrl);
  setIfDefined(patch, "live_url", input.liveUrl);
  setIfDefined(patch, "source", input.source);
  setIfDefined(patch, "assigned_to", input.assignedTo);
  setIfDefined(patch, "priority", input.priority);
  setIfDefined(patch, "notes", input.notes);

  return patch;
}

function toDbUpdate(input: UpdateWebLeadInput): Record<string, unknown> {
  const patch: Record<string, unknown> = {};

  setIfDefined(patch, "business_name", input.businessName);
  setIfDefined(patch, "owner_name", input.ownerName);
  setIfDefined(patch, "email", input.email);
  setIfDefined(patch, "phone", input.phone);
  setIfDefined(patch, "industry", input.industry);
  setIfDefined(patch, "location", input.location);
  setIfDefined(patch, "social_facebook", input.socialFacebook);
  setIfDefined(patch, "social_instagram", input.socialInstagram);
  setIfDefined(patch, "social_linkedin", input.socialLinkedin);
  setIfDefined(patch, "social_twitter", input.socialTwitter);
  setIfDefined(patch, "social_tiktok", input.socialTiktok);
  setIfDefined(patch, "brand_colors", input.brandColors);
  setIfDefined(patch, "brand_style", input.brandStyle);
  setIfDefined(patch, "font_preference", input.fontPreference);
  setIfDefined(patch, "inspiration_urls", input.inspirationUrls);
  setIfDefined(patch, "description", input.description);
  setIfDefined(patch, "usp", input.usp);
  setIfDefined(patch, "target_audience", input.targetAudience);
  setIfDefined(patch, "years_in_business", input.yearsInBusiness);
  setIfDefined(patch, "services", input.services);
  setIfDefined(patch, "testimonials", input.testimonials);
  setIfDefined(patch, "review_urls", input.reviewUrls);
  setIfDefined(patch, "certifications", input.certifications);
  setIfDefined(patch, "team_members", input.teamMembers);
  setIfDefined(patch, "primary_goal", input.primaryGoal);
  setIfDefined(patch, "cta_text", input.ctaText);
  setIfDefined(patch, "pages_needed", input.pagesNeeded);
  setIfDefined(patch, "domain_name", input.domainName);
  setIfDefined(patch, "budget", input.budget);
  setIfDefined(patch, "timeline", input.timeline);
  setIfDefined(patch, "has_logo", input.hasLogo);
  setIfDefined(patch, "has_photos", input.hasPhotos);
  setIfDefined(patch, "has_videos", input.hasVideos);
  setIfDefined(patch, "asset_notes", input.assetNotes);
  setIfDefined(patch, "build_stage", input.buildStage);
  setIfDefined(patch, "ai_notes", input.aiNotes);
  setIfDefined(patch, "research_data", input.researchData);
  setIfDefined(patch, "generated_content", input.generatedContent);
  setIfDefined(patch, "preview_url", input.previewUrl);
  setIfDefined(patch, "live_url", input.liveUrl);
  setIfDefined(patch, "source", input.source);
  setIfDefined(patch, "assigned_to", input.assignedTo);
  setIfDefined(patch, "priority", input.priority);
  setIfDefined(patch, "notes", input.notes);

  return patch;
}

export async function getWebLeads(filter?: {
  buildStage?: BuildStage;
  assignedTo?: string;
  priority?: WebLeadPriority;
}): Promise<WebLead[]> {
  const supabase = getSupabase();

  let query = supabase.from("crm_web_leads").select("*").order("created_at", { ascending: false });

  if (filter?.buildStage) query = query.eq("build_stage", filter.buildStage);
  if (filter?.assignedTo) query = query.eq("assigned_to", filter.assignedTo);
  if (filter?.priority) query = query.eq("priority", filter.priority);

  const { data, error } = await query;
  if (error) throw error;

  return (data as DbWebLead[]).map(toWebLead);
}

export async function getWebLead(id: string): Promise<WebLead | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("crm_web_leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? toWebLead(data as DbWebLead) : null;
}

export async function createWebLead(input: CreateWebLeadInput): Promise<WebLead> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("crm_web_leads")
    .insert(toDbCreate(input))
    .select()
    .single();

  if (error) throw error;
  return toWebLead(data as DbWebLead);
}

export async function updateWebLead(id: string, input: UpdateWebLeadInput): Promise<WebLead | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("crm_web_leads")
    .update(toDbUpdate(input))
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data ? toWebLead(data as DbWebLead) : null;
}

export async function deleteWebLead(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase.from("crm_web_leads").delete().eq("id", id);
  if (error) throw error;
  return true;
}
