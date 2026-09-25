import { PrintedPage } from "@/components/marketing/pages/printed-page";
import {
  getPrintedCollections,
  getPrintedProducts,
} from "@/services/public/printed-service";

export const metadata = {
  title: "Undangan Cetak & Fine Stationery",
  description:
    "Undangan pernikahan letterpress di atas kertas katun pilihan dengan finishing khusus dan konsultasi langsung bersama Moment Kita.",
};

export default async function Page() {
  const [collections, products] = await Promise.all([
    getPrintedCollections(),
    getPrintedProducts(),
  ]);

  return <PrintedPage collections={collections} products={products} />;
}
