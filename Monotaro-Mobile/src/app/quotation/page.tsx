"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function QuotationPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <main className="min-h-dvh bg-white">
      <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl">
        <button type="button" onClick={() => router.back()} className="text-white shrink-0" aria-label="Kembali">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-white flex-1">{t("quick.pending_quo")}</h1>
      </header>

      <style>{`@keyframes pageItemIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="flex min-h-[calc(100dvh-60px)] items-center justify-center px-8 text-center" style={{ animation: "pageItemIn 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
        <p className="text-sm text-neutral-400">{t("quotation.empty")}</p>
      </div>
    </main>
  );
}
