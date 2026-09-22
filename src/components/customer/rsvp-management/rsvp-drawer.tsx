"use client";

import { Check, Minus, Plus, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { guestStatusLabels } from "@/components/customer/guest-management/guest-utils";
import { cn } from "@/lib/utils";
import type { GuestAttendanceStatus } from "@/types";

import { formatRespondedAt, type RsvpListItem } from "./rsvp-utils";

const statuses: GuestAttendanceStatus[] = [
  "attending",
  "not_attending",
  "pending",
];

export function RsvpDrawer({
  invitationId,
  item,
  items,
  mode,
  onSelect,
  onEdit,
  onClose,
  onSave,
}: {
  invitationId: string;
  item: RsvpListItem;
  items: RsvpListItem[];
  mode: "view" | "edit";
  onSelect: (item: RsvpListItem) => void;
  onEdit: () => void;
  onClose: () => void;
  onSave: (update: {
    id: string;
    status: GuestAttendanceStatus;
    confirmedPax: number;
    message: string;
  }) => void;
}) {
  const [status, setStatus] = useState(item.status);
  const [confirmedPax, setConfirmedPax] = useState(item.confirmedPax);
  const [message, setMessage] = useState(item.message);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function updateStatus(next: GuestAttendanceStatus) {
    setStatus(next);
    if (next !== "attending") setConfirmedPax(0);
    if (next === "attending" && confirmedPax === 0) setConfirmedPax(1);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      id: item.id,
      status,
      confirmedPax:
        status === "attending"
          ? Math.min(Math.max(confirmedPax, 1), item.maxPax)
          : 0,
      message: message.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close RSVP detail"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-espresso/50 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-surface-lowest shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 bg-surface-low px-5 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              {mode === "edit" ? "Manual RSVP Update" : "RSVP Response Detail"}
            </p>
            <h2
              id="rsvp-drawer-title"
              className="mt-1 truncate font-serif text-[27px] leading-9"
            >
              {item.name}
            </h2>
            <p className="text-[11px] text-on-surface-variant">
              {item.source === "public_link"
                ? "Submitted through the public RSVP link"
                : `${item.group} · ${item.category}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <X aria-hidden size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-8">
            {mode === "edit" ? (
              <div>
                <label
                  htmlFor="rsvp-guest"
                  className="mb-2 block text-[10px] font-semibold tracking-[0.14em] uppercase"
                >
                  Guest
                </label>
                <select
                  id="rsvp-guest"
                  value={item.id}
                  onChange={(event) => {
                    const selected = items.find(
                      (candidate) => candidate.id === event.target.value,
                    );
                    if (selected) onSelect(selected);
                  }}
                  className="h-11 w-full bg-surface-low px-3 text-[13px] outline-none focus:bg-surface-container"
                >
                  {items.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                      {candidate.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <fieldset disabled={mode === "view"}>
              <legend className="mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase">
                Response
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {statuses.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateStatus(option)}
                    className={cn(
                      "flex min-h-11 items-center justify-center gap-1 px-2 text-[9px] font-semibold tracking-[0.08em] uppercase transition-colors sm:text-[10px]",
                      status === option
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-surface-container text-on-surface-variant",
                    )}
                  >
                    {status === option ? <Check aria-hidden size={13} /> : null}
                    {guestStatusLabels[option]}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="bg-surface-low p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">
                    Confirmed Pax
                  </p>
                  <p className="mt-1 text-[11px] text-on-surface-variant">
                    Maximum allocation: {item.maxPax}
                  </p>
                </div>
                <div className="flex h-10 items-center bg-surface-lowest">
                  <button
                    type="button"
                    disabled={mode === "view" || status !== "attending"}
                    onClick={() =>
                      setConfirmedPax((current) => Math.max(current - 1, 1))
                    }
                    aria-label="Decrease confirmed pax"
                    className="grid h-full w-10 place-items-center disabled:opacity-35"
                  >
                    <Minus aria-hidden size={15} />
                  </button>
                  <span className="w-10 text-center font-serif text-[20px]">
                    {status === "attending" ? confirmedPax : 0}
                  </span>
                  <button
                    type="button"
                    disabled={
                      mode === "view" ||
                      status !== "attending" ||
                      confirmedPax >= item.maxPax
                    }
                    onClick={() =>
                      setConfirmedPax((current) =>
                        Math.min(current + 1, item.maxPax),
                      )
                    }
                    aria-label="Increase confirmed pax"
                    className="grid h-full w-10 place-items-center disabled:opacity-35"
                  >
                    <Plus aria-hidden size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="rsvp-message"
                className="mb-2 block text-[10px] font-semibold tracking-[0.14em] uppercase"
              >
                Message / Note <span className="font-normal">(Optional)</span>
              </label>
              {mode === "edit" ? (
                <textarea
                  id="rsvp-message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Add a guest message or a private response note..."
                  className="w-full resize-none bg-surface-low p-3 text-[13px] leading-6 outline-none focus:bg-surface-container"
                />
              ) : (
                <p className="bg-surface-low p-4 text-[13px] leading-6 text-on-surface-variant italic">
                  {message || "No message was included with this response."}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 bg-surface-container p-4">
              <Detail label="Responded At">
                {formatRespondedAt(item.respondedAt)}
              </Detail>
              <Detail label="Response Source">
                {item.source === "public_link"
                  ? "Public RSVP link"
                  : item.source === "manual"
                    ? "Manual update"
                    : "Personal guest link"}
              </Detail>
            </div>

            {item.guestId ? (
              <Link
                href={`/app/invitations/${invitationId}/guests`}
                className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase hover:text-on-surface"
              >
                <UserRound aria-hidden size={15} />
                View related guest
              </Link>
            ) : (
              <p className="text-[11px] leading-5 text-on-surface-variant">
                This guest submitted their details through the public RSVP link
                and is not yet part of your managed guest list.
              </p>
            )}
          </div>

          <div className="bg-surface-low p-5 sm:px-8">
            {mode === "edit" ? (
              <button
                type="submit"
                className="h-12 w-full bg-primary px-5 text-[10px] font-semibold tracking-[0.13em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Save RSVP Update
              </button>
            ) : (
              <button
                type="button"
                onClick={onEdit}
                className="h-12 w-full bg-primary px-5 text-[10px] font-semibold tracking-[0.13em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Update This RSVP
              </button>
            )}
          </div>
        </form>
      </aside>
    </div>
  );
}

function Detail({
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
