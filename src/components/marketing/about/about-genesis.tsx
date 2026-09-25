import Image from "next/image";

import { Container } from "@/components/shared/container";

const mosaic = [
  {
    caption: "Rangkaian Cetak Bertekstur",
    src: "/images/marketing/garden-stationery-suite.png",
    alt: "Rangkaian undangan kertas katun tepi deckle dengan pita sutra dan segel lilin",
    offset: false,
  },
  {
    caption: "Pasangan Digital",
    src: "/images/marketing/digital-invitation-phone.png",
    alt: "Undangan pernikahan digital di ponsel yang diletakkan di atas linen",
    offset: true,
  },
] as const;

const measures = [
  { value: "600–900", unit: "gsm", label: "Katun Murni Pilihan" },
  { value: "< 1,2", unit: "dtk", label: "Waktu Muat Cepat" },
] as const;

export function AboutGenesis() {
  return (
    <section className="w-full bg-surface-lowest py-12 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Awal Perjalanan
            </span>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Menyatukan kehangatan kertas dan kemudahan digital.
            </h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">
              Selama bertahun-tahun, pasangan harus memilih antara kehangatan
              undangan kertas dan kemudahan teknologi. Undangan digital sering
              terasa seragam, sementara letterpress personal memerlukan waktu
              panjang dan pengelolaan tamu yang terpisah.
            </p>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">
              Moment Kita hadir untuk membawa keindahan, kebebasan memilih gaya,
              dan kemudahan ke dalam kedua medium tersebut. Pengalaman digital
              dan stationery cetak kami dirancang dalam satu bahasa visual yang
              selaras.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {measures.map(({ value, unit, label }, index) => (
                <div key={label} className="flex items-center gap-4">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="h-10 w-px bg-surface-highest"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <span className="font-serif text-[22px] leading-[30px] font-semibold">
                      {value}
                      <span className="text-base text-secondary">{unit}</span>
                    </span>
                    <span className="text-[13px] leading-5 text-on-surface-variant">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row lg:col-span-7">
            {mosaic.map(({ caption, src, alt, offset }) => (
              <figure
                key={caption}
                className={`group relative w-full overflow-hidden bg-surface-low shadow-xl sm:w-1/2 ${offset ? "sm:-mt-12" : ""}`}
              >
                <div className="relative h-[320px] w-full sm:h-[420px]">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] text-white uppercase">
                    {caption}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
