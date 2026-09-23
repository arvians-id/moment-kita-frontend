import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CustomerDetailView } from "@/components/admin/customer-detail/customer-detail-view";
import { getAdminCustomerDetail } from "@/services/admin/customer-service";

interface AdminCustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AdminCustomerDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getAdminCustomerDetail(id);

  return {
    title: detail ? detail.customer.name : "Customer",
    description: detail
      ? `Admin customer dossier for ${detail.customer.name}.`
      : "Admin customer dossier.",
  };
}

export default async function AdminCustomerDetailPage({
  params,
}: AdminCustomerDetailPageProps) {
  const { id } = await params;
  const detail = await getAdminCustomerDetail(id);

  if (!detail) notFound();

  return <CustomerDetailView initialData={detail} />;
}
