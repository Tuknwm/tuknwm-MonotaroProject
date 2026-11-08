"use client";

import { useState } from "react";
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

  return (
    <main className="min-h-dvh bg-neutral-50">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-4">
        <button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-neutral-700">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-sm font-bold text-neutral-900">{t("order.all_orders")}</h1>
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
      <section className="flex min-h-[calc(100dvh-130px)] items-center justify-center px-6">
        <p className="text-sm text-neutral-400">
          {t("order.no_orders")}{filter !== "order.filter_all" ? ` ${t(filter).toLowerCase()}` : ""}
        </p>
      </section>
    </main>
  );
}
