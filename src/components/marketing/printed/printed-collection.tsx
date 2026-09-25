import { BookOpenText } from "lucide-react";

import { PrintedCollectionFilter } from "@/components/marketing/printed/printed-collection-filter";
import { Container } from "@/components/shared/container";
import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";
import type { PrintedCollection, PrintedProduct } from "@/types";

export function PrintedCollectionSection({
  collections,
  products,
}: {
  collections: PrintedCollection[];
  products: PrintedProduct[];
}) {
  return (
    <section
      id="collection"
      className="w-full scroll-mt-20 bg-surface-low py-12"
    >
      <Container>
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Koleksi Fine Print
            </p>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Pilihan Gaya yang Dikurasi
            </h2>
          </div>
          <p className="max-w-md text-[13px] leading-5 text-on-surface-variant">
            Setiap edisi dapat disesuaikan dengan kisah pernikahan, suasana
            lokasi, dan monogram personal Anda.
          </p>
        </div>

        <PrintedCollectionFilter
          collections={collections}
          products={products}
        />

        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-[8px] bg-surface-container p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <BookOpenText
              aria-hidden
              size={24}
              className="shrink-0 text-secondary"
            />
            <div>
              <h3 className="font-serif text-lg leading-7">
                Ingin merasakan tekstur kertasnya secara langsung?
              </h3>
              <p className="text-[13px] leading-5 text-on-surface-variant">
                Pesan Swatch Kit berisi enam pilihan ketebalan kertas, warna
                foil, dan contoh segel lilin.
              </p>
            </div>
          </div>
          <a
            href={whatsappHref(
              "Halo Moment Kita, saya ingin memesan Swatch Kit.",
            )}
            {...externalLinkProps}
            className="rounded-full bg-primary px-6 py-3 text-[12px] leading-4 font-semibold tracking-[0.12em] whitespace-nowrap text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Pesan Swatch Kit (Rp250.000)
          </a>
        </div>
      </Container>
    </section>
  );
}
