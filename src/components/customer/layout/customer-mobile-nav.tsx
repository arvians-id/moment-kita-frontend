"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  CustomerSidebarContent,
  type CustomerSidebarProps,
} from "@/components/customer/layout/customer-sidebar";

/**
 * Mobile/tablet navigation drawer. Renders the same sidebar content as the
 * desktop aside rather than a second navigation implementation.
 */
export function CustomerMobileNav(
  props: Omit<CustomerSidebarProps, "onNavigate">,
) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="customer-mobile-nav"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((current) => !current)}
        className="grid size-10 place-items-center rounded-[8px] text-on-surface transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        {isOpen ? <X aria-hidden size={21} /> : <Menu aria-hidden size={21} />}
      </button>

      {/*
        Portaled to the document body: the topbar uses `backdrop-blur`, which
        creates a containing block and would otherwise clip this fixed drawer to
        the header's height.
      */}
      {isOpen
        ? createPortal(
            <>
              <div
                aria-hidden
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-espresso/40 backdrop-blur-[2px]"
              />
              <div
                id="customer-mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Customer navigation"
                className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-surface-low shadow-[0_18px_40px_-12px_rgba(46,38,33,0.28)]"
              >
                <CustomerSidebarContent
                  {...props}
                  onNavigate={() => setIsOpen(false)}
                />
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
