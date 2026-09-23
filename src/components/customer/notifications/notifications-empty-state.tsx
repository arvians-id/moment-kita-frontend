import { PartyPopper, SearchX } from "lucide-react";

/** Shown when the customer has never received a notification. */
export function NotificationsEmptyState() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 bg-surface-lowest p-8 text-center shadow-sm">
      <span className="grid size-14 place-items-center rounded-full bg-surface-low text-secondary">
        <PartyPopper aria-hidden size={26} />
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          All caught up
        </span>
        <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
          You have no notifications yet
        </h2>
        <p className="text-[13px] leading-5 text-on-surface-variant">
          Updates about your invitations, guests, payments, and account will
          appear here as they happen.
        </p>
      </div>
    </section>
  );
}

/** Shown when a filter or search matches nothing, without hiding history. */
export function NotificationsFilteredEmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="bg-surface-lowest px-6 py-14 text-center shadow-sm">
      <SearchX aria-hidden size={30} className="mx-auto text-on-surface-variant" />
      <h2 className="mt-3 font-serif text-[22px]">
        No notifications match this view
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-[12px] leading-5 text-on-surface-variant">
        Nothing here right now. Your read notification history is preserved —
        try another filter.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 min-h-10 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
      >
        View All Notifications
      </button>
    </div>
  );
}
