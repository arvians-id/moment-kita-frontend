import { DigitalPage } from "@/components/marketing/pages/digital-page";
import { getPackages } from "@/services/public/package-service";
import { getTemplates } from "@/services/public/template-service";

export const metadata = {
  title: "Undangan Digital",
  description:
    "Undangan pernikahan digital interaktif yang mudah dibagikan, personal, dan nyaman untuk setiap tamu.",
};

export default async function Page() {
  const [templates, packages] = await Promise.all([
    getTemplates(),
    getPackages(),
  ]);
  return <DigitalPage templates={templates} packages={packages} />;
}
