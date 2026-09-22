import { TemplatesPage } from "@/components/marketing/pages/templates-page";
import { getTemplateCatalog } from "@/services/public/template-service";

export const metadata = {
  title: "Invitation Templates",
  description:
    "Browse the Moment Kita archive of curated digital invitation suites and artisan printed stationery editions.",
};

export default async function Page() {
  const catalog = await getTemplateCatalog();
  return <TemplatesPage catalog={catalog} />;
}
