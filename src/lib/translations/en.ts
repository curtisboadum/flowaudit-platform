/**
 * @file en.ts
 * @description English translation dictionary and the Translations type source.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
export const en = {
  // Nav
  nav: {
    webDesign: "Web Design",
    revenueRecovery: "Revenue Recovery",
    solutions: "Solutions",
    howItWorks: "How It Works",
    phoneAgent: "AI Phone Agent",
    about: "About",
    bookCall: "Book a Call",
    careers: "Careers",
  },

  // Home, Hero
  hero: {
    headline: "Your Paperwork, Done Automatically",
    subtext:
      "FlowAudit handles the admin you hate: quotes, follow-ups, invoicing. Your team focuses on the work paying the bills.",
    ctaPrimary: "Calculate Your Time Savings",
    ctaSecondary: "See How It Works",
    ctaNote: "Free strategy call. No commitment, no pressure.",
  },

  // Home, Hero tabs
  heroTabs: {
    tab1Title: "Quote Follow-up",
    tab1Desc: "Auto-chase every quote you send. No more lost deals.",
    tab2Title: "Job Complete → Invoice",
    tab2Desc: "Finish a job, invoice goes out. No more chasing payments weeks later.",
    tab3Title: "Weekly Cash Flow Summary",
    tab3Desc:
      "See what's coming in, what's overdue, and what needs chasing. Every Monday morning.",
  },

  // Home, Bento / Who This Is For
  bento: {
    badge: "Who This Is For",
    headline: "If You're Repeating Work Every Week, This Is For You",
    subtext:
      "Built for tradespeople, contractors, and small business owners who are tired of doing the same admin every week.",
    signalsTitle: "Common Signals",
    signalsSubtext:
      "If any of these sound familiar, you're leaving time and money on the table.",
    signals: [
      "Typing the same quote details into 3 different apps",
      "Forgetting to follow up on a £5,000 quote",
      "Spending Sunday evening doing invoices",
      "Losing track of which jobs are paid",
      "Missing calls because you're on a job",
      "Chasing the same client for payment 3 times",
      "Wishing you had an office manager you afford",
    ],
    industriesTitle: "Works Across Industries",
    industriesSubtext: "Any team running on repetitive workflows benefits.",
    industries: [
      { name: "Trades & Contractors", desc: "Plumbers, electricians, HVAC, builders" },
      { name: "Solopreneurs", desc: "Solo operators & small crews" },
      { name: "Insurance", desc: "Brokers & financial services" },
      { name: "Agencies", desc: "Marketing & creative teams" },
      { name: "Consultants", desc: "Advisory & strategy firms" },
      { name: "Accounting", desc: "CPA firms & bookkeepers" },
    ],
    hiddenCostTitle: "The Hidden Cost",
    hiddenCostSubtext: "Every hour spent on admin is an hour not spent on growth.",
    hiddenCostItems: [
      { label: "Quoting & estimating", hours: "Handled" },
      { label: "Invoicing & chasing payments", hours: "Chased" },
      { label: "Scheduling & coordination", hours: "Coordinated" },
      { label: "Client follow-ups", hours: "Followed up" },
    ],
    impactTitle: "What Changes",
    impactSubtext: "The assistant takes the repetitive work off your plate, and every action is logged.",
    impactHours: "24/7",
    impactHoursLabel: "the assistant does not sleep or take leave",
    impactDays: "Human",
    impactDaysLabel: "approval where it matters",
    impactRoi: "Logged",
    impactRoiLabel: "every action recorded with a summary",
  },

  // FAQ
  faq: {
    badge: "FAQ",
    headline: "Frequently Asked Questions",
  },

  // CTA
  cta: {
    headline: "Stop Doing Work a Machine Could Handle",
    subtext:
      "Book a free strategy call. We'll show you exactly which parts of your week get automated. And what it'll save you.",
    button: "Book a Free Strategy Call",
    note: "30-minute call. No commitment. No jargon.",
  },

  // Footer
  footer: {
    tagline: "AI operations assistants for teams drowning in repetitive work.",
    copyright: `© ${new Date().getFullYear()} FlowAudit. All rights reserved.`,
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    solutionsTitle: "Solutions",
    companyTitle: "Company",
    resourcesTitle: "Resources",
  },

  // Book page
  book: {
    headline: "Book a call",
    subtext:
      "Pick a time that works and your confirmation includes a Google Meet link. 30 minutes, no jargon, no pressure.",
    scheduleTitle: "Pick a time",
    scheduleSubtext:
      "Choose a slot on the calendar. Prefer email? Write to support@flowaudit.co.uk and we will reply with times.",
    emailButton: "Email us instead",
    responseNote: "Your booking confirmation includes a Google Meet link.",
    expectTitle: "What to Expect",
    step1Title: "Quick Chat About Your Business",
    step1Desc:
      "We'll ask about your typical week. What takes up your time, what falls through the cracks.",
    step2Title: "Spot the Quick Wins",
    step2Desc:
      "We'll find 2-3 things we can automate straight away. Usually quoting, invoicing, or follow-ups.",
    step3Title: "Get a Clear Plan",
    step3Desc:
      "You'll get a plain-English plan showing what we'll build and how it will work.",
  },

  // Phone Agent page
  phoneAgent: {
    hero: {
      badge: "For dental practices",
      headline: "Every call answered. Every patient booked.",
      subtext:
        "The FlowAudit AI phone agent answers your practice phone, asks the right questions, handles urgent cases with care, and books the appointment straight into the calendar your team already uses.",
      ctaPrimary: "Watch the demo call",
      ctaSecondary: "Book a 30-minute walkthrough",
      note: "See the full call, from first ring to booked appointment.",
    },
    leak: {
      badge: "The leak",
      headline: "The calls you never hear about",
      subtext: "Most callers who reach voicemail never leave a message. They just call the next practice.",
      moments: [
        {
          title: "While the team is chairside",
          desc: "A patient calls during a filling. The phone rings out. That caller does not wait.",
        },
        {
          title: "At lunch and at the school run",
          desc: "Peak call times land exactly when the front desk is at its busiest.",
        },
        {
          title: "After close",
          desc: "Evening pain and weekend emergencies call anyway. Voicemail answers none of them.",
        },
      ],
      stat: "In one MGMA review, some clinics had more than half of incoming calls going to voicemail. Every one of those callers had to go somewhere else.",
      statSource: "MGMA, March 2026",
    },
    handles: {
      badge: "What it handles",
      headline: "A front desk that never misses a ring",
      items: [
        {
          title: "Answers in about two rings",
          desc: "Every call, day and night, including weekends. No hold music, no voicemail.",
        },
        {
          title: "Qualifies the caller",
          desc: "New or returning patient, reason for the visit, urgency, and the right contact details.",
        },
        {
          title: "Triages urgent cases safely",
          desc: "Swelling, bleeding, trauma, or trouble breathing are checked first, then escalated by your rules.",
        },
        {
          title: "Books the appointment",
          desc: "Real availability from your calendar, offered on the call, then confirmed out loud.",
        },
        {
          title: "Sends you a summary",
          desc: "A short note and transcript after every call, so the team knows exactly what happened.",
        },
        {
          title: "Hands off when it should",
          desc: "Complex or clinical questions go to your team with a full summary, not a dropped call.",
        },
      ],
    },
    demo: {
      badge: "The demo",
      headline: "Watch a real call, start to finish",
      subtext:
        "A parent calls about a child with toothache. Watch the agent triage, check the calendar, offer an emergency slot, and confirm the booking. The phone number is hidden in this demo recording.",
      note: "2 minutes 41 seconds, recorded from the live product console.",
    },
    how: {
      badge: "How it works",
      headline: "Configured with you, then live",
      steps: [
        {
          title: "Tell us about the practice",
          desc: "Services, hours, locations, and the questions your callers actually ask.",
        },
        {
          title: "We configure the agent",
          desc: "Your greeting, your voice, and your rules for urgent calls and handoffs.",
        },
        {
          title: "Connect your calendar",
          desc: "The agent books only real slots from the calendar you already use.",
        },
        {
          title: "Test calls, then go live",
          desc: "You listen to real calls, approve them, and the agent starts answering.",
        },
      ],
    },
    guardrails: {
      badge: "Guardrails",
      headline: "What the agent never does",
      items: [
        "Never invents availability or books a slot that is not real",
        "Never quotes prices or estimates treatment costs",
        "Never gives clinical advice or a diagnosis",
        "Never claims to be human when asked",
        "Never leaves an urgent case without an escalation path",
        "Never goes live on a number you are not ready to forward",
      ],
    },
    audience: {
      badge: "Who it is for",
      headline: "Built for dental teams",
      items: [
        {
          title: "Single-location practices",
          desc: "Cover lunch, busy periods, and every call after close.",
        },
        {
          title: "Multi-location groups and DSOs",
          desc: "One number or many, each with its own rules and calendar.",
        },
        {
          title: "Ortho, implant, and emergency clinics",
          desc: "High-value and urgent callers get answered first, with the right questions.",
        },
      ],
      markets: "Tuned for practices in the United States, United Kingdom, and Canada.",
    },
    faqItems: [
      {
        q: "Will patients know they are talking to AI?",
        a: "Listen to the demo call and judge for yourself. If a patient asks directly, the agent says plainly that it is an AI assistant for the practice, and they can ask for a person.",
      },
      {
        q: "What happens with emergencies?",
        a: "Urgent symptoms are checked first, following the practice's own triage rules. The agent can offer emergency slots, apply the emergency surcharge your practice uses, and alert your team immediately.",
      },
      {
        q: "Does it work with our current number and team?",
        a: "Yes. It answers alongside your existing number and front desk. You choose when it picks up: overflow, after hours, or every call.",
      },
      {
        q: "Where do bookings land?",
        a: "In the calendar you already use. The agent sees real availability, books the slot, and confirms the details out loud on the call.",
      },
      {
        q: "How is call recording handled?",
        a: "Recording and consent are configured to the practice's policy and local rules, including any disclosure your jurisdiction requires.",
      },
      {
        q: "How long does setup take?",
        a: "Most of the work is configuration, not code. We build the call flow, connect the calendar, run test calls with you, and go live when you approve.",
      },
      {
        q: "What does it cost?",
        a: "Pricing is covered on the walkthrough call, where we can match the setup to the practice. We do not publish a rate card.",
      },
    ],
    cta: {
      headline: "Hear it on your own practice's calls",
      subtext:
        "Book a 30-minute walkthrough. We will show the live console, answer your questions, and map what setup would look like for your practice.",
      button: "Book a 30-minute walkthrough",
      note: "Your booking confirmation includes a Google Meet link.",
    },
  },

  // Web Design page
  webDesign: {
    heroHeadline: "Custom Websites & AI-Powered Tools For Your Business",
    heroSubtext:
      "We design, build, and maintain your complete online presence: website, AI chatbot, booking system, invoicing. Everything your business needs to look professional and capture every lead.",
    heroCta: "Book a Free Call",
    heroCtaSecondary: "See Our Products",
    heroNote: "No templates. Every site is unique to your business.",

    howItWorksTitle: "How It Works",
    step1Title: "We Research Your Business",
    step1Desc:
      "We study your industry, competitors, and customers to understand what your website needs to achieve.",
    step2Title: "We Build Your Site",
    step2Desc:
      "Our team designs and builds a custom website tailored to your business. Before you pay anything.",
    step3Title: "You Review & Approve",
    step3Desc:
      "See your live demo site. Request changes. Only pay when you're completely happy.",
    step4Title: "We Handle Everything",
    step4Desc:
      "Hosting, updates, security, support. All included. You focus on your business.",

    productsTitle: "Everything Your Business Needs Online",
    productsSubtext:
      "Start with a website. Add tools as your business grows. Cancel anytime after your 12-month term.",
    everythingLabel: "Everything",
    everythingDesc: "All 8 tools included",

    product1: "Custom Website",
    product1Desc:
      "Unique design, mobile-optimised, CMS access, hosting & SSL included.",
    product2: "AI Chatbot",
    product2Desc:
      "24/7 AI assistant trained on your business. Captures leads while you sleep.",
    product3: "After-Hours AI",
    product3Desc:
      "Handles calls and texts outside your working hours. Never miss a lead again.",
    product4: "Missed Call Text-Back",
    product4Desc:
      "Automatically texts customers back within seconds when you miss their call.",
    product5: "Booking System",
    product5Desc:
      "Let customers book appointments online. Sends reminders automatically.",
    product6: "Automated Invoicing",
    product6Desc:
      "Send professional invoices by text. Track payments. Chase overdue automatically.",
    product7: "Quote Request System",
    product7Desc: "Capture quote requests from your website. Get notified instantly.",
    product8: "Testimonial Collector",
    product8Desc:
      "Automatically collect reviews from happy customers and display them on your site.",

    whyUsTitle: "Why Choose Us",
    why1Title: "No Templates",
    why1Desc:
      "Every website we build is custom-designed for your business. You'll never see another site looking like yours.",
    why2Title: "You Own Nothing to Worry About",
    why2Desc:
      "We handle hosting, security, updates, and support. If something breaks, we fix it.",
    why3Title: "AI That Actually Works",
    why3Desc:
      "Our AI tools aren't gimmicks. They capture real leads, send real invoices, and save real hours every week.",
    why4Title: "See It Before You Pay",
    why4Desc:
      "We build your demo site before you commit. You only pay when you love what you see.",

    faq1Q: "What happens if I cancel?",
    faq1A:
      "After your 12-month term, you cancel anytime with 30 days notice. If you cancel, your website and all tools go offline as they run on our infrastructure.",
    faq2Q: "Can I buy my website outright?",
    faq2A:
      "We will walk you through the available ownership options on a call and put the recommended scope in writing before anything starts.",
    faq3Q: "How long does it take to build my website?",
    faq3A:
      "Most websites are ready within 5-10 business days. Add-on tools are configured within 48 hours of your website going live.",
    faq4Q: "Do I need to provide content?",
    faq4A:
      "We handle everything: copy, images, design. We need your business details and we'll do the rest.",
    faq5Q: "Can I make changes to my website?",
    faq5A:
      "Yes, you get CMS access to update text, images, and basic content anytime. For design changes, our team handles those.",
    faq6Q: "What if I want a website without the add-ons?",
    faq6A:
      "Absolutely. The website is a standalone product. Add tools whenever you're ready.",

    ctaHeadline: "Ready to See What Your Website Could Look Like?",
    ctaSubtext:
      "Book a free strategy call. We'll discuss your business and show you what's possible.",
    ctaButton: "Book a Free Call",
  },

  // Problem section
  problem: {
    badge: "The Problem",
    headline: "Manual Work Is Eating Your Margin",
    subtext: "What starts as \"I'll do it tonight\" becomes the reason you can't take on more jobs.",
    chartManual: "Manual Task Hours",
    chartAI: "With AI Assistant",
    chartSavings: "Time Savings",
    chartYears: ["Now", "6 mo", "1 yr", "18 mo", "2 yr", "30 mo", "3 yr"],
    keyPoints: [
      { title: "Tasks Compound", desc: "Every new client means more quoting, invoicing, chasing" },
      { title: "Manual Scales Up", desc: "More jobs = more paperwork, same hours in the day" },
      { title: "Hiring Adds Cost", desc: "An office manager costs \u00A330K+ before they save you a penny" },
      { title: "Admin Steals Time", desc: "Every hour on admin is an hour you're not on a paid job" },
      { title: "Burnout Rises", desc: "Working evenings and weekends to stay on top of it" },
    ],
  },


  // Calculator section
  calc: {
    badge: "Calculator",
    headline: "What Is Your Time Actually Worth?",
    subtext: "See exactly how much repetitive work is costing your business.",
    note: "Takes 30 seconds. No email required.",
    slider1: "Hours per week on repetitive tasks",
    slider2: "Average hourly value of your time",
    slider3: "Team members affected",
    result1: "Monthly Time Value Recovered",
    result2: "Annual Value Recovered",
    result3: "Full-Time Hires Avoided",
    result4: "Break-Even Timeline",
    cta: "Get Detailed ROI Analysis",
    disclaimer: "*Based on conservative assumptions.",
    week: "week",
    weeks: "weeks",
    hrs: "hrs",
    people: "people",
  },

  // Process section
  process: {
    badge: "How It Works",
    headline: "From Manual Work to Automated",
    subtext: "We do the hard work. You show up for a 30-minute call.",
    step1: "30-Minute Workflow Call",
    step1Desc: "We map your current workflows and identify the biggest time sinks.",
    step2: "Identify Repetitive Tasks",
    step2Desc: "We pinpoint exactly which tasks we automate for maximum impact.",
    step3: "Build Your AI Assistant",
    step3Desc: "We configure and train your custom AI operations assistant.",
    step4: "Test With Real Data",
    step4Desc: "We validate the assistant works correctly with your actual workflows.",
    step5: "Go Live",
    step5Desc: "Your assistant starts handling tasks. You start saving time immediately.",
  },

  // Comparison section
  comparison: {
    badge: "Compare",
    headline: "What Happens If You Do Nothing",
    subtext: "Manual work scales with your business. Here's the 3-year comparison.",
    manualHeader: "Manual Path",
    autoHeader: "With FlowAudit",
    rows: [
      { category: "Admin workload", manual: "Grows with revenue", automated: "Stays flat" },
      { category: "Quoting speed", manual: "Hours to prepare", automated: "Minutes" },
      { category: "Missed quotes", manual: "Deals fall through the cracks", automated: "Every quote gets chased" },
      { category: "Follow-up speed", manual: "Days (if you remember)", automated: "Same day, automatic" },
      { category: "Evening/weekend work", manual: "Doing invoices at 10pm", automated: "Done during work hours" },
      { category: "Money left on the table", manual: "Jobs billed late, quotes forgotten", automated: "Everything tracked and chased" },
      { category: "Taking on more work", manual: "Can't grow without more staff", automated: "Handle more with the same crew" },
    ],
  },

  // FAQ items
  faqItems: [
    { q: "How is this different from hiring a virtual assistant?", a: "A VA is another person to manage, train, and cover for. Our system works 24/7, follows your process exactly, and handles the repetitive work so you (or your team) focus on the actual job." },
    { q: "What industries do you work with?", a: "Mostly trades (plumbers, electricians, HVAC, builders), contractors, and small service businesses with 1-30 people. If you're copying info between apps, chasing invoices, or sending the same follow-up emails every week, we help." },
    { q: "I'm a one-person operation. Is this still worth it?", a: "Absolutely. Whether you're solo or have a small team, the biggest gains come from removing the admin eating your day. Even saving 10-15 hours a week means you take on more jobs or get your evenings back." },
    { q: "I'm not tech-savvy. Will I be able to use this?", a: "Yes. We handle all the technical setup. Your assistant works through tools you already use. Email, text messages, your accounting software. If you check your email, you use this." },
    { q: "How long does it take to get set up?", a: "Setup is mostly configuration. We start with a call to map the work, build and test with your real data, and go live when you approve." },
    { q: "What does the pilot include?", a: "The pilot is a short test of one automation. We build it, run it with your real data, and show you exactly what it did. You only move forward if it earns its place." },
    { q: "Is my data secure?", a: "We set up access controls and keep a log of what the assistant does. Your data is not sold or shared, and you own it." },
    { q: "What if I don't know which workflows to automate?", a: "That's what the first call is for. We'll walk through your day-to-day together, find the biggest time sinks, and recommend where to start." },
    { q: "How do I get a price?", a: "Book a free call and we will scope the work with you, then put the full scope and the figure in writing before anything starts. Every build is different, so we do not publish a rate card." },
    { q: "Do I need any technical knowledge?", a: "None at all. We handle all the setup, wiring, and configuration. You interact with your assistant through tools you already use." },
    { q: "How do you measure whether it works?", a: "We agree on what we are trying to move before we start, and the assistant logs what it does so the change is visible. We do not promise revenue, hours, or rankings up front." },
  ],

  // Hero visual demos
  heroVisuals: {
    liveWorkflow: {
      title: "Live Workflow",
      tasks: [
        { label: "Quote Sent to Client", status: "Completed" },
        { label: "Follow-up: Smith Kitchen Reno", status: "Completed" },
        { label: "Invoice: 42 Maple Drive Job", status: "Running" },
        { label: "New Lead: Bathroom Refit", status: "Queued" },
        { label: "Weekly Cash Flow Summary", status: "Queued" },
      ],
    },
    revenueProtection: {
      title: "Revenue Protection",
      items: [
        { label: "Quote Follow-up: Johnson HVAC", due: "Sent 3 days ago", amount: "$2,800" },
        { label: "Quote Follow-up: Smith Electric", due: "Sent 2 days ago", amount: "$6,500" },
        { label: "Invoice: Martinez Plumbing", due: "Overdue 5 days", amount: "$1,850" },
        { label: "New Quote: Davis Construction", due: "Requested today", amount: "$4,200" },
      ],
    },
    weeklySummary: {
      title: "Weekly Summary. Auto-Generated",
      stats: [
        { label: "Jobs Invoiced", value: "47" },
        { label: "Hours Saved", value: "12.5" },
        { label: "Quotes Chased", value: "23" },
        { label: "Revenue Protected", value: "$27K" },
      ],
      riskTitle: "Risk Flag",
      riskDesc: "2 quotes over 7 days old without a response",
    },
  },

  // Features section
  features: {
    badge: "What We Do",
    headline: "We Build You an AI Operations Assistant",
    subtext: "Your assistant handles the work you keep doing every week so you focus on what matters.",
    feature1Title: "Task Automation",
    feature1Subtitle: "Removes repetitive work",
    feature1Desc: "Moves data between systems, sends reminders automatically, updates clients, tracks renewals, and follows up on leads. Without manual effort.",
    feature1Items: ["CRM data syncing", "Automatic reminders", "Client status updates", "Renewal tracking", "Lead follow-ups"],
    feature2Title: "Revenue Protection",
    feature2Subtitle: "Ensures nothing falls through the cracks",
    feature2Desc: "Monitors deadlines, triggers payment reminders, flags overdue items, and keeps your pipeline moving so revenue doesn't slip away.",
    feature2Items: ["Payment triggers", "Overdue alerts", "Pipeline monitoring", "Quote follow-ups", "Upsell reminders"],
    feature3Title: "Operational Visibility",
    feature3Subtitle: "Provides clarity without manual reporting",
    feature3Desc: "Builds weekly summaries, flags operational risks, generates status dashboards, and keeps your team informed automatically.",
    feature3Items: ["Weekly summaries", "Risk flags", "Status dashboards", "Team notifications", "Performance tracking"],
  },

  // Pilot section
  pilot: {
    badge: "Risk-Free Start",
    headline: "Test One Workflow First",
    subtext: "Not sure if automation is right for you? Start small. Validate with one workflow before committing.",
    items: ["Short pilot", "One automation", "Clear reporting", "Decide after validation"],
    disclaimer: "No credit card. No commitment.",
    button: "Start With a Pilot",
  },




  // Security
  security: {
    badge: "Security",
    headline: "Your Data Is Safe With Us",
    subtext: "Plain and simple. Here's how we protect your business.",
    items: [
      { title: "Only You See Your Data", description: "We set up permissions so only the right people access your information." },
      { title: "Secure by Default", description: "We use encrypted connections and established hosting providers." },
      { title: "Full Transparency", description: "You see exactly what your assistant has done. Every email sent, every invoice created." },
      { title: "Your Data Stays Yours", description: "We never sell your data, share it with anyone else, or use it for anything other than running your automations." },
      { title: "You Own Everything", description: "All your automations, settings, and data belong to you. Always." },
    ],
  },

  // Careers page
  careers: {
    headline: "Build the Future of Business Automation",
    subtext:
      "We're a small team with big ambitions. If you're talented, resourceful, and want to work on problems for real businesses, we'd love to hear from you.",

    valuesTitle: "Our Values",
    value1Title: "Move Fast, Ship Often",
    value1Desc:
      "We believe in iteration over perfection. Get it live, get feedback, improve.",
    value2Title: "Own Your Work",
    value2Desc:
      "No micromanagement. You'll have real ownership over real products for real businesses use.",
    value3Title: "Think Like a Founder",
    value3Desc:
      "We want people who see the bigger picture, not their task list.",
    value4Title: "Remote-First",
    value4Desc:
      "Work from anywhere. We care about output, not hours.",

    openingsTitle: "Open Positions",
    noOpenings:
      "We don't have specific openings right now, but we're always interested in hearing from exceptional people.",
    sendCv: "Send Us Your CV",

    ctaHeadline: "Know someone who'd be a great fit?",
    ctaSubtext: "Share this page with them.",
  },
};

export type Translations = typeof en;
