import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { TemplateDetailShell } from "@/components/admin/templates/template-detail-shell";
import {
  getAdminTemplateDetail,
  getAdminTemplateKeys,
} from "@/services/admin/template-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const keys = await getAdminTemplateKeys();
  return keys.map((id) => ({ id }));
}

export default async function AdminTemplateDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getAdminTemplateDetail(id);
  if (!detail) notFound();

  return (
    <TemplateDetailShell template={detail.template}>
      {children}
    </TemplateDetailShell>
  );
}
