import { PrintedPage } from "@/components/marketing/pages/printed-page";
import {
  getPrintedCollections,
  getPrintedProducts,
} from "@/services/public/printed-service";

export const metadata = {
  title: "Printed & Fine Stationery",
  description:
    "Heirloom letterpress wedding invitations, archival cotton papers, and bespoke finishing—commissioned through a direct studio consultation.",
};

export default async function Page() {
  const [collections, products] = await Promise.all([
    getPrintedCollections(),
    getPrintedProducts(),
  ]);

  return <PrintedPage collections={collections} products={products} />;
}
