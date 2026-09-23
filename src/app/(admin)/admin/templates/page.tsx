import type { Metadata } from "next";

import { TemplateListView } from "@/components/admin/templates/template-list-view";
import { getAdminTemplateList } from "@/services/admin/template-service";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Manage Moment Kita template availability, featured placement, and registry metadata.",
};

export default async function AdminTemplatesPage() {
  const data = await getAdminTemplateList();

  return <TemplateListView data={data} />;
}
