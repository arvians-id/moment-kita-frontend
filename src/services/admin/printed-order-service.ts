import { mockPrintedOrderOperations } from "@/data/mocks/admin-printed-orders";
import { mockAdminCustomers } from "@/data/mocks/admin-customers";
import { mockPrintedProducts } from "@/data/mocks/printed-products";
import { getAdminTransactionList } from "@/services/admin/transaction-service";
import type {
  AdminPrintedOrderActivity,
  AdminPrintedOrderDetailData,
  AdminPrintedOrderItem,
  AdminPrintedOrderListData,
  AdminPrintedOrderSummary,
} from "@/types";

export function summarizePrintedOrders(
  orders: AdminPrintedOrderItem[],
): AdminPrintedOrderSummary {
  return {
    totalOrders: orders.length,
    newOrders: orders.filter((order) =>
      ["new", "confirmed"].includes(order.orderStatus),
    ).length,
    inProduction: orders.filter(
      (order) => order.orderStatus === "in_production",
    ).length,
    readyOrShipped: orders.filter((order) =>
      ["ready", "shipped"].includes(order.orderStatus),
    ).length,
    completed: orders.filter((order) => order.orderStatus === "completed")
      .length,
    paidRevenue: orders
      .filter((order) => order.status === "paid")
      .reduce((sum, order) => sum + order.amount, 0),
  };
}

export async function getAdminPrintedOrderList(): Promise<AdminPrintedOrderListData> {
  const { transactions } = await getAdminTransactionList();
  const operationsByTransactionId = new Map(
    mockPrintedOrderOperations.map((fixture) => [
      fixture.transactionId,
      fixture,
    ]),
  );

  const orders: AdminPrintedOrderItem[] = transactions
    .filter((transaction) => transaction.purpose === "printed")
    .flatMap((transaction) => {
      const operations = operationsByTransactionId.get(transaction.id);
      if (!operations) return [];

      return [
        {
          ...transaction,
          purpose: "printed" as const,
          productId: operations.productId,
          designVariant: operations.designVariant,
          quantity: operations.quantity,
          unitPrice: Math.round(transaction.amount / operations.quantity),
          orderStatus: operations.orderStatus,
          fulfillment: { ...operations.fulfillment },
          internalNote: operations.internalNote,
          customerNote: operations.customerNote,
          productionStartedAt: operations.productionStartedAt,
          estimatedCompletionAt: operations.estimatedCompletionAt,
          shippedAt: operations.shippedAt,
          deliveredAt: operations.deliveredAt,
        },
      ];
    });

  return {
    orders,
    summary: summarizePrintedOrders(orders),
    products: mockPrintedProducts.map((product) => ({ ...product })),
    customers: mockAdminCustomers.map((customer) => ({ ...customer })),
  };
}

export async function getAdminPrintedOrderIds(): Promise<string[]> {
  const { orders } = await getAdminPrintedOrderList();
  return orders.map((order) => order.id);
}

function buildOrderActivity(
  order: AdminPrintedOrderItem,
): AdminPrintedOrderActivity[] {
  const activity: AdminPrintedOrderActivity[] = [
    {
      id: `${order.id}_created`,
      kind: "order",
      title: "Printed order created",
      description: `${order.quantity} sets of ${order.productName} were recorded manually.`,
      createdAt: order.createdAt,
      actor: "Atelier Admin",
    },
  ];

  if (order.status === "paid" && order.paidAt) {
    activity.push({
      id: `${order.id}_paid`,
      kind: "payment",
      title: "Payment confirmed",
      description:
        "The related transaction was confirmed as paid. Order and payment status remain separate.",
      createdAt: order.paidAt,
      actor: "Commerce Admin",
    });
  }

  if (order.productionStartedAt) {
    activity.push({
      id: `${order.id}_production`,
      kind: "production",
      title: "Production started",
      description: order.designVariant,
      createdAt: order.productionStartedAt,
      actor: "Atelier Team",
    });
  }

  if (order.shippedAt) {
    activity.push({
      id: `${order.id}_shipped`,
      kind: "fulfillment",
      title: "Order shipped",
      description: order.fulfillment.trackingNumber
        ? `Tracking reference ${order.fulfillment.trackingNumber}.`
        : "Manual delivery was dispatched.",
      createdAt: order.shippedAt,
      actor: "Atelier Dispatch",
    });
  }

  if (order.deliveredAt) {
    activity.push({
      id: `${order.id}_delivered`,
      kind: "fulfillment",
      title: "Order completed",
      description: "The printed commission was marked delivered and complete.",
      createdAt: order.deliveredAt,
      actor: "Atelier Admin",
    });
  }

  if (order.orderStatus === "cancelled") {
    activity.push({
      id: `${order.id}_cancelled`,
      kind: "order",
      title: "Order cancelled",
      description:
        order.internalNote ??
        "The operational order was cancelled. No payment refund was implied.",
      createdAt: order.createdAt,
      actor: "Atelier Admin",
    });
  }

  return activity.sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export async function getAdminPrintedOrderDetail(
  id: string,
): Promise<AdminPrintedOrderDetailData | null> {
  const { orders, customers, products } = await getAdminPrintedOrderList();
  const order = orders.find((item) => item.id === id);
  if (!order) return null;

  return {
    order,
    customerProfile:
      customers.find((customer) => customer.id === order.customer.id) ?? null,
    product: products.find((product) => product.id === order.productId) ?? null,
    activity: buildOrderActivity(order),
  };
}
