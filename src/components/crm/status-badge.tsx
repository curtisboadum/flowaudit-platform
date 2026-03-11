import type { LeadStatus } from "@/lib/crm-store";

interface StatusBadgeProps {
  status: LeadStatus;
  label: string;
}

const statusClasses: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  proposal: "bg-orange-100 text-orange-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
    >
      {label}
    </span>
  );
}
