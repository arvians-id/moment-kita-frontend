import { NotificationCard } from "@/components/customer/notifications/notification-card";
import type { NotificationGroup } from "@/components/customer/notifications/notification-utils";

export function NotificationGroupSection({
  group,
  onMarkRead,
}: {
  group: NotificationGroup;
  onMarkRead: (id: string) => void;
}) {
  return (
    <section aria-label={group.label} className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-serif text-[18px] leading-6 text-on-surface">
          {group.label}
        </span>
        <div aria-hidden className="h-px flex-1 bg-surface-highest" />
      </div>

      <div className="space-y-3">
        {group.items.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkRead={onMarkRead}
          />
        ))}
      </div>
    </section>
  );
}
