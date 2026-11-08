"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function EmptyOrderStatus({ title }: { title: string }) {
  const router = useRouter();
  const { t } = useLanguage();
  return <main className="min-h-dvh bg-neutral-50"><header className="sticky top-0 z-20 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-4"><button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-neutral-700"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="text-sm font-bold text-neutral-900">{t(title)}</h1></header><section className="flex min-h-[calc(100dvh-70px)] items-center justify-center px-6"><p className="text-sm text-neutral-400">{t("order.no_orders")}</p></section></main>;
}
