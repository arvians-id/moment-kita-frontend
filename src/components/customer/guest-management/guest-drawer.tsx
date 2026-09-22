"use client";

import { Copy, LockKeyhole, Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { GuestAttendanceStatus, InvitationGuest } from "@/types";

import { createGuestAlias, createGuestInitials } from "./guest-utils";

const fieldClass =
  "h-11 w-full border border-transparent bg-surface-low px-3 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary focus:bg-surface-lowest";
const labelClass =
  "mb-2 block text-[10px] font-semibold tracking-[0.14em] uppercase";

export function GuestDrawer({
  invitationSlug,
  guest,
  groups,
  onClose,
  onSave,
}: {
  invitationSlug: string;
  guest: InvitationGuest | null;
  groups: string[];
  onClose: () => void;
  onSave: (guest: InvitationGuest) => void;
}) {
  const [name, setName] = useState(guest?.name ?? "");
  const [contact, setContact] = useState(guest?.contact ?? "+62 ");
  const [group, setGroup] = useState(
    guest?.group ??
      (groups.includes("Close Friends") ? "Close Friends" : groups[0]) ??
      "Family",
  );
  const [category, setCategory] = useState(guest?.category ?? "");
  const [maxPax, setMaxPax] = useState(guest?.maxPax ?? 2);
  const [status, setStatus] = useState<GuestAttendanceStatus>(
    guest?.rsvpStatus ?? "pending",
  );
  const [confirmedPax, setConfirmedPax] = useState(guest?.confirmedPax ?? 0);
  const [notes, setNotes] = useState(guest?.notes ?? "");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const alias = useMemo(() => createGuestAlias(name), [name]);
  const friendlyUrl = `momentkita.id/${invitationSlug}?to=${alias}`;

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

  function changeStatus(next: GuestAttendanceStatus) {
    setStatus(next);
    if (next !== "attending") setConfirmedPax(0);
    if (next === "attending" && confirmedPax === 0) setConfirmedPax(1);
  }

  async function copyPreview() {
    await navigator.clipboard.writeText(`https://${friendlyUrl}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter the guest name shown on the invitation.");
      return;
    }

    const safeConfirmedPax =
      status === "attending" ? Math.min(Math.max(confirmedPax, 1), maxPax) : 0;

    onSave({
      id: guest?.id ?? `guest_local_${Date.now()}`,
      name: trimmedName,
      initials: createGuestInitials(trimmedName),
      contact: contact.trim(),
      group,
      category: category.trim() || "General Guest Circle",
      maxPax,
      rsvpStatus: status,
      confirmedPax: safeConfirmedPax,
      linkAlias: alias,
      linkDispatched: guest?.linkDispatched ?? false,
      lastUpdatedLabel: guest ? "Edited just now" : "Added just now",
      activityNote: guest?.activityNote ?? "Ready for first dispatch",
      notes: notes.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close guest editor"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-espresso/50 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-surface-lowest shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 bg-surface-low px-5 py-5 sm:px-8 sm:py-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Atelier Registry
            </p>
            <h2
              id="guest-drawer-title"
              className="mt-1 font-serif text-[27px] leading-9"
            >
              {guest ? "Edit Guest Invitation" : "Add New Guest"}
            </h2>
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
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-8">
            <div>
              <label htmlFor="guest-name" className={labelClass}>
                Guest Full Name <span className="text-secondary">*</span>
              </label>
              <input
                id="guest-name"
                autoFocus
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                placeholder="e.g. Aditya Pratama & Partner"
                className={fieldClass}
              />
              <p className="mt-1.5 text-[10px] leading-4 text-on-surface-variant">
                Displayed directly on the guest’s digital stationery envelope.
              </p>
              {error ? (
                <p role="alert" className="mt-1 text-[11px] text-error">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="guest-group" className={labelClass}>
                  Guest Group
                </label>
                <select
                  id="guest-group"
                  value={group}
                  onChange={(event) => setGroup(event.target.value)}
                  className={cn(fieldClass, "cursor-pointer")}
                >
                  {groups.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className={labelClass}>Maximum Pax</span>
                <div className="flex h-11 items-center bg-surface-low">
                  <button
                    type="button"
                    aria-label="Decrease maximum pax"
                    onClick={() =>
                      setMaxPax((current) => Math.max(current - 1, 1))
                    }
                    className="grid h-full w-11 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
                  >
                    <Minus aria-hidden size={15} />
                  </button>
                  <span className="flex-1 text-center text-[13px] font-semibold">
                    {maxPax} Pax
                  </span>
                  <button
                    type="button"
                    aria-label="Increase maximum pax"
                    onClick={() =>
                      setMaxPax((current) => Math.min(current + 1, 10))
                    }
                    className="grid h-full w-11 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
                  >
                    <Plus aria-hidden size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="guest-contact" className={labelClass}>
                  WhatsApp / Contact
                </label>
                <input
                  id="guest-contact"
                  type="tel"
                  inputMode="tel"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="+62 812-3456-7890"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="guest-category" className={labelClass}>
                  Category / Table
                </label>
                <input
                  id="guest-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="e.g. Family · Table 04"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="guest-rsvp" className={labelClass}>
                  RSVP Status
                </label>
                <select
                  id="guest-rsvp"
                  value={status}
                  onChange={(event) =>
                    changeStatus(event.target.value as GuestAttendanceStatus)
                  }
                  className={cn(fieldClass, "cursor-pointer")}
                >
                  <option value="pending">Pending</option>
                  <option value="attending">Attending</option>
                  <option value="not_attending">Not Attending</option>
                </select>
              </div>
              <div>
                <label htmlFor="guest-confirmed-pax" className={labelClass}>
                  Confirmed Pax
                </label>
                <input
                  id="guest-confirmed-pax"
                  type="number"
                  min={status === "attending" ? 1 : 0}
                  max={maxPax}
                  disabled={status !== "attending"}
                  value={confirmedPax}
                  onChange={(event) =>
                    setConfirmedPax(Number(event.target.value))
                  }
                  className={cn(
                    fieldClass,
                    status !== "attending" && "cursor-not-allowed opacity-55",
                  )}
                />
              </div>
            </div>

            <div>
              <label htmlFor="guest-notes" className={labelClass}>
                Personal Notes
              </label>
              <textarea
                id="guest-notes"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Dietary preferences, table placement, or a private note..."
                className={cn(fieldClass, "h-auto resize-none py-3")}
              />
            </div>

            <div className="bg-surface-low p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  Friendly Invitation Address
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.1em] text-secondary uppercase">
                  <LockKeyhole aria-hidden size={12} /> Secure token hidden
                </span>
              </div>
              <div className="flex items-center gap-2 bg-surface-lowest px-3 py-2.5 shadow-sm">
                <code className="min-w-0 flex-1 truncate text-[11px] text-on-surface-variant">
                  {friendlyUrl}
                </code>
                <button
                  type="button"
                  onClick={copyPreview}
                  aria-label="Copy invitation address"
                  className="grid size-8 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                  <Copy aria-hidden size={15} />
                </button>
              </div>
              <p
                aria-live="polite"
                className="mt-2 text-[9px] text-on-surface-variant"
              >
                {copied
                  ? "Address copied."
                  : "The backend will append the private fragment only when dispatching."}
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border bg-surface-low px-5 py-4 sm:flex-row sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
            >
              {guest ? "Save Changes" : "Save Guest"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
