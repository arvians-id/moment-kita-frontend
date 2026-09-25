import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ImageIcon,
  Link2,
  LockKeyhole,
  MailCheck,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: BookOpen,
    title: "Pilih Template",
    text: "Mulai dari desain editorial dengan ruang lapang, tipografi serif yang elegan, dan tampilan seluler yang nyaman.",
    label: "Jelajahi Koleksi",
    href: "/templates",
  },
  {
    icon: CalendarDays,
    title: "Susun Detail Acara",
    text: "Tambahkan jadwal akad dan resepsi, panduan busana, akomodasi, serta informasi penting untuk tamu.",
    label: "Rencanakan Isinya",
    href: "/how-it-works",
  },
  {
    icon: ImageIcon,
    title: "Rangkai Kenangan",
    text: "Bangun cerita visual melalui galeri dan bab perjalanan yang personal tanpa membuat undangan terasa penuh.",
    label: "Bab Visual",
    href: "/features",
  },
  {
    icon: Link2,
    title: "Tentukan Tautan Undangan",
    text: "Pilih alamat undangan Moment Kita yang mudah diingat dan tetap sama sepanjang masa aktif undangan.",
    label: "Alamat Undangan",
    href: "/features",
  },
  {
    icon: LockKeyhole,
    title: "Tinjau & Publikasikan",
    text: "Periksa pengalaman tamu secara menyeluruh, pastikan setiap detail siap, lalu publikasikan dengan tenang.",
    label: "Kontrol Privasi",
    href: "/how-it-works",
  },
  {
    icon: MailCheck,
    title: "Kelola Informasi Tamu",
    text: "Kelola kehadiran, catatan makanan, ucapan, dan detail yang dibutuhkan tim perencana dalam satu alur.",
    label: "Kelola Tamu",
    href: "/features",
  },
] as const;

export function DigitalArchitecture() {
  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
              02 — Alur yang Sederhana
            </p>
            <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
              Mudah sejak awal{" "}
              <em className="font-normal">hingga hari perayaan.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Enam tahap yang tertata untuk menyederhanakan kebutuhan tamu tanpa
            mengurangi keindahan undangan Anda.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, text, label, href }, index) => (
            <article
              key={title}
              className="flex min-h-[280px] flex-col justify-between bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
                    Langkah {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon aria-hidden size={21} />
                </div>
                <h3 className="mt-4 font-serif text-[22px] font-semibold leading-7">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-5 text-on-surface-variant">
                  {text}
                </p>
              </div>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase transition-colors hover:text-secondary"
              >
                {label} <ArrowRight aria-hidden size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
