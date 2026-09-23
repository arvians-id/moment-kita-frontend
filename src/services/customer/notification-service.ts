import { mockCustomerInvitations } from "@/data/mocks/customer";
import { mockCustomerNotifications } from "@/data/mocks/notifications";
import { mockCustomerTransactions } from "@/data/mocks/transactions";
import type {
  CustomerNotification,
  CustomerNotificationWithContext,
  NotificationCategory,
} from "@/types";

/**
 * Notification reads for the Customer CMS.
 *
 * Same boundary contract as the rest of `services/customer`: pages never
 * touch mock data directly, so the source can be swapped for the BFF later
 * without changing page components. Read/unread state is presentation-only
 * for now (see `NotificationCenter`) — there is no write endpoint yet.
 */

export interface NotificationCounts {
  all: number;
  unread: number;
  attention: number;
  wedding: number;
  guestsRsvp: number;
  payments: number;
  account: number;
}

export interface NotificationsOverview {
  notifications: CustomerNotificationWithContext[];
  counts: NotificationCounts;
  /** Notifications received in the last 7 days, across every celebration. */
  recentCount: number;
}

const DAY_MS = 86_400_000;

function countByCategory(
  notifications: CustomerNotification[],
  category: NotificationCategory,
): number {
  return notifications.filter((item) => item.category === category).length;
}

function resolve(
  notification: CustomerNotification,
): CustomerNotificationWithContext {
  const relatedInvitation = notification.relatedInvitationId
    ? mockCustomerInvitations.find(
        (invitation) => invitation.id === notification.relatedInvitationId,
      )
    : undefined;

  const relatedTransaction = notification.relatedTransactionId
    ? mockCustomerTransactions.find(
        (transaction) => transaction.id === notification.relatedTransactionId,
      )
    : undefined;

  return {
    ...notification,
    relatedInvitation: relatedInvitation
      ? {
          id: relatedInvitation.id,
          coupleLabel: relatedInvitation.coupleLabel,
          slug: relatedInvitation.slug,
          templateName: relatedInvitation.templateName,
        }
      : null,
    relatedTransaction: relatedTransaction
      ? {
          id: relatedTransaction.id,
          reference: relatedTransaction.reference,
          productName: relatedTransaction.productName,
        }
      : null,
  };
}

export async function getCustomerNotifications(): Promise<
  CustomerNotificationWithContext[]
> {
  return [...mockCustomerNotifications]
    .sort(
      (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
    )
    .map(resolve);
}

export async function getNotificationsOverview(): Promise<NotificationsOverview> {
  const notifications = await getCustomerNotifications();
  const recentCutoff = Date.now() - 7 * DAY_MS;

  return {
    notifications,
    counts: {
      all: notifications.length,
      unread: notifications.filter((item) => !item.read).length,
      attention: notifications.filter((item) => item.attention).length,
      wedding: countByCategory(notifications, "wedding"),
      guestsRsvp: countByCategory(notifications, "guestsRsvp"),
      payments: countByCategory(notifications, "payments"),
      account: countByCategory(notifications, "account"),
    },
    recentCount: notifications.filter(
      (item) => new Date(item.occurredAt).getTime() >= recentCutoff,
    ).length,
  };
}

/** Lightweight read for the sidebar/topbar unread badge. */
export async function getUnreadNotificationCount(): Promise<number> {
  return mockCustomerNotifications.filter((item) => !item.read).length;
}
