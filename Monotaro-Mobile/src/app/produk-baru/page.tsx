"use client";

import { useRouter } from "next/navigation";
import HomeBottomNav from "@/components/HomeBottomNav";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORY_SECTIONS, DUMMY_CATEGORY_PRODUCTS } from "../data";
import { ITEM_PRODUCTS } from "../item-products";

const CATEGORIES = CATEGORY_SECTIONS.map((section) => section.name);
const PRODUCTS = [...ITEM_PRODUCTS, ...DUMMY_CATEGORY_PRODUCTS].map((product, index) => ({ ...product, name: product.name.replace(/^Monotaro\s+/i, ""), reviews: product.reviews ?? 12 + index * 5 }));

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const { t } = useLanguage();
  return <article className="min-w-0 overflow-hidden rounded-[8px] border border-neutral-200 bg-white"><div className={`relative aspect-square w-full ${product.bg ?? "bg-neutral-50"}`}><img src={product.icon} alt={product.name} className="h-full w-full object-contain" /></div><div className="flex flex-col gap-1 p-2"><p className="line-clamp-2 min-h-[30px] text-[11px] leading-snug text-neutral-700">{product.name}</p><p className="text-[13px] font-bold leading-none text-neutral-900">{product.price}</p>{product.unit && <p className="text-[10px] leading-none text-neutral-500">{product.unit}</p>}<span className="mt-1 w-fit rounded border border-neutral-300 px-1.5 py-0.5 text-[9px] text-neutral-600">{t("product.delivery_days")}</span><div className="flex items-center gap-1 pt-1"><span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span><span className="text-[10px] text-neutral-500">({product.reviews ?? index + 5})</span></div></div></article>;
}

export default function ProdukBaruPage() {
  const router = useRouter();
  const { t } = useLanguage();
  return <main className="min-h-dvh bg-white pb-24"><header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl"><button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="text-sm font-bold">{t("menu.new_products")}</h1></header><div className="px-3 py-5 pt-[76px]">{CATEGORIES.map((category) => { const categoryProducts = PRODUCTS.filter((product) => product.category === category).slice(0, 5); const list = categoryProducts.length >= 5 ? categoryProducts : PRODUCTS.slice(0, 5); return <section key={category} className="mb-8"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="rounded-[5px] bg-indigo-800 px-2 py-1 text-xs font-bold text-white">{t("product.new_badge")}</span><h2 className="text-base font-bold text-neutral-800">{category}</h2></div><button type="button" className="text-xs font-semibold text-red-600">{t("common.see_all")}</button></div><div className="mt-3 grid grid-cols-2 gap-3">{list.map((product, index) => <ProductCard key={`${category}-${product.name}-${index}`} product={product} index={index} />)}</div></section>; })}</div><HomeBottomNav /></main>;
}
