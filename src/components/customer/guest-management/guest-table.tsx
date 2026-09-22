import {
  Check,
  Copy,
  MessageCircle,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import { externalLinkProps } from "@/lib/whatsapp";
import type { InvitationGuest } from "@/types";

import { GuestStatusBadge } from "./guest-status-badge";
import { friendlyGuestPath, guestWhatsAppHref } from "./guest-utils";

export function GuestTable({
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
    <div className="hidden bg-surface-lowest shadow-sm md:block">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="bg-surface-low text-[9px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase xl:text-[10px]">
            <th className="w-[27%] px-4 py-4 font-semibold xl:w-[20%]">
              Guest &amp; Contact
            </th>
            <th className="w-[18%] px-3 py-4 font-semibold xl:w-[13%]">
              Group
            </th>
            <th className="w-[13%] px-3 py-4 font-semibold xl:w-[9%]">Pax</th>
            <th className="w-[20%] px-3 py-4 font-semibold xl:w-[14%]">
              RSVP Status
            </th>
            <th className="hidden w-[20%] px-3 py-4 font-semibold xl:table-cell">
              Invitation Link
            </th>
            <th className="hidden w-[14%] px-3 py-4 font-semibold xl:table-cell">
              Last Updated
            </th>
            <th className="w-[22%] px-4 py-4 text-right font-semibold xl:w-[10%]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {guests.map((guest) => {
            const path = friendlyGuestPath(invitationSlug, guest);
            const fullUrl = `${invitationBaseUrl}${path}`;
            const canWhatsApp = guest.contact.replace(/[^0-9]/g, "").length > 7;

            return (
              <tr
                key={guest.id}
                className="group transition-colors hover:bg-surface-low/65"
              >
                <td className="px-4 py-4 align-middle">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-terracotta-soft/45 font-serif text-[14px] text-accent-foreground">
                      {guest.initials}
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-[12px] leading-5 font-semibold xl:text-[13px]">
                        {guest.name}
                      </strong>
                      <span className="block truncate text-[10px] leading-4 text-on-surface-variant xl:text-[11px]">
                        {guest.contact}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4 align-middle">
                  <span className="inline-flex max-w-full bg-surface-container px-2 py-1 text-[9px] font-semibold tracking-[0.08em] uppercase">
                    <span className="truncate">{guest.group}</span>
                  </span>
                  <span className="mt-1 block truncate text-[8px] tracking-[0.11em] text-on-surface-variant uppercase xl:text-[9px]">
                    {guest.category}
                  </span>
                </td>
                <td className="px-3 py-4 align-middle">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium">
                    <UserRound
                      aria-hidden
                      size={13}
                      className="text-on-surface-variant"
                    />
                    Max {guest.maxPax}
                  </span>
                  <span className="mt-1 block text-[9px] text-on-surface-variant">
                    {guest.confirmedPax} confirmed
                  </span>
                </td>
                <td className="px-3 py-4 align-middle">
                  <GuestStatusBadge
                    status={guest.rsvpStatus}
                    confirmedPax={guest.confirmedPax}
                    compact
                  />
                </td>
                <td className="hidden px-3 py-4 align-middle xl:table-cell">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <code className="min-w-0 flex-1 truncate bg-surface-container px-2 py-1.5 text-[9px] text-on-surface-variant">
                      …{path}
                    </code>
                    <button
                      type="button"
                      onClick={() => onCopy(guest)}
                      title="Copy personalized invitation link"
                      aria-label={`Copy invitation link for ${guest.name}`}
                      className="grid size-8 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                    >
                      {copiedGuestId === guest.id ? (
                        <Check
                          aria-hidden
                          size={15}
                          className="text-secondary"
                        />
                      ) : (
                        <Copy aria-hidden size={15} />
                      )}
                    </button>
                  </div>
                </td>
                <td className="hidden px-3 py-4 align-middle xl:table-cell">
                  <span className="block text-[10px] font-medium">
                    {guest.lastUpdatedLabel}
                  </span>
                  <span className="mt-0.5 block text-[8px] tracking-[0.1em] text-on-surface-variant uppercase">
                    {guest.activityNote}
                  </span>
                </td>
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onCopy(guest)}
                      title="Copy invitation link"
                      aria-label={`Copy invitation link for ${guest.name}`}
                      className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface xl:hidden"
                    >
                      {copiedGuestId === guest.id ? (
                        <Check
                          aria-hidden
                          size={15}
                          className="text-secondary"
                        />
                      ) : (
                        <Copy aria-hidden size={15} />
                      )}
                    </button>
                    {canWhatsApp ? (
                      <a
                        href={guestWhatsAppHref(
                          guest.contact,
                          fullUrl,
                          guest.name,
                        )}
                        {...externalLinkProps}
                        title="Share via WhatsApp"
                        aria-label={`Share invitation with ${guest.name} via WhatsApp`}
                        className="grid size-8 place-items-center bg-surface-high text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <MessageCircle aria-hidden size={15} />
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onEdit(guest)}
                      title="Edit guest"
                      aria-label={`Edit ${guest.name}`}
                      className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                    >
                      <Pencil aria-hidden size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(guest)}
                      title="Delete guest"
                      aria-label={`Delete ${guest.name}`}
                      className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
                    >
                      <Trash2 aria-hidden size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
