import { PricingPage } from "@/components/marketing/pages/pricing-page";
import { getPackages } from "@/services/public/package-service";
import { getPrintedProducts } from "@/services/public/printed-service";

export const metadata = {
  title: "Harga",
  description:
    "Bandingkan paket undangan digital Moment Kita dan lihat kisaran harga stationery cetak dengan konsultasi personal.",
};

export default async function Page() {
  const [packages, products] = await Promise.all([
    getPackages(),
    getPrintedProducts(),
  ]);

  return <PricingPage packages={packages} products={products} />;
}
