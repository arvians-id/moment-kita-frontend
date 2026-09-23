import type { Metadata } from "next";

import { CustomerListView } from "@/components/admin/customers/customer-list-view";
import { getAdminCustomerList } from "@/services/admin/customer-service";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Manage registered accounts and studio-managed customer profiles.",
};

export default async function AdminCustomersPage() {
  const data = await getAdminCustomerList();

  return <CustomerListView data={data} />;
}
