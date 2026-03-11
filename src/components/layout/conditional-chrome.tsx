"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatWidget } from "@/components/chat/chat-widget";

function isCrmPath(pathname: string): boolean {
  return pathname === "/crm" || pathname.startsWith("/crm/");
}

export function ConditionalSiteHeader() {
  const pathname = usePathname();
  if (isCrmPath(pathname)) return null;
  return <SiteHeader />;
}

export function ConditionalSiteFooter() {
  const pathname = usePathname();
  if (isCrmPath(pathname)) return null;
  return <SiteFooter />;
}

export function ConditionalChatWidget() {
  const pathname = usePathname();
  if (isCrmPath(pathname)) return null;
  return <ChatWidget />;
}
