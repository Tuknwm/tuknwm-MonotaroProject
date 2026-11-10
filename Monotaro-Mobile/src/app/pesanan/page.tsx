"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function PesananPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const FILTERS = [
    { key: "order.filter_all", route: "semua" },
    { key: "account.waiting_confirm", route: "menunggu-konfirmasi" },
    { key: "account.waiting_payment", route: "menunggu-pembayaran" },
    { key: "account.in_process", route: "dalam-proses" },
    { key: "account.shipped", route: "telah-dikirim" },
    { key: "account.cancelled", route: "dibatalkan" },
  ] as const;

  const [filter, setFilter] = useState<typeof FILTERS[number]["key"]>("order.filter_all");
  const [orderItems, setOrderItems] = useState<Array<{ name: string; price: number; qty: number; img: string; status: string }>>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pending_confirmation_order");
    const products = [
      ["Sinarline Copy Paper A4", 36900, "paper"], ["Tekiro Obeng Plus PH2", 18500, "screwdriver"],
      ["WD-40 Multi-Purpose 333ml", 89900, "wd40"], ["Sarung Tangan Safety", 42000, "gloves"],
      ["Kabel Extension 3 Meter", 58000, "cable"],
    ] as const;
    const statuses = ["account.waiting_payment", "account.in_process", "account.shipped", "account.cancelled"] as const;
    const dummy = statuses.flatMap((status) => products.map(([name, price, image]) => [name, price, `https://picsum.photos/seed/pesanan-${status}-${image}/160/160`, status] as const));
    let savedItems: Array<{ name: string; price: number; qty: number; img: string }> = [];
    if (saved) { try { savedItems = JSON.parse(saved).items ?? []; } catch { savedItems = []; } }
    setOrderItems([
      ...savedItems.map((item) => ({ ...item, status: "account.waiting_confirm" })),
      ...dummy.map(([name, price, img, status]) => ({ name, price, qty: 1, img, status })),
    ]);
  }, []);

  return (
    <main className="min-h-dvh bg-neutral-50">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold text-white">{t("order.all_orders")}</h1>
      </header>
      <div className="border-b border-neutral-200 bg-white px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map(({ key }) => (
            <button key={key} type="button" onClick={() => setFilter(key)} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${filter === key ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-600"}`}>
              {t(key)}
            </button>
          ))}
        </div>
      </div>
      <section className="px-4 py-5">
        {orderItems.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-neutral-500">{filter === "order.filter_all" ? "Semua Pesanan" : t(filter)}</p>
            {orderItems.filter((item) => filter === "order.filter_all" || item.status === filter).map((item, index) => (
              <div key={`${item.status}-${item.name}-${index}`} className="flex items-center gap-3 rounded-[8px] border border-neutral-200 bg-white p-3">
                <img src={item.img} alt={item.name} className="h-16 w-16 rounded-[6px] bg-neutral-50 object-contain" />
                <div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs text-neutral-700">{item.name}</p><p className="mt-1 text-[10px] text-neutral-500">{item.qty} item · Rp{item.price.toLocaleString("id-ID")}</p></div>
                {item.status !== "account.cancelled" && <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-600">{t(item.status)}</span>}
              </div>
            ))}
          </div>
        ) : <div className="flex min-h-[calc(100dvh-130px)] items-center justify-center"><p className="text-sm text-neutral-400">{t("order.no_orders")}</p></div>}
      </section>
    </main>
  );
}
