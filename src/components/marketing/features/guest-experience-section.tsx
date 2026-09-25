import {
  Heart,
  Map,
  Music2,
  Navigation,
  RadioTower,
  UserRound,
  Video,
} from "lucide-react";
import Link from "next/link";

const guestFeatures = [
  {
    icon: UserRound,
    title: "Sapaan Personal untuk Setiap Tamu",
    description:
      "Buat tautan tamu dengan sapaan khusus, jumlah rombongan, dan detail acara yang sesuai untuk setiap undangan.",
  },
  {
    icon: Music2,
    title: "Musik & Alur Cerita",
    description:
      "Lengkapi undangan dengan musik pilihan dan ajak tamu mengikuti kisah perayaan dalam beberapa bab.",
  },
  {
    icon: Map,
    title: "Jadwal Acara & Sinkronisasi Kalender",
    description:
      "Tampilkan setiap acara secara runtut, lengkap dengan pengingat kalender dan petunjuk arah saat dibutuhkan.",
  },
  {
    icon: RadioTower,
    title: "Live Streaming Acara",
    description:
      "Berikan akses privat bagi keluarga dan sahabat yang tidak dapat hadir untuk menyaksikan acara dari undangan yang sama.",
  },
] as const;

export function GuestExperienceSection() {
  return (
    <section
      id="guest-experience"
      className="scroll-mt-20 bg-surface-low py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mb-7 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            01 — Pengalaman Tamu
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] text-primary sm:text-[40px] sm:leading-[1.2]">
            Kisah perayaan yang tampil indah di setiap layar.
          </h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Sejak pertama dibuka, tamu menikmati pengalaman personal tanpa iklan
            yang terasa seistimewa perayaan Anda.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="relative flex items-center justify-center py-6 lg:col-span-6">
            <div className="absolute size-72 rounded-full bg-[#ffb59c]/35 blur-3xl" />
            <div className="relative z-10 w-full max-w-[340px] rounded-[40px] bg-primary p-3.5 text-on-surface shadow-xl">
              <div className="flex flex-col overflow-hidden rounded-[30px] bg-background p-6 text-center">
                <div className="mx-auto mb-6 h-3 w-20 rounded-full bg-on-surface/10" />
                <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-sm">
                  <span className="font-serif text-2xl italic">M</span>
                </div>
                <div className="mx-auto mb-3 inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
                  <Heart aria-hidden size={11} className="text-secondary" />
                  Untuk Sarah &amp; David
                </div>
                <h3 className="font-serif text-[28px] leading-none tracking-tight">
                  Melina
                  <br />
                  <em className="text-xl font-normal text-secondary">
                    &amp;
                  </em>{" "}
                  Dayson
                </h3>
                <span className="mt-3 text-[9px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
                  Villa Cimbrone • Ravello, Amalfi Coast
                </span>
                <div className="my-4 grid grid-cols-3 gap-1 rounded-lg bg-surface-high p-2.5">
                  {[
                    ["84", "Hari"],
                    ["14", "Jam"],
                    ["22", "Menit"],
                  ].map(([value, label]) => (
                    <div key={label} className="flex flex-col">
                      <span className="font-serif text-lg font-semibold">
                        {value}
                      </span>
                      <span className="text-[8px] font-semibold tracking-wider text-on-surface-variant uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-3 text-left shadow-sm">
                  <div className="flex min-w-0 items-center gap-2">
                    <Music2
                      aria-hidden
                      size={19}
                      className="shrink-0 text-secondary"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-semibold tracking-wider uppercase">
                        Debussy — Clair de Lune
                      </p>
                      <p className="text-[9px] text-on-surface-variant">
                        Acoustic Piano Nuance
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex h-4 items-center gap-1 text-secondary"
                    aria-hidden="true"
                  >
                    {[5, 13, 8, 16, 9, 12, 4, 10].map((height, index) => (
                      <span
                        key={index}
                        className="w-[3px] rounded-full bg-current"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>
                <Link
                  href="/register"
                  className="rounded-full bg-primary py-2.5 text-[10px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                >
                  Konfirmasi Kehadiran
                </Link>
              </div>
            </div>

            <div className="absolute top-1/4 left-0 z-20 hidden max-w-[210px] items-center gap-3 rounded-xl bg-white p-3 shadow-lg sm:flex">
              <Navigation
                aria-hidden
                size={23}
                className="shrink-0 text-secondary"
              />
              <div>
                <p className="text-[10px] font-semibold tracking-wider uppercase">
                  Navigasi Sekali Ketuk
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  Apple &amp; Google Maps
                </p>
              </div>
            </div>
            <div className="absolute right-0 bottom-1/4 z-20 hidden max-w-[220px] items-center gap-3 rounded-xl bg-white p-3 shadow-lg sm:flex">
              <Video
                aria-hidden
                size={23}
                className="shrink-0 text-secondary"
              />
              <div>
                <p className="text-[10px] font-semibold tracking-wider uppercase">
                  Live Stream Privat
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  Untuk tamu yang berada jauh
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6">
            {guestFeatures.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Icon aria-hidden size={19} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold leading-7">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
