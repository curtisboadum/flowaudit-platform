import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-sm text-[#605A57]">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link href="/" className="transition-colors hover:text-[#37322F]">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-[rgba(55,50,47,0.3)]" />
            {index === items.length - 1 ? (
              <span className="text-[#37322F]" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-[#37322F]">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
