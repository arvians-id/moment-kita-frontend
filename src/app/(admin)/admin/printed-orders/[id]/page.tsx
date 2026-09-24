import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrintedOrderDetailView } from "@/components/admin/printed-order-detail/printed-order-detail-view";
import {
  getAdminPrintedOrderDetail,
  getAdminPrintedOrderIds,
} from "@/services/admin/printed-order-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAdminPrintedOrderIds();
  return ids.map((id) => ({ id }));
}

interface AdminPrintedOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AdminPrintedOrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getAdminPrintedOrderDetail(id);
  return {
    title: detail ? detail.order.reference : "Printed Order",
    description: detail
      ? `Operational printed order dossier for ${detail.order.reference}.`
      : "Printed order dossier.",
  };
}

export default async function AdminPrintedOrderDetailPage({
  params,
}: AdminPrintedOrderDetailPageProps) {
  const { id } = await params;
  const detail = await getAdminPrintedOrderDetail(id);
  if (!detail) notFound();

  return <PrintedOrderDetailView initialData={detail} />;
}
