"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function EmptyOrderStatus({ title }: { title: string }) {
  const router = useRouter();
  const { t } = useLanguage();
  const products = ["Kabel Extension 3 Meter", "Box Penyimpanan Serbaguna", "Masker Pelindung 3 Ply", "Kain Lap Microfiber", "Lakban Monotaro"];
  return <main className="min-h-dvh bg-neutral-50 pt-[72px]"><header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl"><button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="text-sm font-bold">{t(title)}</h1></header><section className="px-4 pb-8 pt-4"><div className="flex flex-col gap-3">{products.map((name, index) => <article key={name} className="flex items-center gap-3 rounded-[8px] border border-neutral-200 bg-white p-3"><img src={`https://picsum.photos/seed/payment-${index}/160/160`} alt={name} className="h-16 w-16 rounded-[6px] bg-neutral-50 object-contain" /><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs text-neutral-700">{name}</p><p className="mt-1 text-sm font-bold text-brand">{"Rp" + (25000 + index * 12500).toLocaleString("id-ID")}</p></div><span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-600">Menunggu</span></article>)}</div></section></main>;
}
