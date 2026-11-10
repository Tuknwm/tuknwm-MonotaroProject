"use client";

import { useRouter } from "next/navigation";

const REVIEWS: [string, string, number, string][] = [
  ["ABC Alkaline Battery AA", "https://picsum.photos/seed/review-battery/160/160", 5, "Produk sesuai deskripsi dan kualitasnya bagus."],
  ["Sinarline Copy Paper A4", "https://picsum.photos/seed/review-paper/160/160", 4, "Kertas cukup tebal, cocok untuk kebutuhan kantor."],
  ["Tekiro Obeng Plus PH2", "https://picsum.photos/seed/review-screwdriver/160/160", 5, "Pegangannya nyaman dan materialnya terasa kuat."],
  ["WD-40 Multi-Purpose 333ml", "https://picsum.photos/seed/review-wd40/160/160", 4, "Pengiriman cepat dan produknya bekerja dengan baik."],
  ["Sarung Tangan Safety", "https://picsum.photos/seed/review-gloves/160/160", 5, "Ukuran pas, nyaman dipakai untuk pekerjaan harian."],
];

export default function UlasanPage() {
  const router = useRouter();
  return <main className="min-h-dvh bg-neutral-50 pb-8 pt-[72px]">
    <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md"><button type="button" onClick={() => router.back()} className="text-white" aria-label="Kembali"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="ml-2 text-sm font-bold">Ulasan</h1></header>
    <section className="flex flex-col gap-3 px-4 py-5">{REVIEWS.map(([name, image, rating, comment]) => <article key={name} className="rounded-[8px] border border-neutral-200 bg-white p-4"><div className="flex gap-3"><img src={image} alt={name} className="h-16 w-16 rounded-[6px] bg-neutral-50 object-contain" /><div className="min-w-0 flex-1"><p className="text-xs font-bold text-neutral-900">{name}</p><div className="mt-1 flex items-center gap-1"><span className="text-sm tracking-[-1px] text-orange-500">{"★".repeat(rating)}</span><span className="text-[10px] text-neutral-400">({rating}/5)</span></div><p className="mt-2 text-xs leading-relaxed text-neutral-600">“{comment}”</p></div></div></article>)}</section>
  </main>;
}
