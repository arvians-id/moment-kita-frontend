import type { Metadata } from "next";

import { PrintedOrderListView } from "@/components/admin/printed-orders/printed-order-list-view";
import { getAdminPrintedOrderList } from "@/services/admin/printed-order-service";

export const metadata: Metadata = {
  title: "Printed Orders",
  description:
    "Manage manual printed invitation orders, payment state, and fulfillment context.",
};

export default async function AdminPrintedOrdersPage() {
  const data = await getAdminPrintedOrderList();

  return <PrintedOrderListView data={data} />;
}
