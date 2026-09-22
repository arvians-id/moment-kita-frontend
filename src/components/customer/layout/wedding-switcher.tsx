"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { CustomerInvitation } from "@/types";

/**
 * Selects the invitation currently in context.
 *
 * Selection is lifted to the caller so a future version can drive routing
 * (e.g. push `/app/invitations/[id]`) without changing this component.
 */
export function WeddingSwitcher({
  invitations,
  selectedId,
  onSelect,
}: {
  invitations: CustomerInvitation[];
  selectedId: string | null;
  onSelect: (invitationId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected =
    invitations.find((invitation) => invitation.id === selectedId) ?? null;

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!selected) return null;

  return (
    <div ref={containerRef} className="relative px-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-2 rounded-[8px] bg-surface-high px-3 py-2.5 text-left transition-colors hover:bg-surface-highest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        <span className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-[13px] leading-5 font-semibold">
            {selected.coupleLabel}
          </span>
          <InvitationStatusBadge
            status={selected.status}
            className="self-start"
          />
        </span>
        <ChevronDown
          aria-hidden
          size={16}
          className={`shrink-0 text-on-surface-variant transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          aria-label="Select a wedding"
          className="absolute inset-x-1 z-20 mt-2 overflow-hidden rounded-[8px] border border-border bg-surface-lowest py-1 shadow-[0_16px_40px_-12px_rgba(46,38,33,0.18)]"
        >
          {invitations.map((invitation) => {
            const isSelected = invitation.id === selected.id;
            return (
              <li key={invitation.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelect(invitation.id);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors hover:bg-surface-low"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-[13px] leading-5 font-medium">
                      {invitation.coupleLabel}
                    </span>
                    <span className="truncate text-[11px] text-on-surface-variant">
                      {invitation.templateName}
                    </span>
                  </span>
                  {isSelected ? (
                    <Check
                      aria-hidden
                      size={15}
                      className="shrink-0 text-secondary"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
