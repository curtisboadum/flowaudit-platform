import type { Metadata } from "next";
import { CalculatorApp } from "@/app/calculator/calculator-app";

export const metadata: Metadata = {
  title: "ROI Calculator — FlowAudit",
  description:
    "Calculate your automation ROI with FlowAudit. See exactly how much you can save with AI-powered workflow automation, customize packages, and export detailed reports.",
};

export default function CalculatorPage() {
  return <CalculatorApp />;
}
