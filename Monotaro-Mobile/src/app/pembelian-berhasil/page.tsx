"use client";

import { useRouter } from "next/navigation";
import { HIGHLIGHT } from "../data";
import { useLanguage } from "@/context/LanguageContext";

const ANIM = `
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.anim-in { animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
.anim-in-2 { animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
`;

export default function PembelianBerhasilPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <main className="min-h-dvh bg-neutral-50 pb-8">
      <style>{ANIM}</style>
      <header className="bg-brand px-4 py-4 text-center text-white shadow-md rounded-b-3xl">
        <h1 className="text-sm font-bold">{t("payment.page_title")}</h1>
      </header>

      <section className="anim-in flex flex-col items-center px-5 py-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-green-600">
          <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 2.5 2.5L16 9" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-neutral-900">{t("payment.success_title")}</h2>
        <p className="mt-2 max-w-xs text-xs text-neutral-500">{t("payment.success_desc")}</p>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={() => router.replace("/")} className="rounded-[8px] bg-white px-5 py-3 text-xs font-bold text-neutral-800 shadow-[0_0_8px_2px_rgba(0,0,0,0.10)]">
            {t("common.back")}
          </button>
          <button type="button" onClick={() => router.push("/menunggu-konfirmasi")} className="rounded-[8px] bg-brand px-5 py-3 text-xs font-bold text-white">
            {t("payment.view_status")}
          </button>
        </div>
      </section>

      <section className="anim-in-2 flex flex-col gap-5 px-4 pb-8 pt-4">
        {HIGHLIGHT.map((product, index) => (
          <article key={product.name} className="rounded-[8px] border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Pesanan ORD-DEMO-{String(index + 1).padStart(3, "0")}</p>
                  <p className="mt-1 text-[10px] text-neutral-500">17 November 2026</p>
                </div>
              </div>
              <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
            </div>
            <div className="mt-4 flex items-center gap-3 border-y border-neutral-100 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.icon} alt={product.name} className="h-14 w-14 rounded-[6px] bg-neutral-50 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs text-neutral-700">{product.name}</p>
                <p className="mt-1 text-[10px] text-neutral-500">1 item · {product.price}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-xs font-bold text-neutral-900">{t("order.total_order")}</p>
              <p className="text-sm font-bold text-brand">{product.price}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
