"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const REVIEWS: { name: string; image: string; rating: number; comment: string; id: string; qty: number; date: string }[] = [
  { name: "ABC Alkaline Battery AA",    image: "https://picsum.photos/seed/review-battery/160/160",    rating: 5, comment: "Produk sesuai deskripsi dan kualitasnya bagus.",              id: "ORD-DEMO-001", qty: 1, date: "17 November 2026" },
  { name: "Sinarline Copy Paper A4",    image: "https://picsum.photos/seed/review-paper/160/160",      rating: 4, comment: "Kertas cukup tebal, cocok untuk kebutuhan kantor.",          id: "ORD-DEMO-002", qty: 2, date: "17 November 2026" },
  { name: "Tekiro Obeng Plus PH2",      image: "https://picsum.photos/seed/review-screwdriver/160/160",rating: 5, comment: "Pegangannya nyaman dan materialnya terasa kuat.",           id: "ORD-DEMO-003", qty: 1, date: "17 November 2026" },
  { name: "WD-40 Multi-Purpose 333ml",  image: "https://picsum.photos/seed/review-wd40/160/160",       rating: 4, comment: "Pengiriman cepat dan produknya bekerja dengan baik.",       id: "ORD-DEMO-004", qty: 1, date: "17 November 2026" },
  { name: "Sarung Tangan Safety",       image: "https://picsum.photos/seed/review-gloves/160/160",     rating: 5, comment: "Ukuran pas, nyaman dipakai untuk pekerjaan harian.",        id: "ORD-DEMO-005", qty: 3, date: "17 November 2026" },
];

export default function UlasanPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [sort, setSort] = useState<"terbaru" | "lama">("terbaru");
  const [open, setOpen] = useState(false);
  const sorted = sort === "terbaru" ? [...REVIEWS] : [...REVIEWS].reverse();
  return (
    <main className="min-h-dvh bg-neutral-50 pb-8 pt-[56px]">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
        <button type="button" onClick={() => router.back()} className="shrink-0 text-white" aria-label="Kembali">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="flex-1 text-sm font-bold text-white">{t("ulasan.my_reviews")}</h1>
        <div className="relative">
          <button type="button" onClick={() => setOpen(o => !o)} className="text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          {open && (
            <div className="popout-anim absolute right-0 top-8 z-50 min-w-[120px] overflow-hidden rounded-[8px] bg-white shadow-lg border border-neutral-100">
              {(["terbaru", "lama"] as const).map(opt => (
                <button key={opt} type="button" onClick={() => { setSort(opt); setOpen(false); }} className={`flex w-full items-center justify-between px-4 py-2.5 text-xs ${sort === opt ? "font-bold text-brand" : "text-neutral-700"}`}>
                  {opt === "terbaru" ? t("product.filter_latest") : t("ulasan.oldest")}
                  {sort === opt && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <style>{`
@keyframes ulasanIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes popoutIn {
  from { opacity: 0; transform: scale(0.9) translateY(-6px); transform-origin: top right; }
  to   { opacity: 1; transform: scale(1) translateY(0); transform-origin: top right; }
}
.popout-anim { animation: popoutIn 0.18s cubic-bezier(0.22,1,0.36,1) both; transform-origin: top right; }
`}</style>
      <section className="flex flex-col gap-3 px-4 pb-5 pt-3">
        {sorted.map(({ name, image, rating, comment, id, qty, date }, i) => (
          <article key={id} style={{ animation: `ulasanIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s both` }} className="rounded-[8px] border border-neutral-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <p className="text-[11px] font-bold text-neutral-800">{id}</p>
                <p className="text-[10px] text-neutral-400">{qty} {t("order.item_count")} · {t("order.reviewed_prefix")} {date}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={rating >= s ? "#f59e0b" : "none"} stroke={rating >= s ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain border border-neutral-100" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-semibold text-neutral-900">{name}</p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">"{comment}"</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
