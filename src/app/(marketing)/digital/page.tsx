import { DigitalPage } from "@/components/marketing/pages/digital-page";
import { getPackages } from "@/services/public/package-service";
import { getTemplates } from "@/services/public/template-service";

export const metadata = { title: "Digital Invitations" };

export default async function Page() {
  const [templates, packages] = await Promise.all([
    getTemplates(),
    getPackages(),
  ]);
  return <DigitalPage templates={templates} packages={packages} />;
}
