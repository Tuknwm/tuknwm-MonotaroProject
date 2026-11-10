"use client";

import { useRouter } from "next/navigation";

export default function MenungguPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-neutral-50">
      <header className="bg-brand px-4 py-4 text-center text-white shadow-md rounded-b-3xl">
        <h1 className="text-sm font-bold">Menunggu Pembayaran</h1>
      </header>
      <section className="flex flex-col items-center px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        </div>
        <h2 className="mt-4 text-lg font-bold text-neutral-900">Pesanan Menunggu Pembayaran</h2>
        <p className="mt-2 text-xs text-neutral-500">Silakan selesaikan pembayaran untuk memproses pesanan kamu.</p>
        <button type="button" onClick={() => router.push("/")} className="mt-6 rounded-[8px] bg-brand px-6 py-3 text-xs font-bold text-white">Kembali ke Beranda</button>
      </section>
    </main>
  );
}
