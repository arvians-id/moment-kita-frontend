"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  isCurrentRoute,
  mobileNavigation,
} from "@/components/marketing/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="grid size-10 place-items-center text-primary transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <Menu aria-hidden="true" size={22} />
        )}
      </button>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-surface-lowest px-5 py-6 shadow-[0_18px_40px_-16px_rgba(28,28,24,0.18)]"
        >
          <ul className="grid divide-y divide-border">
            {mobileNavigation.map((item) => {
              const current = isCurrentRoute(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between py-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${current ? "text-secondary" : "hover:text-secondary"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={
                        current
                          ? "rounded-full bg-primary px-3 py-1.5 text-primary-foreground"
                          : undefined
                      }
                    >
                      {item.label}
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/register"
            className="mt-6 flex min-h-12 items-center justify-center gap-2 bg-primary px-5 text-xs font-semibold tracking-[0.14em] text-primary-foreground uppercase"
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle aria-hidden="true" size={16} />
            Create digital invitation
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
