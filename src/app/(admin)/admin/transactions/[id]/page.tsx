import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TransactionDetailView } from "@/components/admin/transactions/transaction-detail-view";
import {
  getAdminTransactionDetail,
  getAdminTransactionIds,
} from "@/services/admin/transaction-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAdminTransactionIds();
  return ids.map((id) => ({ id }));
}

interface AdminTransactionDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AdminTransactionDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getAdminTransactionDetail(id);

  return {
    title: detail ? detail.transaction.reference : "Transaction",
    description: detail
      ? `Admin transaction dossier for ${detail.transaction.reference}.`
      : "Admin transaction dossier.",
  };
}

export default async function AdminTransactionDetailPage({
  params,
}: AdminTransactionDetailPageProps) {
  const { id } = await params;
  const detail = await getAdminTransactionDetail(id);
  if (!detail) notFound();

  return <TransactionDetailView data={detail} />;
}
