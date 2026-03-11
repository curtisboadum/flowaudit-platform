"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type BrandStyle,
  type BuildStage,
  type CreateWebLeadInput,
  type WebLead,
  type WebLeadBudget,
  type WebLeadGoal,
  type WebLeadPriority,
  type WebLeadTimeline,
} from "@/lib/crm-web-store";

type DrawerMode = "create" | "edit";
type DrawerTab = "business" | "brand" | "content" | "project" | "workflow";

type WebLeadFormValues = Omit<WebLead, "id" | "createdAt" | "updatedAt">;

interface WebLeadDrawerProps {
  open: boolean;
  mode: DrawerMode;
  lead: WebLead | null;
  isAdmin: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (data: CreateWebLeadInput) => void;
}

const BUILD_STAGES: BuildStage[] = [
  "intake",
  "researching",
  "content_gen",
  "building",
  "review",
  "live",
  "cancelled",
];

const BUILD_STAGE_LABELS: Record<BuildStage, string> = {
  intake: "Intake",
  researching: "Researching",
  content_gen: "Content Gen",
  building: "Building",
  review: "Review",
  live: "Live",
  cancelled: "Cancelled",
};

const PRIORITIES: WebLeadPriority[] = ["low", "medium", "high", "urgent"];
const BUDGETS: Array<WebLeadBudget | ""> = ["", "unknown", "0-500", "500-1000", "1000-3000", "3000+"];
const TIMELINES: Array<WebLeadTimeline | ""> = ["", "asap", "1month", "3months", "flexible"];
const GOALS: Array<WebLeadGoal | ""> = ["", "leads", "bookings", "sales", "showcase", "info"];
const BRAND_STYLES: Array<BrandStyle | ""> = [
  "",
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

const TAB_OPTIONS: Array<{ id: DrawerTab; label: string }> = [
  { id: "business", label: "Business" },
  { id: "brand", label: "Brand" },
  { id: "content", label: "Content" },
  { id: "project", label: "Project" },
  { id: "workflow", label: "AI Workflow" },
];

function getInitialValues(): WebLeadFormValues {
  return {
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    industry: "",
    location: "",
    socialFacebook: "",
    socialInstagram: "",
    socialLinkedin: "",
    socialTwitter: "",
    socialTiktok: "",
    brandColors: [],
    brandStyle: "",
    fontPreference: "",
    inspirationUrls: [],
    description: "",
    usp: "",
    targetAudience: "",
    yearsInBusiness: "",
    services: [],
    testimonials: [],
    reviewUrls: [],
    certifications: "",
    teamMembers: [],
    primaryGoal: "",
    ctaText: "",
    pagesNeeded: [],
    domainName: "",
    budget: "",
    timeline: "",
    hasLogo: false,
    hasPhotos: false,
    hasVideos: false,
    assetNotes: "",
    buildStage: "intake",
    aiNotes: "",
    researchData: null,
    generatedContent: null,
    previewUrl: "",
    liveUrl: "",
    source: "",
    assignedTo: "admin",
    priority: "medium",
    notes: "",
  };
}

export function WebLeadDrawer({
  open,
  mode,
  lead,
  isAdmin,
  isSaving,
  onClose,
  onSubmit,
}: WebLeadDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>("business");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [formValues, setFormValues] = useState<WebLeadFormValues>(() => getInitialValues());

  const isWorkflowEditable = isAdmin;

  useEffect(() => {
    if (mode === "edit" && lead) {
      setFormValues({
        businessName: lead.businessName,
        ownerName: lead.ownerName,
        email: lead.email,
        phone: lead.phone,
        industry: lead.industry,
        location: lead.location,
        socialFacebook: lead.socialFacebook,
        socialInstagram: lead.socialInstagram,
        socialLinkedin: lead.socialLinkedin,
        socialTwitter: lead.socialTwitter,
        socialTiktok: lead.socialTiktok,
        brandColors: lead.brandColors,
        brandStyle: lead.brandStyle,
        fontPreference: lead.fontPreference,
        inspirationUrls: lead.inspirationUrls,
        description: lead.description,
        usp: lead.usp,
        targetAudience: lead.targetAudience,
        yearsInBusiness: lead.yearsInBusiness,
        services: lead.services,
        testimonials: lead.testimonials,
        reviewUrls: lead.reviewUrls,
        certifications: lead.certifications,
        teamMembers: lead.teamMembers,
        primaryGoal: lead.primaryGoal,
        ctaText: lead.ctaText,
        pagesNeeded: lead.pagesNeeded,
        domainName: lead.domainName,
        budget: lead.budget,
        timeline: lead.timeline,
        hasLogo: lead.hasLogo,
        hasPhotos: lead.hasPhotos,
        hasVideos: lead.hasVideos,
        assetNotes: lead.assetNotes,
        buildStage: lead.buildStage,
        aiNotes: lead.aiNotes,
        researchData: lead.researchData,
        generatedContent: lead.generatedContent,
        previewUrl: lead.previewUrl,
        liveUrl: lead.liveUrl,
        source: lead.source,
        assignedTo: lead.assignedTo,
        priority: lead.priority,
        notes: lead.notes,
      });
      setActiveTab("business");
      setCopyStatus("idle");
      return;
    }

    setFormValues(getInitialValues());
    setActiveTab("business");
    setCopyStatus("idle");
  }, [lead, mode, open]);

  function updateField<K extends keyof WebLeadFormValues>(key: K, value: WebLeadFormValues[K]) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

  function togglePage(page: (typeof PAGE_OPTIONS)[number]) {
    setFormValues((prev) => {
      const exists = prev.pagesNeeded.includes(page);
      if (exists) {
        return {
          ...prev,
          pagesNeeded: prev.pagesNeeded.filter((item) => item !== page),
        };
      }

      return {
        ...prev,
        pagesNeeded: [...prev.pagesNeeded, page],
      };
    });
  }

  function updateBrandColorsFromInput(value: string) {
    updateField(
      "brandColors",
      value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    );
  }

  function updateInspirationUrlsFromInput(value: string) {
    updateField(
      "inspirationUrls",
      value
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    );
  }

  function updateReviewUrlsFromInput(value: string) {
    updateField(
      "reviewUrls",
      value
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    );
  }

  function addService() {
    setFormValues((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", description: "", price: "" }],
    }));
  }

  function removeService(index: number) {
    setFormValues((prev) => ({
      ...prev,
      services: prev.services.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateService(index: number, key: "name" | "description" | "price", value: string) {
    setFormValues((prev) => ({
      ...prev,
      services: prev.services.map((service, itemIndex) =>
        itemIndex === index
          ? {
              ...service,
              [key]: value,
            }
          : service,
      ),
    }));
  }

  function addTestimonial() {
    setFormValues((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { customerName: "", quote: "", rating: 5 }],
    }));
  }

  function removeTestimonial(index: number) {
    setFormValues((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateTestimonial(index: number, key: "customerName" | "quote", value: string) {
    setFormValues((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, itemIndex) =>
        itemIndex === index
          ? {
              ...testimonial,
              [key]: value,
            }
          : testimonial,
      ),
    }));
  }

  function updateTestimonialRating(index: number, ratingValue: string) {
    const parsed = Number.parseInt(ratingValue, 10);
    const rating = Number.isNaN(parsed) ? 5 : Math.max(1, Math.min(5, parsed));

    setFormValues((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, itemIndex) =>
        itemIndex === index
          ? {
              ...testimonial,
              rating,
            }
          : testimonial,
      ),
    }));
  }

  function addTeamMember() {
    setFormValues((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", role: "", bio: "" }],
    }));
  }

  function removeTeamMember(index: number) {
    setFormValues((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateTeamMember(index: number, key: "name" | "role" | "bio", value: string) {
    setFormValues((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, itemIndex) =>
        itemIndex === index
          ? {
              ...member,
              [key]: value,
            }
          : member,
      ),
    }));
  }

  async function handleCopyAgentContext() {
    const payload = {
      ...(lead ? { id: lead.id } : {}),
      ...formValues,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CreateWebLeadInput = {
      businessName: formValues.businessName,
      email: formValues.email,
      ownerName: formValues.ownerName,
      phone: formValues.phone,
      industry: formValues.industry,
      location: formValues.location,
      socialFacebook: formValues.socialFacebook,
      socialInstagram: formValues.socialInstagram,
      socialLinkedin: formValues.socialLinkedin,
      socialTwitter: formValues.socialTwitter,
      socialTiktok: formValues.socialTiktok,
      brandColors: formValues.brandColors,
      brandStyle: formValues.brandStyle,
      fontPreference: formValues.fontPreference,
      inspirationUrls: formValues.inspirationUrls,
      description: formValues.description,
      usp: formValues.usp,
      targetAudience: formValues.targetAudience,
      yearsInBusiness: formValues.yearsInBusiness,
      services: formValues.services,
      testimonials: formValues.testimonials,
      reviewUrls: formValues.reviewUrls,
      certifications: formValues.certifications,
      teamMembers: formValues.teamMembers,
      primaryGoal: formValues.primaryGoal,
      ctaText: formValues.ctaText,
      pagesNeeded: formValues.pagesNeeded,
      domainName: formValues.domainName,
      budget: formValues.budget,
      timeline: formValues.timeline,
      hasLogo: formValues.hasLogo,
      hasPhotos: formValues.hasPhotos,
      hasVideos: formValues.hasVideos,
      assetNotes: formValues.assetNotes,
      buildStage: formValues.buildStage,
      aiNotes: formValues.aiNotes,
      researchData: formValues.researchData,
      generatedContent: formValues.generatedContent,
      previewUrl: formValues.previewUrl,
      liveUrl: formValues.liveUrl,
      source: formValues.source,
      assignedTo: formValues.assignedTo,
      priority: formValues.priority,
      notes: formValues.notes,
    };

    onSubmit(payload);
  }

  const formattedResearchData = useMemo(() => {
    if (!formValues.researchData) return "No research data yet.";
    return JSON.stringify(formValues.researchData, null, 2);
  }, [formValues.researchData]);

  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[600px] border-l border-[rgba(55,50,47,0.12)] bg-white shadow-[0px_2px_8px_rgba(55,50,47,0.08)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <div className="border-b border-[rgba(55,50,47,0.12)] px-5 py-4">
            <h3 className="font-serif text-2xl text-[#37322F]">
              {mode === "create" ? "New Web Lead" : "Edit Web Lead"}
            </h3>
          </div>

          <div className="border-b border-[rgba(55,50,47,0.12)] px-5 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TAB_OPTIONS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-[rgba(55,50,47,0.08)] font-medium text-[#37322F]"
                      : "text-[#7C7571] hover:bg-[rgba(55,50,47,0.04)] hover:text-[#37322F]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {activeTab === "business" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Business Name *</span>
                    <input
                      required
                      value={formValues.businessName}
                      onChange={(event) => updateField("businessName", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Owner</span>
                    <input
                      value={formValues.ownerName}
                      onChange={(event) => updateField("ownerName", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Email *</span>
                    <input
                      required
                      type="email"
                      value={formValues.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Phone</span>
                    <input
                      value={formValues.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Industry</span>
                    <input
                      value={formValues.industry}
                      onChange={(event) => updateField("industry", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Location</span>
                    <input
                      value={formValues.location}
                      onChange={(event) => updateField("location", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                  <p className="mb-3 text-sm font-medium text-[#37322F]">Social Profiles</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs text-[#7C7571]">Facebook</span>
                      <input
                        value={formValues.socialFacebook}
                        onChange={(event) => updateField("socialFacebook", event.target.value)}
                        className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-[#7C7571]">Instagram</span>
                      <input
                        value={formValues.socialInstagram}
                        onChange={(event) => updateField("socialInstagram", event.target.value)}
                        className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-[#7C7571]">LinkedIn</span>
                      <input
                        value={formValues.socialLinkedin}
                        onChange={(event) => updateField("socialLinkedin", event.target.value)}
                        className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-[#7C7571]">Twitter/X</span>
                      <input
                        value={formValues.socialTwitter}
                        onChange={(event) => updateField("socialTwitter", event.target.value)}
                        className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-1 block text-xs text-[#7C7571]">TikTok</span>
                      <input
                        value={formValues.socialTiktok}
                        onChange={(event) => updateField("socialTiktok", event.target.value)}
                        className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeTab === "brand" && (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Brand Style</span>
                  <select
                    value={formValues.brandStyle}
                    onChange={(event) => updateField("brandStyle", event.target.value as BrandStyle | "")}
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  >
                    {BRAND_STYLES.map((styleOption) => (
                      <option key={styleOption || "empty"} value={styleOption}>
                        {styleOption || "Select style"}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Brand Colors</span>
                  <input
                    value={formValues.brandColors.join(", ")}
                    onChange={(event) => updateBrandColorsFromInput(event.target.value)}
                    placeholder="#37322F, #F7F5F3"
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                  <p className="mt-1 text-xs text-[#7C7571]">Comma-separated hex values.</p>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Font Preference</span>
                  <input
                    value={formValues.fontPreference}
                    onChange={(event) => updateField("fontPreference", event.target.value)}
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Inspiration URLs</span>
                  <textarea
                    rows={6}
                    value={formValues.inspirationUrls.join("\n")}
                    onChange={(event) => updateInspirationUrlsFromInput(event.target.value)}
                    placeholder="https://example.com\nhttps://another-example.com"
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                  <p className="mt-1 text-xs text-[#7C7571]">One URL per line.</p>
                </label>
              </>
            )}

            {activeTab === "content" && (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Description</span>
                  <textarea
                    rows={4}
                    value={formValues.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Unique Selling Proposition (USP)</span>
                  <textarea
                    rows={3}
                    value={formValues.usp}
                    onChange={(event) => updateField("usp", event.target.value)}
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Target Audience</span>
                    <input
                      value={formValues.targetAudience}
                      onChange={(event) => updateField("targetAudience", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Years in Business</span>
                    <input
                      value={formValues.yearsInBusiness}
                      onChange={(event) => updateField("yearsInBusiness", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[#37322F]">Services</p>
                    <button
                      type="button"
                      onClick={addService}
                      className="rounded-md border border-[rgba(55,50,47,0.15)] px-2 py-1 text-xs font-medium text-[#37322F] hover:bg-[rgba(55,50,47,0.05)]"
                    >
                      Add Service
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formValues.services.length === 0 && (
                      <p className="text-xs text-[#7C7571]">No services added yet.</p>
                    )}
                    {formValues.services.map((service, index) => (
                      <div key={`service-${index}`} className="rounded-md border border-[rgba(55,50,47,0.1)] p-3">
                        <div className="mb-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="text-xs text-red-700 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <input
                            value={service.name}
                            onChange={(event) => updateService(index, "name", event.target.value)}
                            placeholder="Service name"
                            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                          <input
                            value={service.price}
                            onChange={(event) => updateService(index, "price", event.target.value)}
                            placeholder="Price"
                            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                          <textarea
                            rows={2}
                            value={service.description}
                            onChange={(event) => updateService(index, "description", event.target.value)}
                            placeholder="Description"
                            className="md:col-span-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[#37322F]">Testimonials</p>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="rounded-md border border-[rgba(55,50,47,0.15)] px-2 py-1 text-xs font-medium text-[#37322F] hover:bg-[rgba(55,50,47,0.05)]"
                    >
                      Add Testimonial
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formValues.testimonials.length === 0 && (
                      <p className="text-xs text-[#7C7571]">No testimonials added yet.</p>
                    )}
                    {formValues.testimonials.map((testimonial, index) => (
                      <div key={`testimonial-${index}`} className="rounded-md border border-[rgba(55,50,47,0.1)] p-3">
                        <div className="mb-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeTestimonial(index)}
                            className="text-xs text-red-700 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <input
                            value={testimonial.customerName}
                            onChange={(event) =>
                              updateTestimonial(index, "customerName", event.target.value)
                            }
                            placeholder="Customer name"
                            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                          <select
                            value={testimonial.rating}
                            onChange={(event) => updateTestimonialRating(index, event.target.value)}
                            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          >
                            {[1, 2, 3, 4, 5].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                          <textarea
                            rows={2}
                            value={testimonial.quote}
                            onChange={(event) => updateTestimonial(index, "quote", event.target.value)}
                            placeholder="Quote"
                            className="md:col-span-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Review URLs</span>
                  <textarea
                    rows={4}
                    value={formValues.reviewUrls.join("\n")}
                    onChange={(event) => updateReviewUrlsFromInput(event.target.value)}
                    placeholder="https://example.com/review"
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                  <p className="mt-1 text-xs text-[#7C7571]">One URL per line.</p>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Certifications</span>
                  <input
                    value={formValues.certifications}
                    onChange={(event) => updateField("certifications", event.target.value)}
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                </label>

                <div className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[#37322F]">Team Members</p>
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="rounded-md border border-[rgba(55,50,47,0.15)] px-2 py-1 text-xs font-medium text-[#37322F] hover:bg-[rgba(55,50,47,0.05)]"
                    >
                      Add Team Member
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formValues.teamMembers.length === 0 && (
                      <p className="text-xs text-[#7C7571]">No team members added yet.</p>
                    )}
                    {formValues.teamMembers.map((member, index) => (
                      <div key={`member-${index}`} className="rounded-md border border-[rgba(55,50,47,0.1)] p-3">
                        <div className="mb-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="text-xs text-red-700 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <input
                            value={member.name}
                            onChange={(event) => updateTeamMember(index, "name", event.target.value)}
                            placeholder="Name"
                            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                          <input
                            value={member.role}
                            onChange={(event) => updateTeamMember(index, "role", event.target.value)}
                            placeholder="Role"
                            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                          <textarea
                            rows={2}
                            value={member.bio}
                            onChange={(event) => updateTeamMember(index, "bio", event.target.value)}
                            placeholder="Bio"
                            className="md:col-span-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "project" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Primary Goal</span>
                    <select
                      value={formValues.primaryGoal}
                      onChange={(event) => updateField("primaryGoal", event.target.value as WebLeadGoal | "")}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    >
                      {GOALS.map((goal) => (
                        <option key={goal || "empty"} value={goal}>
                          {goal || "Select goal"}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">CTA Text</span>
                    <input
                      value={formValues.ctaText}
                      onChange={(event) => updateField("ctaText", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Domain Name</span>
                    <input
                      value={formValues.domainName}
                      onChange={(event) => updateField("domainName", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Budget</span>
                    <select
                      value={formValues.budget}
                      onChange={(event) => updateField("budget", event.target.value as WebLeadBudget | "")}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    >
                      {BUDGETS.map((budgetOption) => (
                        <option key={budgetOption || "empty"} value={budgetOption}>
                          {budgetOption || "Select budget"}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Timeline</span>
                    <select
                      value={formValues.timeline}
                      onChange={(event) =>
                        updateField("timeline", event.target.value as WebLeadTimeline | "")
                      }
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                    >
                      {TIMELINES.map((timelineOption) => (
                        <option key={timelineOption || "empty"} value={timelineOption}>
                          {timelineOption || "Select timeline"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <fieldset className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                  <legend className="px-1 text-sm font-medium text-[#37322F]">Pages Needed</legend>
                  <div className="grid gap-2 pt-2 sm:grid-cols-2">
                    {PAGE_OPTIONS.map((page) => (
                      <label key={page} className="inline-flex items-center gap-2 text-sm text-[#4f4946]">
                        <input
                          type="checkbox"
                          checked={formValues.pagesNeeded.includes(page)}
                          onChange={() => togglePage(page)}
                        />
                        <span className="capitalize">{page}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="rounded-lg border border-[rgba(55,50,47,0.12)] p-3">
                  <legend className="px-1 text-sm font-medium text-[#37322F]">Available Assets</legend>
                  <div className="grid gap-2 pt-2 sm:grid-cols-3">
                    <label className="inline-flex items-center gap-2 text-sm text-[#4f4946]">
                      <input
                        type="checkbox"
                        checked={formValues.hasLogo}
                        onChange={(event) => updateField("hasLogo", event.target.checked)}
                      />
                      Has logo
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-[#4f4946]">
                      <input
                        type="checkbox"
                        checked={formValues.hasPhotos}
                        onChange={(event) => updateField("hasPhotos", event.target.checked)}
                      />
                      Has photos
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-[#4f4946]">
                      <input
                        type="checkbox"
                        checked={formValues.hasVideos}
                        onChange={(event) => updateField("hasVideos", event.target.checked)}
                      />
                      Has videos
                    </label>
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Asset Notes</span>
                  <textarea
                    rows={4}
                    value={formValues.assetNotes}
                    onChange={(event) => updateField("assetNotes", event.target.value)}
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm"
                  />
                </label>
              </>
            )}

            {activeTab === "workflow" && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[rgba(55,50,47,0.12)] bg-[rgba(55,50,47,0.03)] px-3 py-2">
                  <p className="text-xs text-[#605A57]">Share full context for manual agent runs.</p>
                  <button
                    type="button"
                    onClick={() => void handleCopyAgentContext()}
                    className="rounded-md border border-[rgba(55,50,47,0.18)] px-2.5 py-1 text-xs font-medium text-[#37322F] hover:bg-[rgba(55,50,47,0.05)]"
                  >
                    {copyStatus === "copied"
                      ? "Copied"
                      : copyStatus === "failed"
                        ? "Copy failed"
                        : "Copy Agent Context"}
                  </button>
                </div>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Build Stage</span>
                  <select
                    value={formValues.buildStage}
                    disabled={!isWorkflowEditable}
                    onChange={(event) => updateField("buildStage", event.target.value as BuildStage)}
                    className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-[#F7F5F3]"
                  >
                    {BUILD_STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {BUILD_STAGE_LABELS[stage]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">AI Notes (Read-only)</span>
                  <textarea
                    readOnly
                    rows={5}
                    value={formValues.aiNotes}
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] bg-[#F7F5F3] px-3 py-2 text-sm text-[#605A57]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">
                    Research Data (Read-only)
                  </span>
                  <pre className="max-h-[180px] overflow-auto rounded-lg border border-[rgba(55,50,47,0.15)] bg-[#F7F5F3] px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap text-[#4f4946]">
                    {formattedResearchData}
                  </pre>
                </label>

                <section className="rounded-lg border border-[rgba(55,50,47,0.15)] bg-[#F7F5F3] p-3">
                  <p className="mb-2 text-sm font-medium text-[#37322F]">Generated Content (Read-only)</p>
                  {!formValues.generatedContent && (
                    <p className="text-xs text-[#7C7571]">No generated content yet.</p>
                  )}
                  {formValues.generatedContent && (
                    <div className="space-y-2 text-sm text-[#4f4946]">
                      <p>
                        <span className="font-medium text-[#37322F]">Headline:</span>{" "}
                        {formValues.generatedContent.headline}
                      </p>
                      <p>
                        <span className="font-medium text-[#37322F]">Subheadline:</span>{" "}
                        {formValues.generatedContent.subheadline}
                      </p>
                      <p>
                        <span className="font-medium text-[#37322F]">About:</span>{" "}
                        {formValues.generatedContent.aboutText}
                      </p>
                      <p>
                        <span className="font-medium text-[#37322F]">Meta Description:</span>{" "}
                        {formValues.generatedContent.metaDescription}
                      </p>
                      <p>
                        <span className="font-medium text-[#37322F]">CTA Text:</span>{" "}
                        {formValues.generatedContent.ctaText}
                      </p>
                    </div>
                  )}
                </section>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Preview URL</span>
                    <input
                      readOnly={!isWorkflowEditable}
                      value={formValues.previewUrl}
                      onChange={(event) => updateField("previewUrl", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm read-only:cursor-not-allowed read-only:bg-[#F7F5F3]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Live URL</span>
                    <input
                      readOnly={!isWorkflowEditable}
                      value={formValues.liveUrl}
                      onChange={(event) => updateField("liveUrl", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm read-only:cursor-not-allowed read-only:bg-[#F7F5F3]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Source</span>
                    <input
                      readOnly={!isWorkflowEditable}
                      value={formValues.source}
                      onChange={(event) => updateField("source", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm read-only:cursor-not-allowed read-only:bg-[#F7F5F3]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Assigned To</span>
                    <input
                      readOnly={!isWorkflowEditable}
                      value={formValues.assignedTo}
                      onChange={(event) => updateField("assignedTo", event.target.value)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm read-only:cursor-not-allowed read-only:bg-[#F7F5F3]"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-1 block text-sm font-medium text-[#37322F]">Priority</span>
                    <select
                      disabled={!isWorkflowEditable}
                      value={formValues.priority}
                      onChange={(event) => updateField("priority", event.target.value as WebLeadPriority)}
                      className="w-full rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-[#F7F5F3]"
                    >
                      {PRIORITIES.map((priorityOption) => (
                        <option key={priorityOption} value={priorityOption}>
                          {priorityOption}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-[#37322F]">Notes</span>
                  <textarea
                    rows={4}
                    readOnly={!isWorkflowEditable}
                    value={formValues.notes}
                    onChange={(event) => updateField("notes", event.target.value)}
                    className="w-full resize-y rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm read-only:cursor-not-allowed read-only:bg-[#F7F5F3]"
                  />
                </label>
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-[rgba(55,50,47,0.12)] px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[rgba(55,50,47,0.15)] px-4 py-2 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.04)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
