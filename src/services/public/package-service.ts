import { mockPackages } from "@/data/mocks/packages";
import type { Package } from "@/types";

export async function getPackages(): Promise<Package[]> {
  return mockPackages.map((item) => ({
    ...item,
    features: [...item.features],
  }));
}
