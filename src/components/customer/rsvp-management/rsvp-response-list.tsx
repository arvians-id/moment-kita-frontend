import { Eye, Pencil, UsersRound } from "lucide-react";

import { GuestStatusBadge } from "@/components/customer/guest-management/guest-status-badge";
import { cn } from "@/lib/utils";

import { formatRespondedAt, type RsvpListItem } from "./rsvp-utils";

export function RsvpResponseList({
  items,
  onView,
  onEdit,
}: {
  items: RsvpListItem[];
  onView: (item: RsvpListItem) => void;
  onEdit: (item: RsvpListItem) => void;
}) {
  return (
    <>
      <div className="hidden overflow-hidden bg-surface-lowest shadow-sm md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="bg-surface-low text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase xl:text-[10px]">
              <th className="w-[30%] px-4 py-4 font-semibold xl:w-[21%]">
                Guest
              </th>
              <th className="w-[18%] px-3 py-4 font-semibold xl:w-[13%]">
                Group
              </th>
              <th className="w-[18%] px-3 py-4 font-semibold xl:w-[13%]">
                Response
              </th>
              <th className="w-[12%] px-3 py-4 font-semibold xl:w-[10%]">
                Pax
              </th>
              <th className="hidden w-[23%] px-3 py-4 font-semibold xl:table-cell">
                Message / Note
              </th>
              <th className="hidden w-[15%] px-3 py-4 font-semibold lg:table-cell">
                Responded At
              </th>
              <th className="w-[22%] px-4 py-4 text-right font-semibold lg:w-[14%] xl:w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-surface-low/65"
              >
                <td className="px-4 py-4 align-middle">
                  <GuestIdentity item={item} />
                </td>
                <td className="px-3 py-4 align-middle">
                  <p className="truncate text-[10px] font-semibold">
                    {item.group}
                  </p>
                  <p className="mt-1 truncate text-[9px] text-on-surface-variant">
                    {item.category}
                  </p>
                </td>
                <td className="px-3 py-4 align-middle">
                  <GuestStatusBadge
                    status={item.status}
                    confirmedPax={item.confirmedPax}
                    compact
                  />
                </td>
                <td className="px-3 py-4 align-middle">
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold">
                    <UsersRound
                      aria-hidden
                      size={14}
                      className="text-secondary"
                    />
                    {item.confirmedPax}
                  </span>
                  <span className="block text-[9px] text-on-surface-variant">
                    of {item.maxPax} max
                  </span>
                </td>
                <td className="hidden px-3 py-4 align-middle xl:table-cell">
                  <p
                    className={cn(
                      "line-clamp-2 text-[10px] leading-4",
                      item.message
                        ? "text-on-surface-variant italic"
                        : "text-on-surface-variant/55",
                    )}
                  >
                    {item.message || "No message submitted"}
                  </p>
                </td>
                <td className="hidden px-3 py-4 align-middle lg:table-cell">
                  <p className="text-[10px] leading-4 font-medium">
                    {formatRespondedAt(item.respondedAt)}
                  </p>
                  <p className="mt-0.5 text-[8px] tracking-[0.08em] text-on-surface-variant uppercase">
                    {sourceLabel(item.source)}
                  </p>
                </td>
                <td className="px-4 py-4 align-middle">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onView(item)}
                      aria-label={`View RSVP details for ${item.name}`}
                      title="View RSVP detail"
                      className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                    >
                      <Eye aria-hidden size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      aria-label={`Update RSVP for ${item.name}`}
                      title="Update RSVP"
                      className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                    >
                      <Pencil aria-hidden size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {items.map((item) => (
          <li key={item.id} className="bg-surface-lowest p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <GuestIdentity item={item} />
              <GuestStatusBadge
                status={item.status}
                confirmedPax={item.confirmedPax}
                compact
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-y border-border py-3">
              <Info label="Confirmed Pax">
                {item.confirmedPax} of {item.maxPax}
              </Info>
              <Info label="Responded">
                {formatRespondedAt(item.respondedAt)}
              </Info>
            </div>
            {item.message ? (
              <p className="mt-3 line-clamp-2 text-[11px] leading-5 text-on-surface-variant italic">
                “{item.message}”
              </p>
            ) : null}
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => onView(item)}
                className="inline-flex h-9 items-center gap-1.5 bg-surface-container px-3 text-[10px] font-semibold tracking-[0.1em] uppercase"
              >
                <Eye aria-hidden size={14} /> View
              </button>
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="inline-flex h-9 items-center gap-1.5 bg-primary px-3 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
              >
                <Pencil aria-hidden size={14} /> Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function GuestIdentity({ item }: { item: RsvpListItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center bg-surface-container font-serif text-[13px]">
        {item.initials}
      </span>
      <span className="min-w-0">
        <strong className="block truncate text-[12px] leading-5 font-semibold xl:text-[13px]">
          {item.name}
        </strong>
        <span
          className={cn(
            "block truncate text-[9px] leading-4",
            item.source === "public_link"
              ? "font-semibold text-secondary"
              : "text-on-surface-variant",
          )}
        >
          {item.source === "public_link"
            ? "Guest-submitted response"
            : item.category}
        </span>
      </span>
    </div>
  );
}

function Info({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span>
      <span className="block text-[9px] tracking-[0.1em] text-on-surface-variant uppercase">
        {label}
      </span>
      <strong className="mt-1 block text-[10px] leading-4 font-medium">
        {children}
      </strong>
    </span>
  );
}

function sourceLabel(source: RsvpListItem["source"]): string {
  if (source === "manual") return "Manual update";
  if (source === "public_link") return "Public link";
  return "Guest link";
}
