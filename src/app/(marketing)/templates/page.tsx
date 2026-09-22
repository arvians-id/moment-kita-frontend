import { TemplatesPage } from "@/components/marketing/pages/templates-page";
import { getTemplates } from "@/services/public/template-service";

export const metadata = {
  title: "Invitation Templates",
  description: "Explore Moment Kita digital wedding invitation templates.",
};

export default async function Page() {
  const templates = await getTemplates();
  return <TemplatesPage templates={templates} />;
}
