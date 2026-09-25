import { Flame, Layers, Mail, ScrollText, Stamp, Waves } from "lucide-react";

import { Container } from "@/components/shared/container";

const crafts = [
  {
    icon: Layers,
    kicker: "01 · Kertas",
    title: "Kertas Katun Berkualitas",
    text: "Kertas buatan tangan dari katun murni 600gsm hingga 900gsm, dengan tepi deckle alami yang disobek satu per satu. Bebas asam dan dibuat untuk bertahan lama.",
    spec: "Ketebalan: 600–900 GSM · 100% Katun",
  },
  {
    icon: Flame,
    kicker: "02 · Kilau",
    title: "Hot Foil Stamping",
    text: "Cetakan magnesium khusus dipanaskan untuk menekan foil metalik ke dalam serat kertas. Tersedia dalam warna antique copper, rose bronze, champagne, dan emas satin matte.",
    spec: "Panas: 130°C · Foil Presisi",
  },
  {
    icon: Waves,
    kicker: "03 · Relief",
    title: "Blind Deboss",
    text: "Cetakan bertingkat membentuk monogram personal pada kertas katun tebal tanpa tinta. Bayangan alami dan sentuhan menampilkan detailnya dengan lembut.",
    spec: "Kedalaman: 0,8mm · Relief Bertekstur",
  },
  {
    icon: Stamp,
    kicker: "04 · Cetak",
    title: "Letterpress Klasik",
    text: 'Setiap lembar dimasukkan dengan tangan ke mesin Heidelberg "Windmill" Platen era 1950-an. Tekanannya meninggalkan jejak tajam dan dalam pada serat katun lembut.',
    spec: "Mesin: Heidelberg Tiegel 1954 · Tinta Manual",
  },
  {
    icon: Mail,
    kicker: "05 · Amplop",
    title: "Amplop & Lapisan Vellum",
    text: "Amplop Euro-flap berbahan tebal dibuat dengan tangan dan dipadukan dengan ilustrasi vellum transparan, sketsa lokasi, atau detail botani pilihan.",
    spec: "Amplop: Katun 300gsm · Vellum Prancis",
  },
  {
    icon: ScrollText,
    kicker: "06 · Hiasan",
    title: "Segel Lilin & Pita Sutra",
    text: "Lilin alami dengan pigmen mineral dituangkan dan dicap menggunakan monogram Anda, lalu dipadukan dengan pita sutra Habotai yang diwarnai dari bahan nabati.",
    spec: "Segel: Lilin Alami · 100% Sutra Prancis",
  },
] as const;

export function MaterialExperience() {
  return (
    <section className="w-full bg-surface py-12 lg:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Material Pilihan
          </p>
          <h2 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
            Detail yang Terasa Istimewa
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-on-surface-variant">
            Berbeda dari cetak massal, setiap undangan dibuat untuk dinikmati
            lewat sentuhan. Ketebalan, relief, dan pantulan cahaya
            dipertimbangkan hingga detail terkecil.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {crafts.map(({ icon: Icon, kicker, title, text, spec }) => (
            <article
              key={kicker}
              className="flex flex-col rounded-[8px] bg-surface-lowest p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-4 grid size-12 place-items-center rounded-full bg-surface-low text-secondary">
                <Icon aria-hidden size={24} />
              </span>
              <span className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                {kicker}
              </span>
              <h3 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
                {title}
              </h3>
              <p className="mb-4 text-[15px] leading-relaxed text-on-surface-variant">
                {text}
              </p>
              <p className="mt-auto pt-3 text-[12px] font-semibold tracking-[0.12em] text-on-surface-variant/80 uppercase">
                {spec}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
