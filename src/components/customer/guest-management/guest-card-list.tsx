import {
  Check,
  Copy,
  MessageCircle,
  Pencil,
  Trash2,
  UsersRound,
} from "lucide-react";

import { externalLinkProps } from "@/lib/whatsapp";
import type { InvitationGuest } from "@/types";

import { GuestStatusBadge } from "./guest-status-badge";
import { friendlyGuestPath, guestWhatsAppHref } from "./guest-utils";

export function GuestCardList({
  guests,
  invitationSlug,
  invitationBaseUrl,
  copiedGuestId,
  onCopy,
  onEdit,
  onDelete,
}: {
  guests: InvitationGuest[];
  invitationSlug: string;
  invitationBaseUrl: string;
  copiedGuestId: string | null;
  onCopy: (guest: InvitationGuest) => void;
  onEdit: (guest: InvitationGuest) => void;
  onDelete: (guest: InvitationGuest) => void;
}) {
  return (
    <ul className="space-y-3 md:hidden">
      {guests.map((guest) => {
        const path = friendlyGuestPath(invitationSlug, guest);
        const fullUrl = `${invitationBaseUrl}${path}`;
        const canWhatsApp = guest.contact.replace(/[^0-9]/g, "").length > 7;

        return (
          <li key={guest.id} className="bg-surface-lowest p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-terracotta-soft/45 font-serif text-[15px] text-accent-foreground">
                {guest.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold">
                  {guest.name}
                </p>
                <p className="truncate text-[11px] text-on-surface-variant">
                  {guest.contact}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <GuestStatusBadge
                    status={guest.rsvpStatus}
                    confirmedPax={guest.confirmedPax}
                    compact
                  />
                  <span className="inline-flex items-center gap-1 text-[10px] text-on-surface-variant">
                    <UsersRound aria-hidden size={13} /> Max {guest.maxPax} pax
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-y border-border py-3 text-[10px]">
              <span>
                <span className="block tracking-[0.1em] text-on-surface-variant uppercase">
                  Group
                </span>
                <strong className="mt-0.5 block truncate font-medium">
                  {guest.group}
                </strong>
              </span>
              <span>
                <span className="block tracking-[0.1em] text-on-surface-variant uppercase">
                  Last Updated
                </span>
                <strong className="mt-0.5 block truncate font-medium">
                  {guest.lastUpdatedLabel}
                </strong>
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <code className="min-w-0 flex-1 truncate text-[9px] text-on-surface-variant">
                …{path}
              </code>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => onCopy(guest)}
                  aria-label={`Copy invitation link for ${guest.name}`}
                  className="grid size-9 place-items-center bg-surface-container text-on-surface-variant"
                >
                  {copiedGuestId === guest.id ? (
                    <Check aria-hidden size={16} className="text-secondary" />
                  ) : (
                    <Copy aria-hidden size={16} />
                  )}
                </button>
                {canWhatsApp ? (
                  <a
                    href={guestWhatsAppHref(guest.contact, fullUrl, guest.name)}
                    {...externalLinkProps}
                    aria-label={`Share invitation with ${guest.name} via WhatsApp`}
                    className="grid size-9 place-items-center bg-surface-high text-secondary"
                  >
                    <MessageCircle aria-hidden size={16} />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => onEdit(guest)}
                  aria-label={`Edit ${guest.name}`}
                  className="grid size-9 place-items-center bg-surface-container text-on-surface-variant"
                >
                  <Pencil aria-hidden size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(guest)}
                  aria-label={`Delete ${guest.name}`}
                  className="grid size-9 place-items-center bg-surface-container text-on-surface-variant"
                >
                  <Trash2 aria-hidden size={16} />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
