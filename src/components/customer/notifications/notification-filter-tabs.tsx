import {
  notificationFilters,
  type NotificationFilter,
} from "@/components/customer/notifications/notification-utils";

export function NotificationFilterTabs({
  active,
  onChange,
  countFor,
}: {
  active: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
  countFor: (filter: NotificationFilter) => number;
}) {
  return (
    <div
      role="group"
      aria-label="Filter notifications"
      className="flex flex-wrap items-center gap-1 overflow-x-auto bg-surface-lowest p-1 shadow-sm"
    >
      {notificationFilters.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
            className={`shrink-0 px-3 py-2 text-[11px] font-semibold tracking-[0.11em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {filter.label} ({countFor(filter.value)})
          </button>
        );
      })}
    </div>
  );
}
