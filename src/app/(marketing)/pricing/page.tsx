import { PricingPage } from "@/components/marketing/pages/pricing-page";
import { getPackages } from "@/services/public/package-service";
import { getPrintedProducts } from "@/services/public/printed-service";

export const metadata = {
  title: "Pricing",
  description:
    "Compare Moment Kita digital invitation packages and explore consultation-led printed stationery pricing.",
};

export default async function Page() {
  const [packages, products] = await Promise.all([
    getPackages(),
    getPrintedProducts(),
  ]);

  return <PricingPage packages={packages} products={products} />;
}
