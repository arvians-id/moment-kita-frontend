"use client";

import { useState } from "react";

import { PrintedProductCard } from "@/components/marketing/printed/printed-product-card";
import type { PrintedCollection, PrintedProduct } from "@/types";

export function PrintedCollectionFilter({
  collections,
  products,
}: {
  collections: PrintedCollection[];
  products: PrintedProduct[];
}) {
  const [active, setActive] = useState<PrintedCollection["id"]>("all");
  const visible =
    active === "all"
      ? products
      : products.filter((product) => product.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter edisi cetak berdasarkan gaya"
        className="flex items-center gap-2 overflow-x-auto pb-4"
      >
        {collections.map((collection) => {
          const isActive = collection.id === active;
          return (
            <button
              key={collection.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(collection.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap uppercase shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-lowest text-on-surface-variant hover:text-primary"
              }`}
            >
              {collection.label}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {visible.map((product) => (
            <PrintedProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-7 rounded-[8px] bg-surface-lowest p-8 text-center text-[15px] leading-6 text-on-surface-variant shadow-sm">
          Edisi ini dibuat sepenuhnya dari awal. Mulai konsultasi WhatsApp dan
          kami akan menyesuaikannya dengan perayaan Anda.
        </p>
      )}
    </div>
  );
}
