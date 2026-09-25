import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";
import type { PrintedProduct } from "@/types";
import { idrFormat as currency } from "@/lib/format";

export function PrintedProductCard({ product }: { product: PrintedProduct }) {
  return (
    <article className="group flex flex-col rounded-[8px] bg-surface-lowest p-4 shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative mb-2 aspect-[4/5] overflow-hidden rounded-[4px] bg-surface-container">
        <Image
          src={product.imageUrl}
          alt={`Rangkaian undangan cetak ${product.name}`}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-[4px] bg-primary/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-primary-foreground uppercase backdrop-blur-sm">
          {product.badge}
        </span>
      </div>
      <span className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
        {product.edition}
      </span>
      <h3 className="mb-2 font-serif text-[22px] leading-[30px] font-semibold">
        {product.name}
      </h3>
      <p className="mb-2 line-clamp-2 text-[13px] leading-5 text-on-surface-variant">
        {product.materials}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <p>
          <span className="block text-[10px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
            Mulai
          </span>
          <span className="font-serif text-xl">
            {currency.format(product.startingPrice)}{" "}
            <span className="text-[13px] leading-5 font-sans text-on-surface-variant">
              / set
            </span>
          </span>
        </p>
        <a
          href={whatsappHref(`Inquiry regarding ${product.name}`)}
          {...externalLinkProps}
          className="inline-flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary"
        >
          <span>Tanyakan</span>
          <ArrowUpRight aria-hidden size={14} />
        </a>
      </div>
    </article>
  );
}
