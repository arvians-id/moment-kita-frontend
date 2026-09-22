"use client";

import {
  CalendarDays,
  ChevronDown,
  Download,
  ExternalLink,
  Search,
  Settings2,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type {
  GuestAttendanceStatus,
  GuestRsvpResponse,
  InvitationGuest,
  PublicRsvpResponse,
  RsvpManagementData,
} from "@/types";

import { RsvpDrawer } from "./rsvp-drawer";
import { RsvpResponseList } from "./rsvp-response-list";
import { RsvpSummaryCards } from "./rsvp-summary";
import {
  buildRsvpItems,
  calculateRsvpSummary,
  type RsvpListItem,
} from "./rsvp-utils";

type StatusFilter = "all" | GuestAttendanceStatus;

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Responses" },
  { value: "attending", label: "Attending" },
  { value: "not_attending", label: "Not Attending" },
  { value: "pending", label: "Pending" },
];

export function RsvpManagement({
  initialData,
}: {
  initialData: RsvpManagementData;
}) {
  const [guests, setGuests] = useState<InvitationGuest[]>(() =>
    initialData.guests.map((guest) => ({ ...guest })),
  );
  const [responses, setResponses] = useState<GuestRsvpResponse[]>(() =>
    initialData.responses.map((response) => ({ ...response })),
  );
  const [publicResponses, setPublicResponses] = useState<PublicRsvpResponse[]>(
    () => initialData.publicResponses.map((response) => ({ ...response })),
  );
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<RsvpListItem | null>(null);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");
  const [notice, setNotice] = useState("");

  const items = useMemo(
    () => buildRsvpItems(guests, responses, publicResponses),
    [guests, publicResponses, responses],
  );
  const summary = useMemo(
    () => calculateRsvpSummary(guests, publicResponses),
    [guests, publicResponses],
  );
  const groups = useMemo(
    () =>
      Array.from(
        new Set([...initialData.groups, ...items.map((item) => item.group)]),
      ).sort((a, b) => a.localeCompare(b)),
    [initialData.groups, items],
  );

  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items
      .filter((item) => {
        const matchesStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchesGroup =
          groupFilter === "all" || item.group === groupFilter;
        const matchesQuery =
          term === "" ||
          `${item.name} ${item.group} ${item.category} ${item.message}`
            .toLowerCase()
            .includes(term);
        return matchesStatus && matchesGroup && matchesQuery;
      })
      .sort((a, b) => {
        if (!a.respondedAt && !b.respondedAt) {
          return a.name.localeCompare(b.name);
        }
        if (!a.respondedAt) return 1;
        if (!b.respondedAt) return -1;
        return b.respondedAt.localeCompare(a.respondedAt);
      });
  }, [groupFilter, items, query, statusFilter]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function openDrawer(item: RsvpListItem, mode: "view" | "edit") {
    setSelectedItem(item);
    setDrawerMode(mode);
  }

  function openManualUpdate() {
    const firstPending =
      items.find((item) => item.status === "pending") ?? items[0];
    if (firstPending) openDrawer(firstPending, "edit");
  }

  function saveUpdate(update: {
    id: string;
    status: GuestAttendanceStatus;
    confirmedPax: number;
    message: string;
  }) {
    const now = new Date().toISOString();
    const guest = guests.find((candidate) => candidate.id === update.id);

    if (guest) {
      setGuests((current) =>
        current.map((candidate) =>
          candidate.id === update.id
            ? {
                ...candidate,
                rsvpStatus: update.status,
                confirmedPax: update.confirmedPax,
                lastUpdatedLabel: "Updated just now",
                activityNote: "Manual RSVP update",
              }
            : candidate,
        ),
      );
      setResponses((current) => {
        const exists = current.some(
          (response) => response.guestId === update.id,
        );
        const nextResponse: GuestRsvpResponse = {
          guestId: update.id,
          message: update.message,
          respondedAt: update.status === "pending" ? null : now,
          source: "manual",
        };
        return exists
          ? current.map((response) =>
              response.guestId === update.id ? nextResponse : response,
            )
          : [...current, nextResponse];
      });
    } else {
      setPublicResponses((current) =>
        current.map((response) =>
          response.id === update.id
            ? {
                ...response,
                rsvpStatus: update.status,
                confirmedPax: update.confirmedPax,
                message: update.message,
                respondedAt: now,
              }
            : response,
        ),
      );
    }

    setSelectedItem(null);
    showNotice("RSVP response updated.");
  }

  function exportResponses() {
    const rows = [
      [
        "Guest",
        "Group",
        "Response",
        "Confirmed Pax",
        "Message",
        "Responded At",
        "Source",
      ],
      ...items.map((item) => [
        item.name,
        item.group,
        item.status,
        item.confirmedPax,
        item.message,
        item.respondedAt ?? "",
        item.source,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${initialData.invitation.slug}-rsvp-responses.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    showNotice("RSVP export prepared.");
  }

  const deadline = formatDeadline(initialData.settings.deadline);
  const hasRecordedResponses = summary.responded > 0;

  return (
    <div className="-mx-4 -my-8 overflow-x-clip sm:-mx-6 lg:-mx-8">
      <header className="border-b border-border bg-surface-low">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
            <Link
              href="/app/invitations"
              className="transition-colors hover:text-on-surface"
            >
              My Invitations
            </Link>
            <span aria-hidden>/</span>
            <span className="max-w-[16rem] truncate font-serif text-[17px] font-normal tracking-normal text-on-surface normal-case">
              {initialData.invitation.coupleLabel} ·{" "}
              {initialData.invitation.templateName}
            </span>
            <span aria-hidden>/</span>
            <span className="text-secondary">RSVP</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-lowest px-3 text-[10px] font-semibold tracking-[0.1em] uppercase shadow-sm">
              <span
                className={cn(
                  "size-2 rounded-full",
                  initialData.settings.enabled ? "bg-secondary" : "bg-outline",
                )}
              />
              RSVP {initialData.settings.enabled ? "Enabled" : "Disabled"}
            </span>
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-container px-3 text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              <CalendarDays aria-hidden size={14} />
              Deadline {deadline}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Guest Responses
            </p>
            <h1 className="mt-2 font-serif text-[38px] leading-[1.02] tracking-[-0.025em] sm:text-[48px] lg:text-[56px]">
              RSVP &amp; Attendance
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-on-surface-variant sm:text-[16px]">
              Review replies, keep confirmed headcounts current, and respond to
              each guest with care.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:max-w-xl lg:justify-end">
            <button
              type="button"
              onClick={exportResponses}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.11em] uppercase shadow-sm transition-colors hover:bg-surface-container"
            >
              <Download aria-hidden size={16} /> Export RSVP
            </button>
            <Link
              href={`/app/invitations/${initialData.invitation.id}/edit#rsvp`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-container px-4 text-[10px] font-semibold tracking-[0.11em] uppercase transition-colors hover:bg-surface-high"
            >
              <Settings2 aria-hidden size={16} /> Settings
            </Link>
            <button
              type="button"
              onClick={openManualUpdate}
              disabled={items.length === 0}
              className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase shadow-md transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45"
            >
              <UserRoundCheck aria-hidden size={16} /> Manual RSVP Update
            </button>
          </div>
        </section>

        {!initialData.settings.enabled ? (
          <DisabledState invitationId={initialData.invitation.id} />
        ) : (
          <>
            <div className="mt-8">
              <RsvpSummaryCards summary={summary} />
            </div>

            <SettingsSummary
              enabled={initialData.settings.enabled}
              accessMode={initialData.settings.accessMode}
              deadline={deadline}
              invitationId={initialData.invitation.id}
            />

            {!hasRecordedResponses ? (
              <NoResponsesState
                invitationId={initialData.invitation.id}
                invitationSlug={initialData.invitation.slug}
              />
            ) : null}

            <section className="mt-7" aria-labelledby="responses-heading">
              <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
                    Response Registry
                  </p>
                  <h2
                    id="responses-heading"
                    className="mt-1 font-serif text-[26px] sm:text-[30px]"
                  >
                    Guest Responses
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:min-w-[760px]">
                  <div className="relative">
                    <Search
                      aria-hidden
                      size={17}
                      className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
                    />
                    <label htmlFor="rsvp-search" className="sr-only">
                      Search guests
                    </label>
                    <input
                      id="rsvp-search"
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search guest or note..."
                      className="h-11 w-full bg-surface-lowest pr-3 pl-10 text-[12px] outline-none focus:bg-surface-container"
                    />
                  </div>
                  <FilterSelect
                    label="Response status"
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value as StatusFilter)}
                    options={statusOptions.map((option) => ({
                      value: option.value,
                      label: `${option.label} (${countStatus(items, option.value)})`,
                    }))}
                  />
                  <FilterSelect
                    label="Guest group"
                    value={groupFilter}
                    onChange={setGroupFilter}
                    options={[
                      { value: "all", label: "All Guest Groups" },
                      ...groups.map((group) => ({
                        value: group,
                        label: group,
                      })),
                    ]}
                  />
                </div>
              </div>

              {visibleItems.length ? (
                <RsvpResponseList
                  items={visibleItems}
                  onView={(item) => openDrawer(item, "view")}
                  onEdit={(item) => openDrawer(item, "edit")}
                />
              ) : (
                <div className="bg-surface-lowest px-6 py-14 text-center shadow-sm">
                  <p className="font-serif text-[24px]">
                    No matching responses
                  </p>
                  <p className="mt-2 text-[12px] text-on-surface-variant">
                    Clear or adjust the filters to see more guests.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setStatusFilter("all");
                      setGroupFilter("all");
                    }}
                    className="mt-5 text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {selectedItem ? (
        <RsvpDrawer
          key={`${selectedItem.id}-${drawerMode}`}
          invitationId={initialData.invitation.id}
          item={selectedItem}
          items={items}
          mode={drawerMode}
          onSelect={(item) => setSelectedItem(item)}
          onEdit={() => setDrawerMode("edit")}
          onClose={() => setSelectedItem(null)}
          onSave={saveUpdate}
        />
      ) : null}

      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-[90] bg-primary px-4 py-3 text-[11px] font-medium text-primary-foreground shadow-xl sm:right-6 sm:bottom-6"
        >
          {notice}
        </div>
      ) : null}
    </div>
  );
}

function SettingsSummary({
  enabled,
  accessMode,
  deadline,
  invitationId,
}: {
  enabled: boolean;
  accessMode: RsvpManagementData["settings"]["accessMode"];
  deadline: string;
  invitationId: string;
}) {
  return (
    <section
      aria-label="RSVP configuration summary"
      className="mt-6 flex flex-col justify-between gap-5 bg-surface-container p-5 shadow-sm lg:flex-row lg:items-center"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center bg-primary text-primary-foreground">
          <ShieldCheck aria-hidden size={21} />
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-8">
          <Setting label="RSVP">{enabled ? "Enabled" : "Disabled"}</Setting>
          <Setting label="Access">
            {accessMode === "anyone_with_link"
              ? "Anyone With Link"
              : "Guest List Only"}
          </Setting>
          <Setting label="Deadline">{deadline}</Setting>
        </div>
      </div>
      <Link
        href={`/app/invitations/${invitationId}/edit#rsvp`}
        className="inline-flex h-10 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.11em] uppercase shadow-sm transition-colors hover:bg-surface-high"
      >
        <Settings2 aria-hidden size={15} /> Manage RSVP Settings
      </Link>
    </section>
  );
}

function Setting({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span>
      <span className="block text-[9px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
        {label}
      </span>
      <strong className="mt-1 block text-[11px] leading-5 font-semibold">
        {children}
      </strong>
    </span>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label className="sr-only">{label}</label>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none bg-surface-lowest px-3 pr-9 text-[10px] font-semibold tracking-[0.08em] uppercase outline-none focus:bg-surface-container"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        size={15}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}

function NoResponsesState({
  invitationId,
  invitationSlug,
}: {
  invitationId: string;
  invitationSlug: string;
}) {
  return (
    <section className="mt-6 flex flex-col justify-between gap-5 border border-border bg-surface-lowest p-5 sm:flex-row sm:items-center">
      <div>
        <p className="font-serif text-[22px]">No RSVP responses yet</p>
        <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
          No replies have been recorded yet. Review your guest list, then share
          the invitation when you are ready to collect responses.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/app/invitations/${invitationId}/guests`}
          className="inline-flex h-10 items-center px-4 text-[10px] font-semibold tracking-[0.1em] uppercase"
        >
          Manage Guests
        </Link>
        <Link
          href={`/${invitationSlug}`}
          className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
        >
          Share Invitation <ExternalLink aria-hidden size={14} />
        </Link>
      </div>
    </section>
  );
}

function DisabledState({ invitationId }: { invitationId: string }) {
  return (
    <section className="mt-8 bg-surface-lowest px-6 py-14 text-center shadow-sm sm:px-10">
      <span className="mx-auto grid size-12 place-items-center bg-surface-container text-secondary">
        <ShieldCheck aria-hidden size={23} />
      </span>
      <h2 className="mt-5 font-serif text-[28px]">
        RSVP is currently disabled
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-[12px] leading-6 text-on-surface-variant">
        Enable the RSVP section in Invitation Builder before sharing your
        invitation. Existing guest records will remain ready here.
      </p>
      <Link
        href={`/app/invitations/${invitationId}/edit#rsvp`}
        className="mt-6 inline-flex h-11 items-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
      >
        <Settings2 aria-hidden size={15} /> Enable RSVP
      </Link>
    </section>
  );
}

function countStatus(items: RsvpListItem[], status: StatusFilter): number {
  return status === "all"
    ? items.length
    : items.filter((item) => item.status === status).length;
}

function formatDeadline(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
