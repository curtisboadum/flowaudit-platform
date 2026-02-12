import { cn } from "@/lib/utils";

interface BadgeProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
}

function Badge({ icon, text, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "px-3.5 py-1.5 bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] inline-flex items-center gap-2 border border-[rgba(2,6,23,0.08)]",
        className,
      )}
    >
      {icon && (
        <div className="w-3.5 h-3.5 relative overflow-hidden flex items-center justify-center">
          {icon}
        </div>
      )}
      <span className="text-center text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </span>
    </div>
  );
}

export { Badge };
export type { BadgeProps };
