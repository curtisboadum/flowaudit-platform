/**
 * @file page.tsx
 * @description The previous results page carried unverifiable case studies and
 *   testimonials. It now redirects home until real, sourced results exist.
 * @status Stable.
 * @issues None.
 * @todo Replace with sourced case studies when available.
 */
import { redirect } from "next/navigation";

export default function ResultsPage() {
  redirect("/");
}
