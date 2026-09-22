"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isCurrentRoute,
  isProductRoute,
  primaryNavigation,
  productNavigation,
} from "@/components/marketing/navigation";

/**
 * Every navigation item — the Products trigger included — uses the same box so
 * their baselines, heights and padding stay identical, and so the current-page
 * pill can toggle colour only, never layout.
 */
const navItemClass =
  "inline-flex h-8 items-center gap-1 rounded-full px-3 text-[11px] whitespace-nowrap font-semibold leading-none tracking-[0.13em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";
const restingClass = "text-on-surface-variant hover:text-secondary";
const currentClass = "bg-primary text-primary-foreground";

const productMeta = ["01 — Suite", "02 — Atelier"] as const;

export function PrimaryNavigation() {
  const pathname = usePathname();
  const productsCurrent = isProductRoute(pathname);

  return (
    <nav aria-label="Primary navigation" className="hidden shrink-0 xl:block">
      <ul className="flex items-center gap-1">
        <li className="group relative py-4 focus-within:text-secondary">
          <button
            type="button"
            aria-expanded={false}
            aria-current={productsCurrent ? "true" : undefined}
            className={`${navItemClass} ${productsCurrent ? currentClass : restingClass}`}
          >
            Products
            <ChevronDown
              aria-hidden="true"
              size={13}
              className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
            />
          </button>
          <div className="invisible absolute top-full left-0 w-64 translate-y-2 bg-surface-lowest p-2 opacity-0 shadow-[0_18px_40px_-14px_rgba(46,38,33,0.16)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {productNavigation.map((item, index) => {
              const current = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`flex flex-col p-4 transition-colors ${current ? "bg-surface-low" : "hover:bg-surface-low"}`}
                >
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
                    {productMeta[index]}
                  </span>
                  <span className="mt-1 text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </li>

        {primaryNavigation.map((item) => {
          const current = isCurrentRoute(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`${navItemClass} ${current ? currentClass : restingClass}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
