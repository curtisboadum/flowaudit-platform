import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FlowAudit — AI Operations Assistants for Teams Drowning in Repetitive Work",
  description:
    "FlowAudit builds AI assistants that handle your repetitive admin — without losing quality, control, or oversight. Turn 10 hours of manual work into 10 minutes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FlowAudit — Turn 10 Hours of Manual Work Into 10 Minutes",
    description:
      "AI operations assistants for operators, trades, service teams, and founders who are tired of doing the same tasks every week.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowAudit — AI Operations Assistants",
    description:
      "Turn 10 hours of manual work into 10 minutes with AI assistants built for your workflows.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="overflow-x-hidden bg-[#F7F5F3] font-sans text-[#37322F] antialiased">
        <LocaleProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
        <ChatWidget />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            description:
              "FlowAudit builds AI operations assistants that handle repetitive admin for teams drowning in manual work.",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              url: `${SITE_URL}/book`,
            },
          }}
        />
      </body>
    </html>
  );
}
