import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
  title: "FlowAudit — AI Operations Assistants for Teams Drowning in Repetitive Work",
  description:
    "FlowAudit builds AI assistants that handle your repetitive admin — without losing quality, control, or oversight. Turn 10 hours of manual work into 10 minutes.",
  openGraph: {
    title: "FlowAudit — Turn 10 Hours of Manual Work Into 10 Minutes",
    description:
      "AI operations assistants for operators, trades, service teams, and founders who are tired of doing the same tasks every week.",
    type: "website",
    url: "https://flowaudit.com",
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
      <body className="font-sans antialiased bg-[#F7F5F3] text-[#37322F]">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
