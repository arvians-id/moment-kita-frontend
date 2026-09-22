"use client";

import {
  ChevronRight,
  ExternalLink,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type {
  WishesManagementData,
  WishModerationStatus,
  WishRecord,
} from "@/types";

import { WishCard } from "./wish-card";
import { DeleteWishDialog, WishDetailDialog } from "./wish-dialogs";
import {
  buildWishItems,
  calculateWishesSummary,
  type WishViewItem,
} from "./wish-utils";
import { WishesSummary } from "./wishes-summary";

type WishFilter = "all" | WishModerationStatus;

const filters: { value: WishFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "pending", label: "Waiting for Approval" },
  { value: "hidden", label: "Hidden" },
];

export function WishesManagement({
  initialData,
}: {
  initialData: WishesManagementData;
}) {
  const [wishes, setWishes] = useState<WishRecord[]>(() =>
    initialData.wishes.map((wish) => ({ ...wish })),
  );
  const [filter, setFilter] = useState<WishFilter>("all");
  const [query, setQuery] = useState("");
  const [detailWish, setDetailWish] = useState<WishViewItem | null>(null);
  const [deleteWish, setDeleteWish] = useState<WishViewItem | null>(null);
  const [notice, setNotice] = useState("");

  const items = useMemo(
    () => buildWishItems(wishes, initialData.guests),
    [initialData.guests, wishes],
  );
  const summary = useMemo(() => calculateWishesSummary(wishes), [wishes]);
  const visibleWishes = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items
      .filter((wish) => {
        const matchesStatus = filter === "all" || wish.status === filter;
        const matchesQuery =
          term === "" ||
          `${wish.author} ${wish.group} ${wish.message}`
            .toLowerCase()
            .includes(term);
        return matchesStatus && matchesQuery;
      })
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  }, [filter, items, query]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function changeStatus(id: string, status: WishModerationStatus) {
    const wish = items.find((item) => item.id === id);
    setWishes((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    const action =
      status === "published"
        ? wish?.status === "hidden"
          ? "restored"
          : "approved and published"
        : "hidden from the public invitation";
    showNotice(`${wish?.author ?? "Wish"} was ${action}.`);
  }

  function confirmDelete() {
    if (!deleteWish) return;
    setWishes((current) => current.filter((wish) => wish.id !== deleteWish.id));
    showNotice(`Wish from ${deleteWish.author} was deleted.`);
    setDeleteWish(null);
  }

  const moderationLabel =
    initialData.settings.moderationMode === "approval_required"
      ? "Require Approval"
      : "Publish Automatically";

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
            <span className="text-secondary">Wishes</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-lowest px-3 text-[10px] font-semibold tracking-[0.1em] uppercase shadow-sm">
              <span
                className={cn(
                  "size-2 rounded-full",
                  initialData.settings.enabled ? "bg-secondary" : "bg-outline",
                )}
              />
              Wishes {initialData.settings.enabled ? "Enabled" : "Disabled"}
            </span>
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-container px-3 text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              <ShieldCheck aria-hidden size={14} />
              {moderationLabel}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Living Guestbook
            </p>
            <h1 className="mt-2 font-serif text-[38px] leading-[1.02] tracking-[-0.025em] sm:text-[48px] lg:text-[56px]">
              Heartfelt Wishes &amp; Blessings
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-on-surface-variant sm:text-[16px]">
              Read, curate, and preserve warm messages shared by your cherished
              guests for this celebration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:justify-end">
            <Link
              href={`/${initialData.invitation.slug}#wishes`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.11em] uppercase shadow-sm hover:bg-surface-container"
            >
              View Invitation <ExternalLink aria-hidden size={15} />
            </Link>
            <Link
              href={`/app/invitations/${initialData.invitation.id}/edit#wishes`}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase shadow-sm hover:bg-secondary"
            >
              <Settings2 aria-hidden size={15} /> Wishes Settings
            </Link>
          </div>
        </section>

        {!initialData.settings.enabled ? (
          <DisabledState invitationId={initialData.invitation.id} />
        ) : (
          <>
            <div className="mt-8">
              <WishesSummary
                summary={summary}
                onPending={() => setFilter("pending")}
              />
            </div>

            <SettingsSummary
              invitationId={initialData.invitation.id}
              moderationLabel={moderationLabel}
              moderationMode={initialData.settings.moderationMode}
            />

            {summary.total === 0 ? (
              <NoWishesState
                invitationId={initialData.invitation.id}
                invitationSlug={initialData.invitation.slug}
              />
            ) : (
              <section className="mt-7" aria-labelledby="wish-stream-heading">
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
                      Guestbook Stream
                    </p>
                    <h2
                      id="wish-stream-heading"
                      className="mt-1 font-serif text-[27px] sm:text-[31px]"
                    >
                      Messages from Your Guests
                    </h2>
                  </div>
                  <div className="flex min-w-0 flex-col gap-3 xl:w-[760px] xl:items-end">
                    <div className="relative w-full xl:max-w-md">
                      <Search
                        aria-hidden
                        size={17}
                        className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
                      />
                      <label htmlFor="wish-search" className="sr-only">
                        Search wishes
                      </label>
                      <input
                        id="wish-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search guest name or message..."
                        className="h-11 w-full bg-surface-lowest pr-3 pl-10 text-[12px] outline-none shadow-sm focus:bg-surface-container"
                      />
                    </div>
                    <div
                      role="group"
                      aria-label="Filter wishes by status"
                      className="flex w-full items-center gap-1 overflow-x-auto bg-surface-container p-1 xl:w-auto"
                    >
                      {filters.map((option) => {
                        const active = filter === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setFilter(option.value)}
                            className={cn(
                              "shrink-0 px-3 py-2 text-[9px] font-semibold tracking-[0.09em] uppercase transition-colors",
                              active
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-on-surface-variant hover:bg-surface-lowest hover:text-on-surface",
                            )}
                          >
                            {option.label} ({countStatus(wishes, option.value)})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {visibleWishes.length ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {visibleWishes.map((wish) => (
                      <WishCard
                        key={wish.id}
                        invitationId={initialData.invitation.id}
                        wish={wish}
                        onStatusChange={changeStatus}
                        onDelete={setDeleteWish}
                        onView={setDetailWish}
                      />
                    ))}
                  </div>
                ) : (
                  <FilteredEmptyState
                    filter={filter}
                    hasQuery={query.trim().length > 0}
                    onReset={() => {
                      setFilter("all");
                      setQuery("");
                    }}
                  />
                )}
              </section>
            )}
          </>
        )}
      </div>

      {detailWish ? (
        <WishDetailDialog
          invitationId={initialData.invitation.id}
          wish={detailWish}
          onClose={() => setDetailWish(null)}
        />
      ) : null}
      {deleteWish ? (
        <DeleteWishDialog
          wish={deleteWish}
          onClose={() => setDeleteWish(null)}
          onConfirm={confirmDelete}
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
  invitationId,
  moderationLabel,
  moderationMode,
}: {
  invitationId: string;
  moderationLabel: string;
  moderationMode: WishesManagementData["settings"]["moderationMode"];
}) {
  return (
    <section
      aria-label="Wishes settings summary"
      className="mt-6 flex flex-col justify-between gap-5 bg-surface-container p-5 shadow-sm lg:flex-row lg:items-center"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center bg-primary text-primary-foreground">
          <ShieldCheck aria-hidden size={21} />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase">
              Wishes Enabled
            </p>
            <span className="bg-terracotta-soft/35 px-2 py-1 text-[9px] font-semibold tracking-[0.09em] text-accent-foreground uppercase">
              {moderationLabel}
            </span>
          </div>
          <p className="mt-1 max-w-3xl text-[11px] leading-5 text-on-surface-variant">
            {moderationMode === "approval_required"
              ? "New wishes wait for your approval before appearing on the public invitation."
              : "New wishes appear on the public invitation as soon as guests submit them."}
          </p>
        </div>
      </div>
      <Link
        href={`/app/invitations/${invitationId}/edit#wishes`}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.11em] uppercase shadow-sm hover:bg-surface-high"
      >
        <Settings2 aria-hidden size={15} /> Manage Settings
      </Link>
    </section>
  );
}

function DisabledState({ invitationId }: { invitationId: string }) {
  return (
    <section className="mt-8 bg-surface-lowest px-6 py-14 text-center shadow-sm sm:px-10">
      <span className="mx-auto grid size-12 place-items-center bg-surface-container text-secondary">
        <Sparkles aria-hidden size={22} />
      </span>
      <h2 className="mt-5 font-serif text-[28px]">
        Wishes are currently disabled
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-[12px] leading-6 text-on-surface-variant">
        Enable the Wishes section in Invitation Builder when you are ready to
        welcome messages from your guests.
      </p>
      <Link
        href={`/app/invitations/${invitationId}/edit#wishes`}
        className="mt-6 inline-flex h-11 items-center gap-2 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
      >
        <Settings2 aria-hidden size={15} /> Enable Wishes
      </Link>
    </section>
  );
}

function NoWishesState({
  invitationId,
  invitationSlug,
}: {
  invitationId: string;
  invitationSlug: string;
}) {
  return (
    <section className="mt-7 bg-surface-lowest px-6 py-12 text-center shadow-sm">
      <span className="mx-auto grid size-12 place-items-center bg-surface-container text-secondary">
        <Sparkles aria-hidden size={22} />
      </span>
      <h2 className="mt-5 font-serif text-[27px]">No wishes yet</h2>
      <p className="mx-auto mt-2 max-w-lg text-[12px] leading-6 text-on-surface-variant">
        Guest messages will gather here after you share the invitation.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href={`/app/invitations/${invitationId}/edit#wishes`}
          className="inline-flex h-10 items-center px-4 text-[10px] font-semibold tracking-[0.1em] uppercase"
        >
          Review Wishes Settings
        </Link>
        <Link
          href={`/${invitationSlug}#wishes`}
          className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
        >
          View Invitation <ExternalLink aria-hidden size={14} />
        </Link>
      </div>
    </section>
  );
}

function FilteredEmptyState({
  filter,
  hasQuery,
  onReset,
}: {
  filter: WishFilter;
  hasQuery: boolean;
  onReset: () => void;
}) {
  const waitingEmpty = filter === "pending" && !hasQuery;
  return (
    <div className="mt-4 bg-surface-lowest px-6 py-14 text-center shadow-sm">
      <h3 className="font-serif text-[24px]">
        {waitingEmpty ? "No wishes waiting for approval" : "No matching wishes"}
      </h3>
      <p className="mt-2 text-[12px] text-on-surface-variant">
        {waitingEmpty
          ? "Your moderation queue is clear."
          : "Try another status or search term."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase"
      >
        View all wishes <ChevronRight aria-hidden size={14} />
      </button>
    </div>
  );
}

function countStatus(wishes: WishRecord[], status: WishFilter): number {
  return status === "all"
    ? wishes.length
    : wishes.filter((wish) => wish.status === status).length;
}
