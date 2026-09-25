import { Container } from "@/components/shared/container";

const credentials = [
  "Undangan Digital & Fine Print",
  "Material Pilihan Tanpa Kompromi",
  "Pengalaman Digital yang Responsif",
] as const;

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-8">
            <div className="flex items-center gap-2">
              <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                07 — Tentang &amp; Niat Kami
              </span>
              <span className="h-px w-8 bg-border" />
            </div>
            <h1 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
              Setiap perayaan layak memiliki kisah yang{" "}
              <em className="font-normal text-secondary">
                diceritakan dengan indah.
              </em>
            </h1>
            <p className="max-w-3xl pt-1 text-[18px] leading-relaxed tracking-[-0.01em] text-on-surface-variant">
              Moment Kita lahir dari keyakinan bahwa undangan pernikahan bukan
              sekadar pengumuman, melainkan gambaran pertama tentang perjalanan
              dua insan. Kami memadukan kemudahan digital dan kehangatan
              letterpress dalam karya yang personal, modern, dan anggun.
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant/80 uppercase">
              {credentials.map((credential, index) => (
                <li key={credential} className="flex items-center gap-x-4">
                  {index > 0 ? <span aria-hidden>&bull;</span> : null}
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden pt-8 lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-center">
            <figure className="max-w-xs bg-surface-low p-7 text-right shadow-sm">
              <figcaption className="mb-1 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                Catatan Moment Kita
              </figcaption>
              <blockquote className="font-serif text-2xl leading-snug italic">
                &ldquo;Hangat saat disentuh, ringan saat dibagikan.&rdquo;
              </blockquote>
              <span className="mt-2 block text-[13px] leading-5 text-on-surface-variant">
                &mdash; Catatan Moment Kita No. 04
              </span>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
