import {
  mockPrintedCollections,
  mockPrintedProducts,
} from "@/data/mocks/printed-products";
import type { PrintedCollection, PrintedProduct } from "@/types";

export async function getPrintedProducts(): Promise<PrintedProduct[]> {
  return mockPrintedProducts.map((item) => ({ ...item }));
}

export async function getPrintedCollections(): Promise<PrintedCollection[]> {
  return mockPrintedCollections.map((item) => ({ ...item }));
}
