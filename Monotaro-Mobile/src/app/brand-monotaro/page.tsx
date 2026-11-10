"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORY_SECTIONS, DUMMY_CATEGORY_PRODUCTS } from "../data";
import { ITEM_PRODUCTS } from "../item-products";
import HomeBottomNav from "@/components/HomeBottomNav";

const CATEGORIES = CATEGORY_SECTIONS.map((section) => section.name);
const QUICK: [string, string][] = [
  ["Sepatu Safety", "Safety Shoes"],
  ["Kain Lap Microfiber", "Microfiber Cloth"],
  ["Handuk Muka", "Face Towel"],
  ["Sarung Tangan", "Gloves"],
  ["Plastik Wrapping", "Wrapping Plastic"],
  ["Pengikat kabel", "Cable Tie"],
];

function ProductCard({ product, index }: { product: (typeof ITEM_PRODUCTS)[number]; index: number }) {
  const reviews = product.reviews ?? 8 + index * 7;
  return <article className="min-w-0 overflow-hidden rounded-[8px] border border-neutral-200 bg-white text-left">
    <div className={`relative aspect-square w-full ${product.bg ?? "bg-neutral-50"}`}><img src={product.icon} alt={product.name} className="h-full w-full object-contain" /></div>
    <div className="flex flex-col gap-1 p-2">
      <p className="line-clamp-2 min-h-[30px] text-[11px] leading-snug text-neutral-700">{product.name}</p>
      {product.oldPrice && <p className="text-[10px] leading-none text-neutral-400 line-through">{product.oldPrice}</p>}
      <p className={`text-[13px] font-bold leading-none ${product.oldPrice ? "text-brand" : "text-neutral-900"}`}>{product.price}</p>
      {product.unit && <p className="text-[10px] leading-none text-neutral-500">{product.unit}</p>}
      <span className="mt-1 w-fit rounded bg-green-600 px-1.5 py-0.5 text-[9px] font-bold text-white">Ready Stock</span>
      <div className="flex items-center gap-1 pt-1"><span className="text-[11px] tracking-[-1px] text-orange-500">★★★★★</span><span className="text-[10px] text-neutral-500">({reviews})</span></div>
    </div>
  </article>;
}

export default function BrandMonotaroPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const en = language === "en";
  const products = [...ITEM_PRODUCTS, ...DUMMY_CATEGORY_PRODUCTS].map((product, index) => ({
    ...product,
    name: product.name.startsWith("Monotaro") ? product.name : `Monotaro ${product.name}`,
    reviews: product.reviews ?? 8 + index * 7,
  }));
  return <><main className="min-h-dvh bg-white pb-24">
    <header className="fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 bg-brand px-4 py-4 text-white shadow-md rounded-b-3xl"><button type="button" onClick={() => router.back()} aria-label={t("common.back")} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg></button><h1 className="text-sm font-bold">Brand Monotaro</h1></header>
    <div className="px-3 py-4 pt-[76px]">
      <img src="/BrandMonotaro/1-year-warranty-pb-3.webp" alt="One year warranty" className="h-auto w-full rounded border border-neutral-200 object-contain" />
      <div className="mt-2 flex h-20 gap-2"><img src="/BrandMonotaro/logo-pb-monotaro-a.avif" alt="monotaro.id" className="w-1/2 rounded border border-neutral-200 bg-black object-contain p-2" /><img src="/BrandMonotaro/logo-pb-mid-b.avif" alt="MonotaRO" className="w-1/2 rounded border border-neutral-200 bg-[#e9848c] object-contain p-2" /></div>
      <h2 className="mt-5 text-lg font-bold text-neutral-800">{en ? "Quality Private Brand Recommended Products" : "Produk Rekomendasi Private Brand Berkualitas"}</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">{QUICK.map(([labelId, labelEn], index) => <div key={labelId} className="flex items-center gap-2 rounded border border-neutral-300 px-2 py-2 text-xs font-semibold"><img src={products[index % products.length].icon} alt="" className="h-8 w-8 object-contain" />{en ? labelEn : labelId}</div>)}</div>
      {CATEGORIES.map((category) => {
        const categoryProducts = products.filter((product) => product.category === category).slice(0, 5);
        const fallbackProducts = categoryProducts.length >= 5 ? categoryProducts : products.slice(0, 5);
        return <section key={category} className="mt-6"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold text-neutral-800">{category}</h2><button type="button" className="shrink-0 text-xs font-semibold text-brand">{t("common.see_all")}</button></div><div className="mt-3 grid grid-cols-2 gap-3">{fallbackProducts.map((product, index) => <ProductCard key={`${category}-${product.name}-${index}`} product={product} index={index} />)}</div></section>;
      })}
    </div>
  </main><HomeBottomNav /></>;
}
