import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TemplateOverviewSection } from "@/components/admin/templates/template-detail-sections";
import { getAdminTemplateDetail } from "@/services/admin/template-service";

interface AdminTemplateDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AdminTemplateDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getAdminTemplateDetail(id);

  return {
    title: detail ? detail.template.name : "Template",
    description: detail
      ? `Admin template dossier for ${detail.template.name}.`
      : "Admin template dossier.",
  };
}

export default async function AdminTemplateDetailPage({
  params,
}: AdminTemplateDetailPageProps) {
  const { id } = await params;
  const detail = await getAdminTemplateDetail(id);
  if (!detail) notFound();

  return <TemplateOverviewSection data={detail} />;
}
