"use client";

import { useRouter } from "next/navigation";
import { HIGHLIGHT } from "../data";

export default function PembelianBerhasilPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-neutral-50 pb-8">
      <header className="bg-brand px-4 py-4 text-center text-white shadow-md rounded-b-3xl">
        <h1 className="text-sm font-bold">Pembayaran</h1>
      </header>

      <section className="flex flex-col items-center px-5 py-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-green-600">
          <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 2.5 2.5L16 9" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-neutral-900">Pembelian Berhasil</h2>
        <p className="mt-2 max-w-xs text-xs text-neutral-500">Pesanan kamu berhasil dibuat dan sedang menunggu dikonfirmasi.</p>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={() => router.push("/")} className="rounded-[8px] bg-white px-5 py-3 text-xs font-bold text-neutral-800 shadow-[0_0_8px_2px_rgba(0,0,0,0.10)]">
            Back
          </button>
          <button type="button" onClick={() => router.push("/menunggu-konfirmasi")} className="rounded-[8px] bg-brand px-5 py-3 text-xs font-bold text-white">
            Lihat Status Pembayaran
          </button>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-4 py-5">
        <h3 className="mb-3 text-[15px] font-bold text-neutral-900">Produk yang serupa</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {HIGHLIGHT.map((product) => (
            <div key={product.name} className="flex w-full flex-col overflow-hidden rounded-[8px] border border-neutral-200 bg-white text-left">
              <div className={`relative flex aspect-square w-full items-center justify-center p-1 ${product.bg ?? "bg-neutral-50"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.icon} alt={product.name} className="h-full w-full scale-110 object-contain" />
                {product.discount && <span className="absolute left-0 top-2 rounded-r bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">{product.discount}</span>}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-2">
                <p className="min-h-[30px] line-clamp-2 text-[11px] leading-snug text-neutral-700">{product.name}</p>
                <div className="mt-auto flex flex-col gap-1">
                  {product.oldPrice && <p className="text-[10px] leading-none text-neutral-400 line-through">{product.oldPrice}</p>}
                  <p className={`text-[13px] font-bold leading-none ${product.oldPrice ? "text-brand" : "text-neutral-900"}`}>{product.price}</p>
                  <div className="mt-0.5 flex items-center gap-1"><span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span><span className="text-[10px] text-neutral-500">({product.reviews ?? 0})</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
