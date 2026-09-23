import type { ReactNode } from "react";

import { getAdminCustomers } from "@/services/admin/customer-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const customers = await getAdminCustomers();
  return customers.map((customer) => ({ id: customer.id }));
}

export default function AdminCustomerDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
