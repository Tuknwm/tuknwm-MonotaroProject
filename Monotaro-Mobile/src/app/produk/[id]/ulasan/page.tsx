"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const REVIEWS = [
  { name: "Peter",   date: "19 Okt 2026", rating: 5, title: "Kualitas Baik",       body: "kualitas baik, pengiriman cepat, harga kompetitif, free ongkir",    sku: "S043477715", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millennium Power 8B 1pack(8pcs)",          isCurrent: false, img: "https://picsum.photos/seed/rev1/80/80" },
  { name: "Neneng",  date: "14 Okt 2026", rating: 5, title: "Kualitas Baik",       body: "kualitas baik",                                                      sku: "S043477715", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millennium Power 8B 1pack(8pcs)",          isCurrent: false, img: "https://picsum.photos/seed/rev2/80/80" },
  { name: "Tom",     date: "13 Okt 2026", rating: 5, title: "Harga Kompetitif",    body: "baterai terbaik harga kompetitif",                                   sku: "S000001674", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millenion Power 4B+2B 1pack(4+2pcs)",    isCurrent: true,  img: "https://picsum.photos/seed/rev3/80/80" },
  { name: "Sari",    date: "10 Okt 2026", rating: 4, title: "Lumayan Bagus",       body: "produk sesuai deskripsi, pengiriman agak lama tapi oke",             sku: "S000007807", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Shrink Pack 2pcs 1pack(2pcs)",           isCurrent: false, img: "https://picsum.photos/seed/rev4/80/80" },
  { name: "Budi",    date: "05 Okt 2026", rating: 5, title: "Recommended!",        body: "sudah beli berkali-kali, kualitas konsisten dan tahan lama",         sku: "S028361534", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Box (48 pcs)",                           isCurrent: false, img: "https://picsum.photos/seed/rev5/80/80" },
  { name: "Dewi",    date: "01 Okt 2026", rating: 3, title: "Cukup",               body: "baterai standar, tidak ada yang istimewa tapi harga terjangkau",     sku: "S000001674", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millenion Power 4B+2B 1pack(4+2pcs)",    isCurrent: true,  img: "https://picsum.photos/seed/rev6/80/80" },
  { name: "Agus",    date: "28 Sep 2026", rating: 5, title: "Mantap",              body: "fast respon, packing aman, barang ori",                              sku: "S043477715", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Millennium Power 8B 1pack(8pcs)",          isCurrent: false, img: "https://picsum.photos/seed/rev7/80/80" },
  { name: "Rina",    date: "22 Sep 2026", rating: 4, title: "Baik",                body: "produk bagus, sesuai ekspektasi, akan beli lagi",                    sku: "S028113195", skuLabel: "ABC (Battery) Alkaline Battery AA LR6 Carton (288 pcs)",                        isCurrent: false, img: "https://picsum.photos/seed/rev8/80/80" },
];

const FILTERS = ["product.filter_latest", "product.filter_photo", "product.filter_top_rating", "product.filter_low_rating"] as const;

export default function UlasanPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("product.filter_latest");

  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900">{t("product.reviews")}</h1>
      </header>

      <div className="page-content">
      {/* Filter */}
      <div className="flex gap-1.5 px-4 py-3 overflow-x-auto no-scrollbar border-b border-neutral-100">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
              activeFilter === f ? "bg-brand text-white border-brand" : "bg-white text-neutral-600 border-neutral-200"
            }`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      {/* Daftar ulasan */}
      <div className="flex flex-col divide-y divide-neutral-100 px-4">
        {REVIEWS
          .filter((r) => activeFilter === "product.filter_photo" ? !!r.img : true)
          .sort((a, b) => {
            if (activeFilter === "product.filter_top_rating") return b.rating - a.rating;
            if (activeFilter === "product.filter_low_rating") return a.rating - b.rating;
            return 0;
          })
          .map((r) => (
          <div key={r.name + r.date} className="py-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </div>
                <span className="text-xs font-semibold text-neutral-800">{r.name}</span>
              </div>
              <span className="text-[10px] text-neutral-400">{r.date}</span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: r.rating }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f97316"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>
            <p className="text-xs font-bold text-neutral-900">{r.title}</p>
            <div className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.img} alt="" className="w-16 h-16 rounded-[6px] object-cover border border-neutral-200 shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-xs text-neutral-600">{r.body}</p>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  SKU: <span className="text-brand">{r.sku}</span> {r.skuLabel}
                  {r.isCurrent && <span className="text-brand ml-1">(Anda di SKU ini)</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>{/* end page-content */}
    </main>
  );
}
