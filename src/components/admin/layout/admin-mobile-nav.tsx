"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  AdminSidebarContent,
  type AdminSidebarProps,
} from "@/components/admin/layout/admin-sidebar";

/**
 * Mobile/tablet navigation drawer. Renders the same sidebar content as the
 * desktop aside rather than a second navigation implementation.
 */
export function AdminMobileNav(props: Omit<AdminSidebarProps, "onNavigate">) {
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
        aria-controls="admin-mobile-nav"
        aria-label="Open navigation"
        disabled={isOpen}
        onClick={() => setIsOpen(true)}
        className="grid size-10 place-items-center text-on-surface transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
                id="admin-mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Admin navigation"
                className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-surface-low shadow-[0_18px_40px_-12px_rgba(46,38,33,0.28)]"
              >
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="absolute top-4 right-4 z-10 grid size-9 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  <X aria-hidden size={19} />
                </button>
                <AdminSidebarContent
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
