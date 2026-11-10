"use client";
import { useRouter } from "next/navigation";

const PRODUCTS = [["ABC Alkaline Battery AA", "Rp27.900", "https://picsum.photos/seed/order-battery/160/160"], ["Sinarline Copy Paper A4", "Rp36.900", "https://picsum.photos/seed/order-paper/160/160"], ["Tekiro Obeng Plus PH2", "Rp18.500", "https://picsum.photos/seed/order-screwdriver/160/160"], ["WD-40 Multi-Purpose 333ml", "Rp89.900", "https://picsum.photos/seed/order-wd40/160/160"], ["Sarung Tangan Safety", "Rp42.000", "https://picsum.photos/seed/order-gloves/160/160"]];

export default function OrderStatusPage({ title }: { title: string }) {
  const router = useRouter();
  return <main className="min-h-dvh bg-neutral-50 pt-[60px]">
    <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-b-3xl bg-brand px-4 py-4 text-white shadow-md">
      <button type="button" onClick={() => router.back()} className="text-white" aria-label="Kembali"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="ml-2 text-sm font-bold">{title}</h1>
    </header>
    <div className="flex flex-col gap-5 px-4 pb-8 pt-0">
      {PRODUCTS.map(([name, price, image], index) => <article key={name} className="rounded-[8px] border border-neutral-200 bg-white p-4"><div className="flex items-start justify-between"><div className="flex items-start gap-2"><svg className="mt-0.5 h-5 w-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg><div><p className="text-xs font-bold text-neutral-900">Pesanan ORD-DEMO-{String(index + 1).padStart(3, "0")}</p><p className="mt-1 text-[10px] text-neutral-500">10 November 2026</p></div></div><svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Informasi"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg></div><div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3"><img src={image} alt={name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" /><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs text-neutral-700">{name}</p><p className="mt-1 text-[10px] text-neutral-500">1 item · {price}</p></div></div>{title === "Telah Dikirim" ? <div className="mt-3 flex items-center justify-between"><div><p className="text-xs font-bold text-neutral-900">Total Belanja</p><p className="text-sm font-bold text-brand">{price}</p></div><button type="button" className="rounded-[8px] bg-brand px-4 py-2 text-xs font-bold text-white">Beli Lagi</button></div> : <div className="mt-3 flex justify-between"><p className="text-xs font-bold text-neutral-900">Total Pesanan</p><p className="text-sm font-bold text-brand">{price}</p></div>}</article>)}
    </div>
  </main>;
}
