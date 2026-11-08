"use client";

import { useRouter } from "next/navigation";

export default function QuotationPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="text-neutral-500 shrink-0" aria-label="Kembali">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-[15px] font-bold text-neutral-900 flex-1">Pending Quotation</h1>
      </header>

      <div className="page-content flex flex-col items-center justify-center py-24 px-8 text-center">
        <svg className="w-16 h-16 text-neutral-200 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 1v5h5M8 13h8M8 17h5"/>
        </svg>
        <p className="text-sm font-semibold text-neutral-500">Anda tidak memiliki permintaan penawaran.</p>
      </div>
    </main>
  );
}
