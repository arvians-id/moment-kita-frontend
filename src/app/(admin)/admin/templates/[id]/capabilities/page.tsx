import { notFound } from "next/navigation";

import { TemplateCapabilitiesSection } from "@/components/admin/templates/template-detail-sections";
import { getAdminTemplateDetail } from "@/services/admin/template-service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getAdminTemplateDetail(id);
  if (!detail) notFound();

  return <TemplateCapabilitiesSection data={detail} />;
}
