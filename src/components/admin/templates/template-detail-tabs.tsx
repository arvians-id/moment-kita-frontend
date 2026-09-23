"use client";

import {
  BadgeCheck,
  BarChart3,
  FileClock,
  LayoutDashboard,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs: readonly { label: string; segment: string; icon: LucideIcon }[] = [
  { label: "Overview", segment: "", icon: LayoutDashboard },
  { label: "Versions", segment: "versions", icon: FileClock },
  { label: "Capabilities", segment: "capabilities", icon: BadgeCheck },
  { label: "Usage", segment: "usage", icon: BarChart3 },
  { label: "Commercial Settings", segment: "commercial", icon: Wallet },
];

export function TemplateDetailTabs({ templateKey }: { templateKey: string }) {
  const pathname = usePathname();
  const base = `/admin/templates/${templateKey}`;

  return (
    <nav
      aria-label="Template detail sections"
      className="overflow-x-auto border border-border bg-surface-lowest px-2 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex min-w-max items-center gap-1 py-1">
        {tabs.map((tab) => {
          const href = tab.segment ? `${base}/${tab.segment}` : base;
          const active = tab.segment
            ? pathname === href || pathname.startsWith(`${href}/`)
            : pathname === base || pathname === `${base}/`;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-2 px-3 text-[9px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors sm:px-4 sm:text-[10px] ${
                active
                  ? "bg-surface-container text-primary shadow-inner"
                  : "text-on-surface-variant hover:bg-surface-low hover:text-primary"
              }`}
            >
              <Icon
                aria-hidden
                size={14}
                className={active ? "text-secondary" : ""}
              />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
