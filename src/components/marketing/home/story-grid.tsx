import { Heart } from "lucide-react";
import Image from "next/image";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const stories = [
  {
    couple: "Alya & Raka",
    place: "Ubud, Bali",
    suite: "Undangan Digital & Cetak",
    image: "/images/marketing/sunlit-stationery-table.png",
    quote:
      "Undangan digital memudahkan setiap detail untuk tamu, sementara keluarga terdekat menerima undangan cetak yang akan kami simpan bertahun-tahun.",
  },
  {
    couple: "Nadia & Bima",
    place: "Bandung, Jawa Barat",
    suite: "Stationery Cetak",
    image: "/images/marketing/garden-stationery-suite.png",
    quote:
      "Kertas, tipografi, dan finishing hangatnya terasa sangat personal—seperti membuka benda berharga, bukan sekadar menerima pengumuman.",
  },
  {
    couple: "Maya & Devon",
    place: "Jakarta",
    suite: "Undangan Digital Interaktif",
    image: "/images/marketing/hero-stationery-suite.png",
    quote:
      "Satu tautan yang tertata membuat informasi perayaan kami jelas bagi semua orang, tanpa mengurangi suasana yang kami inginkan.",
  },
] as const;

export function StoryGrid() {
  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <EditorialHeading
            kicker="03 — Kisah pilihan"
            title="Pasangan Moment Kita"
          />
          <p className="text-xs text-on-surface-variant">
            Kisah yang hadir di kertas, layar, dan setiap tempat
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.couple}
              className="flex flex-col overflow-hidden bg-surface-lowest shadow-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={story.image}
                  alt={`Stationery pernikahan untuk ${story.couple}.`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 text-[9px] font-semibold tracking-[0.13em] uppercase backdrop-blur">
                  {story.place}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                <blockquote className="font-serif text-xl leading-8 italic">
                  “{story.quote}”
                </blockquote>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-5 text-xs">
                  <div>
                    <p className="font-semibold">{story.couple}</p>
                    <p className="mt-1 text-[10px] text-on-surface-variant">
                      {story.suite}
                    </p>
                  </div>
                  <Heart
                    aria-hidden="true"
                    size={17}
                    className="text-secondary"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
