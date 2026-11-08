"use client";

import { useRouter } from "next/navigation";

const WAREHOUSES = [
  {
    id: "cikarang",
    name: "Lokasi Warehouse Cikarang",
    address: "Jl. Serui Blok AE3, Kawasan Industri MM2100\nDesa Jatiwangi, Kec. Cikarang Barat\nBekasi, 17530, Jawa Barat.",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d107.19!3d-6.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b0000000001%3A0x1!2sMMP+Gudang+Cibitung+-+Blok+AE!5e0!3m2!1sen!2sid!4v1",
    mapsLink: "https://maps.google.com/?q=MMP+Gudang+Cibitung+Blok+AE+Cikarang",
  },
  {
    id: "jakarta",
    name: "Lokasi Warehouse Jakarta",
    address: "Pergudangan Prima Center 1, Blok F-1\nJl. Pool PPD Kedaung Kali Angke\nCengkareng Jakarta Barat 11710",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.72!3d-6.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f70000000001%3A0x1!2sPergudangan+Prima+Center+Cengkareng!5e0!3m2!1sen!2sid!4v1",
    mapsLink: "https://maps.google.com/?q=Pergudangan+Prima+Center+Cengkareng+Jakarta+Barat",
  },
  {
    id: "jatim",
    name: "Lokasi Warehouse Jawa Timur",
    address: "Ruko Safira Garden Blok A1 No 4-5\nJl. Raya Sepande Candi No.19, Krajan, Sepande\nKec. Candi, Kabupaten Sidoarjo, Jawa Timur 61271",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0!2d112.72!3d-7.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e50000000001%3A0x1!2sSafira+Garden+Sidoarjo!5e0!3m2!1sen!2sid!4v1",
    mapsLink: "https://maps.google.com/?q=Ruko+Safira+Garden+Sidoarjo",
  },
];

export default function PickupLokasiPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label="Kembali">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Lokasi Gudang</h1>
      </header>

      <div className="page-content">
        {WAREHOUSES.map((w) => (
          <div key={w.id} className="px-4 py-4 border-b border-neutral-200">
            <h2 className="text-base font-bold text-neutral-900 mb-1">{w.name}</h2>
            <button type="button" className="text-[11px] text-brand underline mb-3 block">Download Panduan Lokasi</button>
            <div className="w-full h-40 rounded-[8px] overflow-hidden mb-3 relative">
              <iframe
                src={w.mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={w.name}
              />
              <a
                href={w.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 left-2 bg-white text-[10px] font-semibold text-brand px-2 py-1 rounded shadow flex items-center gap-1"
              >
                Open in Maps
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed whitespace-pre-line">{w.address}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
