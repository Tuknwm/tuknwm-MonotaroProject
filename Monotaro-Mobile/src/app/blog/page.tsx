"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const POSTS: [string, string, string][] = [
  ["Teknik Menggunakan Pemecah Mur (Nut Breaker)", "Techniques for Using a Nut Breaker", "/TipsProduk/bn-artikel-torque-wrench-a.avif"],
  ["5 Jenis Tinta Pulpen yang Perlu Anda Ketahui", "5 Types of Pen Ink You Need to Know", "/TipsProduk/bn-artikel-cara-memilih-obeng.webp"],
  ["Cara Menggunakan Serut Kayu", "How to Use a Wood Plane", "/TipsProduk/bn-artikel-cara-memilih-obeng.webp"],
  ["8 Jenis Material Abrasif Mata Gerinda", "8 Types of Abrasive Materials for Grinding Discs", "/JelajahiKategori/Gerinda/Ampelas.avif"],
  ["Cara Memilih Material Pengisi Celah Lantai untuk Area Industri", "How to Choose Floor Joint Filler Material for Industrial Areas", "/TipsProduk/bn-artikel-kedap-suara.webp"],
  ["5 Jenis Material Pengisi Celah Lantai dan Kapan Menggunakannya", "5 Types of Floor Joint Filler Materials and When to Use Them", "/JelajahiKategori/AlatLaboratorium/AlatGelas.avif"],
];

const MEDIA: [string, string][] = [
  ["Mitsubishi Fuso 2021, Memperkuat Posisi Pemimpin Pasar", "Mitsubishi Fuso 2021, Strengthening Market Leader Position"],
  ["monotaro.id Catat Tren Peningkatan Adopsi B2B Commerce", "monotaro.id Records Increasing B2B Commerce Adoption Trend"],
  ["Monotaro.id Rilis Katalog ke-3", "Monotaro.id Releases 3rd Catalog"],
];

const EVENTS: [string, string][] = [
  ["Webinar Solusi Tempat Kerja Aman dari COVID-19", "Webinar: Safe Workplace Solutions from COVID-19"],
  ["Sistem pengadaan baru monotaro.id di Manufacturing Indonesia 2018", "monotaro.id New Procurement System at Manufacturing Indonesia 2018"],
];

const CATEGORIES: [string, string, number][] = [
  ["Artikel", "Articles", 422],
  ["Media", "Media", 3],
  ["Event", "Events", 2],
  ["Panduan Produk", "Product Guide", 70],
  ["Solusi Pengadaan", "Procurement Solutions", 27],
  ["Partner Kolaborasi", "Collaboration Partners", 3],
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b-2 border-neutral-800 pb-2 text-xs font-bold">
      <span className="bg-neutral-800 px-3 py-2 text-white">{children}</span>
    </h2>
  );
}

export default function BlogPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const en = language === "en";

  return (
    <main className="min-h-dvh bg-white pb-8">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold">Blog monotaro.id</h1>
      </header>

      <div className="px-4 py-5 pt-[76px]">
        <h1 className="mb-6 text-3xl font-light">Blog monotaro.id</h1>

        <Heading>{en ? "Latest Articles" : "Artikel Terbaru"}</Heading>
        <div className="grid grid-cols-1 gap-4">
          {POSTS.map(([titleId, titleEn, image]) => (
            <article key={titleId} className="flex gap-3 border-b border-neutral-100 pb-4">
              <img src={image} alt="" className="h-24 w-28 shrink-0 rounded object-cover" />
              <div>
                <h3 className="text-sm font-medium">{en ? titleEn : titleId}</h3>
                <p className="mt-1 text-[10px] text-neutral-500">Dian Anggraini · October 2026</p>
                <p className="mt-2 text-xs text-neutral-500">
                  {en ? "Practical information and complete guides to help your industrial needs." : "Informasi praktis dan panduan lengkap untuk membantu kebutuhan industri Anda."}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Heading>{en ? "Media monotaro.id" : "Media monotaro.id"}</Heading>
          <div className="grid grid-cols-1 gap-4">
            {MEDIA.map(([titleId, titleEn], i) => (
              <article key={titleId}>
                <img src={POSTS[i][2]} alt="" className="h-40 w-full rounded object-cover" />
                <h3 className="mt-2 text-sm font-medium">{en ? titleEn : titleId}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Heading>{en ? "Event monotaro.id" : "Event monotaro.id"}</Heading>
          <div className="grid grid-cols-1 gap-4">
            {EVENTS.map(([titleId, titleEn], i) => (
              <article key={titleId}>
                <img src={POSTS[i + 1][2]} alt="" className="h-40 w-full rounded object-cover" />
                <h3 className="mt-2 text-sm font-medium">{en ? titleEn : titleId}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Heading>{en ? "Recent Posts" : "Recent Posts"}</Heading>
          <div className="grid grid-cols-1 gap-3">
            {POSTS.slice(0, 5).map(([titleId, titleEn, image]) => (
              <div key={titleId} className="flex gap-3">
                <img src={image} alt="" className="h-14 w-16 rounded object-cover" />
                <p className="text-xs">
                  {en ? titleEn : titleId}<br />
                  <span className="text-[10px] text-neutral-500">November 02, 2026</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Heading>{en ? "Categories" : "Categories"}</Heading>
          <div className="grid grid-cols-1 gap-3 text-xs font-semibold text-neutral-700">
            {CATEGORIES.map(([labelId, labelEn, count]) => (
              <span key={labelId}>{en ? labelEn : labelId} ({count})</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
