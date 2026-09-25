import { TemplatesPage } from "@/components/marketing/pages/templates-page";
import { getTemplateCatalog } from "@/services/public/template-service";

export const metadata = {
  title: "Template Undangan",
  description:
    "Jelajahi koleksi template undangan digital dan stationery cetak pilihan dari Moment Kita.",
};

export default async function Page() {
  const catalog = await getTemplateCatalog();
  return <TemplatesPage catalog={catalog} />;
}
