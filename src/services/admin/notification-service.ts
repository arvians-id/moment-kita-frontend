import { mockAdminNotifications } from "@/data/mocks/admin-notifications";
import { getAdminCustomers } from "@/services/admin/customer-service";
import {
  getAdminInvitationDetail,
  getAdminInvitationList,
} from "@/services/admin/invitation-service";
import { getAdminPrintedOrderList } from "@/services/admin/printed-order-service";
import { getAdminTransactionList } from "@/services/admin/transaction-service";
import type {
  AdminNotificationContext,
  AdminNotificationWithContext,
} from "@/types";

function titleCase(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Resolve an event's compact id reference against the canonical Admin
 * registries. Notification fixtures never copy full domain objects.
 */
export async function getAdminNotifications(): Promise<
  AdminNotificationWithContext[]
> {
  const [transactionsData, invitationsData, printedOrdersData, customers] =
    await Promise.all([
      getAdminTransactionList(),
      getAdminInvitationList(),
      getAdminPrintedOrderList(),
      getAdminCustomers(),
    ]);

  const transactions = new Map(
    transactionsData.transactions.map((item) => [item.id, item]),
  );
  const invitations = new Map(
    invitationsData.invitations.map((item) => [item.id, item]),
  );
  const printedOrders = new Map(
    printedOrdersData.orders.map((item) => [item.id, item]),
  );
  const customerMap = new Map(customers.map((item) => [item.id, item]));

  const resolved = await Promise.all(
    mockAdminNotifications.map(async (notification) => {
      let context: AdminNotificationContext;

      if (notification.relatedResourceType === "transaction") {
        const transaction = transactions.get(notification.relatedResourceId);
        if (!transaction) return null;
        context = {
          href: `/admin/transactions/${transaction.id}`,
          actionLabel: "Review Payment",
          resourceLabel: transaction.productName,
          reference: transaction.reference,
          statusLabel:
            transaction.payment?.channelBadge ?? titleCase(transaction.status),
          customer: transaction.customer.id
            ? { id: transaction.customer.id, name: transaction.customer.name }
            : null,
          amount: transaction.amount,
          expiresAt: null,
          pendingCount: null,
        };
      } else if (notification.relatedResourceType === "printedOrder") {
        const order = printedOrders.get(notification.relatedResourceId);
        if (!order) return null;
        context = {
          href: `/admin/printed-orders/${order.id}`,
          actionLabel: "View Order",
          resourceLabel: order.productName,
          reference: order.reference,
          statusLabel: titleCase(order.orderStatus),
          customer: order.customer.id
            ? { id: order.customer.id, name: order.customer.name }
            : null,
          amount: order.amount,
          expiresAt: null,
          pendingCount: null,
        };
      } else if (notification.relatedResourceType === "invitation") {
        const invitation = invitations.get(notification.relatedResourceId);
        if (!invitation) return null;
        const detail =
          notification.kind === "wishesPending"
            ? await getAdminInvitationDetail(invitation.id)
            : null;
        context = {
          href:
            notification.kind === "wishesPending"
              ? `/admin/invitations/${invitation.id}/wishes`
              : `/admin/invitations/${invitation.id}`,
          actionLabel:
            notification.kind === "wishesPending"
              ? "Review Wishes"
              : "View Invitation",
          resourceLabel: invitation.coupleLabel,
          reference: invitation.slug,
          statusLabel: titleCase(invitation.status),
          customer: {
            id: invitation.customer.id,
            name: invitation.customer.name,
          },
          amount: null,
          expiresAt: invitation.expiresAt,
          pendingCount: detail?.engagement.pendingWishes ?? null,
        };
      } else {
        const customer = customerMap.get(notification.relatedResourceId);
        if (!customer) return null;
        context = {
          href: `/admin/customers/${customer.id}`,
          actionLabel: "View Customer",
          resourceLabel: customer.name,
          reference: null,
          statusLabel:
            customer.accountType === "managed"
              ? "Managed Customer"
              : "Registered Account",
          customer: { id: customer.id, name: customer.name },
          amount: null,
          expiresAt: null,
          pendingCount: null,
        };
      }

      return { ...notification, context };
    }),
  );

  return resolved
    .filter((item): item is AdminNotificationWithContext => item !== null)
    .sort(
      (left, right) =>
        new Date(right.occurredAt).getTime() -
        new Date(left.occurredAt).getTime(),
    );
}

export async function getUnreadAdminNotificationCount(): Promise<number> {
  const notifications = await getAdminNotifications();
  return notifications.filter((item) => item.readAt === null).length;
}
