import { Check } from "lucide-react";
import Link from "next/link";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";
import type { Package } from "@/types";
import { idrFormat as currency } from "@/lib/format";

const tierLabels: Record<string, string> = {
  essential: "Atur mandiri",
  signature: "Pengalaman lengkap",
  prestige: "Didampingi tim",
};

export function PricingSection({ packages }: { packages: Package[] }) {
  return (
    <section className="py-20 lg:py-28" id="pricing-preview">
      <Container>
        <EditorialHeading
          kicker="05 — Harga yang jelas"
          title="Paket Sederhana untuk Perayaan Modern"
          description="Pilihan paket sekali bayar untuk undangan digital, dengan penawaran khusus untuk stationery cetak."
          align="center"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.id}
              className={`relative flex flex-col justify-between bg-surface-lowest p-7 shadow-sm sm:p-8 ${
                item.featured ? "ring-1 ring-secondary/25 shadow-md" : ""
              }`}
            >
              {item.featured ? (
                <span className="absolute right-4 top-4 bg-secondary px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase">
                  Paling diminati
                </span>
              ) : null}
              <div>
                <p className="text-[9px] font-semibold tracking-[0.17em] text-secondary uppercase">
                  {tierLabels[item.id] ?? "Undangan digital"}
                </p>
                <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
                <p className="mt-3 min-h-12 text-xs leading-5 text-on-surface-variant">
                  {item.description}
                </p>
                <p className="my-7">
                  <span className="font-serif text-4xl">
                    {currency.format(item.price)}
                  </span>
                  <span className="ml-1 text-[10px] text-on-surface-variant">
                    sekali bayar
                  </span>
                </p>
                <ul className="space-y-3 text-xs leading-5">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        size={14}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={item.id === "prestige" ? "/contact" : "/templates"}
                className={`mt-9 flex min-h-11 items-center justify-center px-5 text-[9px] font-semibold tracking-[0.13em] uppercase transition-colors ${
                  item.featured
                    ? "bg-primary text-primary-foreground hover:bg-secondary"
                    : "bg-surface-container hover:bg-surface-highest"
                }`}
              >
                {item.id === "prestige"
                  ? "Jadwalkan konsultasi"
                  : `Pilih ${item.name}`}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
