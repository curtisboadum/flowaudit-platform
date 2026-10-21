import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ConditionalChatWidget,
  ConditionalSiteFooter,
  ConditionalSiteHeader,
} from "@/components/layout/conditional-chrome";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { FunnelProvider } from "@/components/marketing/funnel-provider";
import "./globals.css";

const inter = localFont({ src:"./fonts/inter.woff2", variable:"--font-inter", display:"swap", preload:true });
const instrumentSerif = localFont({ src:"./fonts/instrument-serif.woff2", variable:"--font-instrument-serif", display:"swap", preload:true });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FlowAudit | AI phone agents & voice automation",
  description:
    "AI phone agents configured around your inbound enquiries, with testing and approval before activation. USA primary, UK supported.",
  openGraph: {
    title: "FlowAudit | Better systems. Clearer next steps.",
    description: "AI systems built around your business, with clear scope and your approval.",
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="overflow-x-hidden bg-[#F7F5F3] font-sans text-[#37322F] antialiased">
        <LocaleProvider>
          <ConditionalSiteHeader />
          <a className="fa-skip" href="#main-content">
            Skip to content
          </a>
          <main id="main-content">{children}</main>
          <ConditionalSiteFooter />
          <FunnelProvider />
          {process.env.CHAT_ENABLED === "true" &&
            (process.env.OPENROUTER_API_KEY ||
              process.env.GEMINI_API_KEY ||
              process.env.DEEPSEEK_API_KEY) && <ConditionalChatWidget />}
        </LocaleProvider>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/brand.svg`,
            description:
              "Phone handling, operations automation, revenue recovery and websites with clear scope and approval.",
            email: "support@flowaudit.co.uk",
            sameAs: ["https://www.linkedin.com/company/flowaudit"],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              url: `${SITE_URL}/book`,
              email: "support@flowaudit.co.uk",
            },
            founder: [
              {
                "@type": "Person",
                name: "Curtis Kusi Boadum",
                jobTitle: "CEO & CTO",
              },
              {
                "@type": "Person",
                name: "Ephraim Owusu",
                jobTitle: "CEO & COO",
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
